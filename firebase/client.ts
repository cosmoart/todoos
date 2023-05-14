import firebase from 'firebase/compat/app'
import { getDatabase, ref, set, update, get, onValue } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'
import 'firebase/compat/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDjqRTXWhjLq099HAGSKK2_3vpMotSdW14',
	authDomain: 'todo-14e11.firebaseapp.com',
	projectId: 'todo-14e11',
	storageBucket: 'todo-14e11.appspot.com',
	messagingSenderId: '335925159333',
	appId: '1:335925159333:web:938a24a609334748e2f44c',
	measurementId: 'G-QY2JQ1MKJX',
	databaseURL: 'https://todo-14e11-default-rtdb.firebaseio.com/'
}

//  Todo list CRUD
interface crudTypes {
	uid: string
	id?: number | string
	todo?: {
		text: string
		completed: boolean
	}
	todos?: Array<{
		text: string
		completed: boolean
		id: number | string
	}>
}

const app = firebase.initializeApp(firebaseConfig)
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : undefined
const db = getDatabase(app)

// Login with Github
function mapUserFromFirebaseAuthToUser (user: any): { avatar: string, username: string, uid: string } {
	const { displayName, photoURL, uid } = user
	return { avatar: photoURL, username: displayName, uid }
}

export const onAuthStateChanged = async (onChange: any): Promise<any> => {
	return firebase.auth().onAuthStateChanged((user) => {
		const normalizedUser = (user != null) ? mapUserFromFirebaseAuthToUser(user) : null
		onChange(normalizedUser)
	})
}

export const loginWithGithub = async (): Promise<any> => {
	const provider = new firebase.auth.GithubAuthProvider()
	return await firebase.auth().signInWithPopup(provider)
}

export const logout = (): void => {
	firebase.auth().signOut()
		.catch((error) => { console.log('Unexpected error', error) })
}

export const addTodo = async ({ todo, uid }: crudTypes): Promise<any> => {
	try {
		const snapshot = await get(ref(db, `todo/${uid}`))
		const data = snapshot.val()
		const arrayData = Object.keys(data)

		const id = Number(arrayData[arrayData.length - 1]) + 1 ?? 1
		await set(ref(db, `todo/${uid}/${id}`), { ...todo, id }); return
	} catch (err) { throw new Error() }
}

export const listenAllTodos = async (uid: crudTypes['uid'], callback: any): Promise<any> => {
	return await new Promise((resolve, reject) => {
		try {
			onValue(ref(db, `todo/${uid}`), (snapshot) => {
				const data = snapshot.val()
				const arrayData = Object.values(data ?? {})
				callback(arrayData)
				resolve(arrayData)
			})
		} catch (err) {
			reject(err)
		}
	})
}

export const updateTodo = async ({ id, uid, todo }: crudTypes): Promise<any> => {
	await update(ref(db, `todo/${uid}/${id ?? ''}`), todo)
}

export const updateAllTodos = async ({ uid, todos }: crudTypes): Promise<any> => {
	await update(ref(db, `todo/${uid}`), todos)
}

export const deleteTodo = async ({ id, uid }: crudTypes): Promise<any> => {
	await set(ref(db, `todo/${uid}/${id ?? ''}`), null)
}

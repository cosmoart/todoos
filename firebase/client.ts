import firebase from 'firebase/compat/app'
import { getDatabase, ref, set, push, onValue} from 'firebase/database'
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

const app = firebase.initializeApp(firebaseConfig)
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : undefined
const db = getDatabase(app)

// Login with Github
function mapUserFromFirebaseAuthToUser (user: any) {
	const { displayName, photoURL, uid } = user
	return { avatar: photoURL, username: displayName, uid }
}

export const onAuthStateChanged = (onChange: Function) => {
	return firebase.auth().onAuthStateChanged((user) => {
		const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
		onChange(normalizedUser)
	})
}

export const loginWithGithub = () => {
	const provider = new firebase.auth.GithubAuthProvider()
	return firebase.auth().signInWithPopup(provider)
		.catch((error) => console.log(error))
}

export const logout = () => {
	return firebase.auth().signOut()
}

//  Todo list CRUD
type crudTypes = {
	uid: string,
	id?: string,
	todo?: {
		text: string,
		completed: boolean
	},
}

export const addTodo = ({ todo, uid }: crudTypes) => {
	const todoListRef = ref(db, `todo/${uid}`)
	const newTodoRef = push(todoListRef)
	const id = newTodoRef.key
	return set(newTodoRef, { ...todo, id })
}

export const listenAllTodos = (uid: crudTypes["uid"], callback: Function) => {
	return new Promise((resolve, reject) => {
		onValue(ref(db, `todo/${uid}`), (snapshot) => {
			const data = snapshot.val()
			const arrayData = Object.values(data || {})
			callback(arrayData)
			resolve(arrayData)
		})
	})
}

export const updateTodo = ({ id, uid, todo }: crudTypes) => {
	return set(ref(db, `todo/${uid}/${id}`), todo)
}

export const deleteTodo = ({ id, uid }: crudTypes) => {
	return set(ref(db, `todo/${uid}/${id}`), null)
}

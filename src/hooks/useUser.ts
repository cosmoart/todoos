import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '../../firebase/client'
import { toast } from 'sonner'

export interface userLogged {
	avatar: string
	username: string
	uid: string
}

// const userStates = {
// 	LOADING: undefined,
// 	INVITADO: null,
// 	LOGGED: ''
// }

type User = null | undefined | userLogged

export default function useUser (): User {
	const [user, setUser] = useState<User>(undefined)
	// user undefined = loading
	// user null = invitado
	// user object = logged

	useEffect(() => {
		onAuthStateChanged(setUser)
			.catch(() => toast.error('Failed to login'))
	}, [])

	return user
}

import { useEffect, useState } from 'react';
import {onAuthStateChanged } from '../../firebase/client';

export type userLogged = {
	avatar: string;
	username: string;
	uid: string;
};

const userStates = {
	LOADING: undefined,
	INVITADO: null,
	LOGGED: ""
}

export default function useUser(){
	type User = null | undefined | userLogged;
	const [user, setUser] = useState<User>(undefined);
	// user undefined = loading
	// user null = invitado
	// user object = logged

	useEffect(() => {
		onAuthStateChanged(setUser);
	}, []);

	return user;
}
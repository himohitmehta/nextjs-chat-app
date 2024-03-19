"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	GoogleAuthProvider,
	signInAnonymously,
	signInWithEmailAndPassword,
	signInWithRedirect,
} from "firebase/auth";

export default function Navbar() {
	const [user] = useAuthState(auth);
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};
	const anonymousSignIn = () => {
		signInAnonymously(auth);
	};
	const emailSignIn = ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		signInWithEmailAndPassword(auth, email, password);
	};
	const signOut = () => {
		auth.signOut();
	};
	return (
		<nav className="flex  border-b justify-between p-4 items-center">
			<h1>My messenger</h1>
			{user ? (
				<Button onClick={signOut} className="sign-out" type="button">
					Sign Out
				</Button>
			) : (
				<Button onClick={() => googleSignIn()}>
					Sign in with Google
				</Button>
			)}
		</nav>
	);
}

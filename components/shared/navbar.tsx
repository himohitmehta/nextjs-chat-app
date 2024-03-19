"use client";
import { auth } from "@/firebase/config";
import {
	GoogleAuthProvider,
	signInAnonymously,
	signInWithEmailAndPassword,
	signInWithRedirect,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import { MobileMenu } from "./mobile-menu";

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
		<nav className="flex  border-b justify-between p-4 items-center sticky top-0">
			{<MobileMenu />} <h1>My messenger</h1>
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

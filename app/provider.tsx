"use client";
import { auth } from "@/firebase/config";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Provider({ children }: { children: React.ReactNode }) {
	const [user] = useAuthState(auth);

	return (
		<div>
			{
				// user ?
				children
				//  : <div>Sign in to continue</div>
			}
		</div>
	);
}

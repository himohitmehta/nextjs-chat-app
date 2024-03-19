"use client";

import { auth, db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";

export default function MessageInput({ scroll }) {
	const [message, setMessage] = useState("");
	const params = useParams();
	const sendMessage = async (event) => {
		event.preventDefault();
		if (message.trim() === "") {
			alert("Enter valid message");
			return;
		}
		const { uid, displayName, photoURL } = auth.currentUser;
		await addDoc(
			collection(db, `conversations/${params.conversation}/messages`),
			{
				text: message,
				name: displayName,
				avatar: photoURL,
				createdAt: serverTimestamp(),
				uid,
			},
		);
		setMessage("");
		scroll.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<form
			className="flex gap-2 fixed bottom-10 w-9/12 border-t pt-4"
			onSubmit={(event) => sendMessage(event)}
		>
			{/* <label htmlFor="messageInput" hidden>
				Enter Message
			</label> */}
			<Input
				id="messageInput"
				name="messageInput"
				type="text"
				className="form-input__input"
				placeholder="type message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Button type="submit">Send</Button>
		</form>
	);
}

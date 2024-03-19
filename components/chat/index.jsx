"use client";
import { db } from "@/firebase/config";
import {
	collection,
	doc,
	documentId,
	limit,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MessageInput from "./message-input";
import Message from "./message";

export default function Chat({ chatId }) {
	const [messages, setMessages] = useState([]);
	const scroll = useRef();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		const q = query(
			collection(db, `conversations/${chatId}/messages`),
			orderBy("createdAt", "desc"),
			limit(50),
		);
		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			const fetchedMessages = [];
			QuerySnapshot.forEach((doc) => {
				fetchedMessages.push({ ...doc.data(), id: doc.id });
			});
			const sortedMessages = fetchedMessages.sort(
				(a, b) => a.createdAt - b.createdAt,
			);
			setMessages(sortedMessages);
			setIsLoading(false);
		});
		return () => {
			unsubscribe;
		};
	}, []);
	if (isLoading) return <div>Loading...</div>;
	if (messages.length === 0)
		return (
			<div className="p-4">
				Send a message to start the conversation
				<MessageInput scroll={scroll} />
			</div>
		);
	return (
		<div className="p-4">
			{messages?.map((message) => (
				<Message
					key={message.id}
					message={message}
					isLoading={isLoading}
				/>
			))}
			<div ref={scroll}></div>
			<MessageInput scroll={scroll} />
		</div>
	);
}

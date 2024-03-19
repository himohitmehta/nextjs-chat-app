"use client";
import { db } from "@/firebase/config";
import {
	addDoc,
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CreateConversationDialog } from "./create-conversation-dialog";

export default function Sidebar() {
	// const [user] = useAuthState(auth);
	const [conversations, setConversations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		const q = query(
			collection(db, "conversations"),
			orderBy("createdAt", "desc"),
			limit(50),
		);
		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			const list = [];
			QuerySnapshot.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
			});
			const sortedMessages = list.sort(
				(a, b) => a.createdAt - b.createdAt,
			);
			setConversations(sortedMessages);
			setIsLoading(false);
		});
		return () => {
			unsubscribe;
		};
	}, []);

	return (
		<div className="w-full p-4 ">
			{/* <Button onClick={() => startChat()}>Create a conversation</Button> */}
			<CreateConversationDialog />
			<div className="flex flex-col px-4">
				{conversations.map((item) => {
					return (
						<Link
							href={item.id}
							key={item.id}
							className="hover:underline py-2"
						>
							{item.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
}

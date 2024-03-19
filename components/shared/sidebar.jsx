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
import { Skeleton } from "../ui/skeleton";
import { useParams } from "next/navigation";

export default function Sidebar() {
	// const [user] = useAuthState(auth);
	const [conversations, setConversations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const conversation = params.conversation;
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
	if (isLoading)
		return (
			<div className="flex flex-col gap-4 mt-4 px-4">
				<Skeleton className="h-10 w-200 rounded-md" />

				<Skeleton className="h-10 w-200 rounded-md" />
				<Skeleton className="h-10 w-200 rounded-md" />
			</div>
		);

	return (
		<div className="w-full p-4 justify-between  flex flex-col flex-1">
			{/* <Button onClick={() => startChat()}>Create a conversation</Button> */}
			<h1 className="font-bold text-xl">Your conversations</h1>
			<div className="flex-1 h-full flex flex-col my-2 ">
				{conversations.length > 0 ? (
					conversations.map((item) => {
						return (
							<Link
								href={item.id}
								key={item.id}
								className={
									conversation === item.id
										? "font-bold py-2 px-4 text-gray-700 bg-slate-300/50 rounded-md"
										: "hover:underline font-bold text-gray-700 py-2 px-4 hover:bg-slate-300/30 rounded-md"
								}
							>
								{item.name}
							</Link>
						);
					})
				) : (
					<div>
						<h1>
							You don&apos;t have any conversations. Start a
							conversation by clicking the button below.
						</h1>
					</div>
				)}
			</div>
			<CreateConversationDialog />
		</div>
	);
}

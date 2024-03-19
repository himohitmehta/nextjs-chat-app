"use client";

import { auth } from "@/firebase/config";
import Image from "next/image";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "../ui/avatar";
export default function Message({
	message,
}: {
	message: {
		name: string;
		createdAt: { seconds: number; nanoseconds: number };
		text: string;
		uid: string | number;
		id: string;
		avatar: string;
	};
}) {
	const [user] = useAuthState(auth);

	const formattedTime =
		(message.createdAt?.seconds &&
			format(new Date(1000 * message.createdAt.seconds), "HH:mm")) ||
		"";

	console.log({ message });
	return (
		<div>
			{message.uid !== user?.uid && (
				<div className="chat chat-start">
					<div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<Image
								unoptimized
								alt="Tailwind CSS chat bubble component"
								src={message.avatar}
								height={20}
								width={20}
							/>
						</div>
					</div>
					<div className="chat-header">
						{message.name}
						<span className="text-xs ml-2 opacity-50">
							{formattedTime}
						</span>
					</div>
					<div className="chat-bubble">{message.text}</div>
					{/* <div className="chat-footer opacity-50">Delivered</div> */}
				</div>
			)}{" "}
			{message.uid === user?.uid && (
				<div className="chat chat-end ">
					<div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<Image
								unoptimized
								alt="Tailwind CSS chat bubble component"
								src={message.avatar}
								height={20}
								width={20}
							/>
						</div>
					</div>{" "}
					<div className="chat-header">
						{"You"}
						<span className="text-xs ml-2 opacity-50">
							{formattedTime}
						</span>
					</div>
					<div className="chat-bubble">{message.text}</div>
					{/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
				</div>
			)}{" "}
		</div>
	);
}

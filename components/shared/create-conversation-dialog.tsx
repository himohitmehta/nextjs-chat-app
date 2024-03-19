"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export function CreateConversationDialog() {
	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const startChat = async () => {
		setIsLoading(true);
		if (name.trim() === "") {
			alert("Enter valid conversation title");
			setIsLoading(false);
			return;
		}
		await addDoc(collection(db, "conversations"), {
			createdAt: serverTimestamp(),
			// uid,
			name: name,
		});
		setName("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={() => setOpen(false)}>
			{/* <DialogTrigger asChild> */}
			<Button onClick={() => setOpen(true)}>Start conversation</Button>
			{/* </DialogTrigger> */}
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a new conversation</DialogTitle>
					{/* <DialogDescription>
						Make changes to your profile here. Click save when
						you're done.
					</DialogDescription> */}
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-1 items-center gap-4">
						<Label htmlFor="conversation">Conversation title</Label>
						<Input
							id="conversation"
							// defaultValue="email"
							className="col-span-3"
							placeholder="Conversation title"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={() => startChat()}>Done</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

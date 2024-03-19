import { CreateConversationDialog } from "@/components/shared/create-conversation-dialog";

export default function Home() {
	return (
		<div className="p-12">
			<h1 className="text-3xl font-bold">Welcome to my Messenger</h1>
			<p>
				Select any conversation to continue or start a new conversation
			</p>
			<CreateConversationDialog />
		</div>
	);
}

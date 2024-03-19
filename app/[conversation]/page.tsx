import Chat from "@/components/chat";
import React from "react";

export default function ConversationPage({
	params,
}: {
	params: { conversation: string };
}) {
	const conversation = params.conversation;

	return (
		<div>
			<Chat chatId={conversation} />
		</div>
	);
}

import Chat from "@/components/chat";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import Image from "next/image";

export default function Home() {
	return (
		<div className="p-12">
			<h1 className="text-3xl font-bold">Welcome to my Messenger</h1>
			<p>Select any chats to continue or create a new chat</p>
		</div>
	);
}

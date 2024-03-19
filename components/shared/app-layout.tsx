import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<main className="flex flex-1 max-h-screen h-screen overflow-y-hidden  max-w-full w-full ">
				<div className="min-w-[200px] h-screen w-2/12 border-r">
					<Sidebar />
				</div>
				<div className="flex-1 max-h-screen overflow-y-auto w-10/12">
					{children}
				</div>
			</main>
		</div>
	);
}

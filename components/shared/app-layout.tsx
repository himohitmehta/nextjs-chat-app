"use client";
import React from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import useWindowSize from "@/lib/hooks/use-window-size";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { isMobile } = useWindowSize();
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<main className="flex flex-1 max-h-screen h-screen overflow-y-hidden  max-w-full w-full ">
				{!isMobile && (
					<div className=" h-screen md:w-2/12  border-r">
						<Sidebar />
					</div>
				)}
				<div className="flex-1 max-h-screen h-screen overflow-y-auto lg:w-10/12 w-full">
					{children}
				</div>
			</main>
		</div>
	);
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { Ham, HamIcon, MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export function MobileMenu() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size={"icon"}>
					<MenuIcon />
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"}>
				<SheetHeader>
					<SheetTitle>My Messenger</SheetTitle>
				</SheetHeader>
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
}

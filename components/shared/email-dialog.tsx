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

export function EmailDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Sign in with Email</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Sign in with email</DialogTitle>
					{/* <DialogDescription>
						Make changes to your profile here. Click save when
						you're done.
					</DialogDescription> */}
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							// defaultValue="email"
							className="col-span-3"
							placeholder="Email address"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="password" className="text-right">
							password
						</Label>
						<Input
							id="password"
							// defaultValue="@peduarte"
							className="col-span-3"
							placeholder="Enter placeholder"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

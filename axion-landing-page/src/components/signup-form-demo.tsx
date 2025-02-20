'use client';
import React from 'react';
import { Label } from '@/components/ui/label1';
import { Input } from '@/components/ui/input1';
import { cn } from '@/lib/utils';

export default function SignupFormDemo() {
	return (
		<div className="max-w-xl mt-5 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
			<h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
				Join the Waiting list now.
			</h2>

			<form
				className="my-8"
				action="https://formspree.io/f/xldgzeqy"
				method="POST"
			>
				<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
					<LabelInputContainer>
						<Label htmlFor="firstname">First name</Label>
						<Input
							required
							id="firstname"
							name="firstname"
							placeholder="Tyler"
							type="text"
						/>
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="lastname">Last name</Label>
						<Input
							id="lastname"
							name="lastname"
							placeholder="Durden"
							type="text"
						/>
					</LabelInputContainer>
				</div>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input
						required
						id="email"
						placeholder="xxxxx@google.com"
						type="email"
						name="email"
					/>
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<Label htmlFor="tel">Telephone</Label>
					<Input
						required
						id="tel"
						placeholder="Enter your mobile"
						type="number"
						name="tel"
					/>
				</LabelInputContainer>

				<LabelInputContainer>
					<Label htmlFor="message">Message</Label>
					<Input
						id="message"
						name="message"
						placeholder="Please don't hesitate to give suggestions or requests."
						type="text"
					/>
				</LabelInputContainer>

				<Label htmlFor="subject" hidden>
					Subject
				</Label>
				<Input
					hidden
					id="subject"
					value="Request to join waiting list"
					type="subject"
					name="subject"
					readOnly
				/>

				<button
					className="bg-gradient-to-br relative group/btn mt-3 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
				>
					Join &rarr;
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn('flex flex-col space-y-2 w-full', className)}>
			{children}
		</div>
	);
};

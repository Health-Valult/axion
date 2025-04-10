/* eslint-disable */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, Trash2 } from 'lucide-react';
import { Files, FileText, Link } from 'lucide-react';
import {
	MorphingPopover,
	MorphingPopoverTrigger,
	MorphingPopoverContent,
} from './morph';
import { motion } from 'framer-motion';
import { useId, useState, useEffect } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@heroui/react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface EmptyStateProps {
	title: string;
	description: string;
	icons?: LucideIcon[];
	className?: string;
}

export function Notes({
	title,
	description,
	icons = [FileText, Link, Files],
	className,
}: EmptyStateProps) {
	const uniqueId = useId();
	const [note, setNote] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [notesList, setNotesList] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const notesApiUrl =
		'https://axiontestgateway.azure-api.net/records/records/notes';

	// Fetch notes when component loads
	useEffect(() => {
		fetchNotes();
	}, []);

	// Function to fetch notes from API
	const fetchNotes = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(notesApiUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch notes');
			}
			const data = await response.json();
			// Assuming the API returns an array of notes or an object with a notes array
			if (Array.isArray(data)) {
				setNotesList(data);
			} else if (data.notes && Array.isArray(data.notes)) {
				setNotesList(data.notes);
			}
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Function to add a note via API
	const addNote = async (noteContent: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(notesApiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ note: noteContent }),
			});

			if (!response.ok) {
				throw new Error('Failed to add note');
			}

			// After successfully adding the note, fetch the updated list
			fetchNotes();
		} catch (error) {
			console.error('Error adding note:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const closeMenu = () => {
		setNote('');
		setIsOpen(false);
	};

	const handleSubmit = (newNote: string) => {
		if (newNote.trim() !== '') {
			// Optimistically update the UI
			setNotesList((prevNotesList) => [...prevNotesList, newNote]);

			// Send the note to the API
			addNote(newNote);
		}
	};

	const handleDelete = (indexToDelete: number): void => {
		// Implement delete functionality if API supports it
		// For now, just update the local state
		setNotesList((prevNotesList) =>
			prevNotesList.filter((_, index) => index !== indexToDelete)
		);
	};

	let gridColumnsClass = 'grid-cols-1'; // Default to single column
	if (notesList.length > 3 && notesList.length <= 6) {
		gridColumnsClass = 'grid-cols-2';
	} else if (notesList.length > 8) {
		gridColumnsClass = 'grid-cols-3';
	}

	return (
		<div
			className={cn(
				'bg-background border-border hover:border-border/80 text-center',
				'border-2 border-dashed rounded-xl p-14 w-full max-w-[620px]',
				'group hover:bg-muted/50 transition duration-500 hover:duration-200',
				className
			)}
		>
			{isLoading ? (
				<p className="text-sm text-muted-foreground">
					Loading notes...
				</p>
			) : notesList.length == 0 ? (
				<>
					<div className="flex justify-center isolate">
						{icons.length === 3 ? (
							<>
								<div className="bg-background size-12 grid place-items-center rounded-xl relative left-2.5 top-1.5 -rotate-6 shadow-lg ring-1 ring-border group-hover:-translate-x-5 group-hover:-rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
									{React.createElement(icons[0], {
										className:
											'w-6 h-6 text-muted-foreground',
									})}
								</div>
								<div className="bg-background size-12 grid place-items-center rounded-xl relative z-10 shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
									{React.createElement(icons[1], {
										className:
											'w-6 h-6 text-muted-foreground',
									})}
								</div>
								<div className="bg-background size-12 grid place-items-center rounded-xl relative right-2.5 top-1.5 rotate-6 shadow-lg ring-1 ring-border group-hover:translate-x-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
									{React.createElement(icons[2], {
										className:
											'w-6 h-6 text-muted-foreground',
									})}
								</div>
							</>
						) : (
							<div className="bg-background size-12 grid place-items-center rounded-xl shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
								{icons[0] &&
									React.createElement(icons[0], {
										className:
											'w-6 h-6 text-muted-foreground',
									})}
							</div>
						)}
					</div>
					<h2 className="text-foreground font-medium mt-6">
						{title}
					</h2>
					<p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
						{description}
					</p>
				</>
			) : (
				<div
					className={`grid gap-4 ${gridColumnsClass} justify-center justify-items-center isolate`}
				>
					{notesList.map((noteItem, index) => (
						<div key={index} className="mb-2 w-full max-w-[300px]">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="flat"
										className="w-full truncate text-left"
									>
										{noteItem.substring(0, 30)}{' '}
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px] sm:max-h-[450px] flex flex-col">
									<DialogHeader>
										<DialogTitle hidden>Note</DialogTitle>
									</DialogHeader>
									<div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-350 scrollbar-track-gray-200 overflow-x-hidden max-h-[300px]">
										<DialogDescription className="text-black dark:text-white font-semibold text-md whitespace-pre-wrap break-words">
											{noteItem}
										</DialogDescription>
									</div>
									<DialogFooter className="justify-between">
										<Button
											variant="light"
											color="danger"
											onPress={() => handleDelete(index)}
										>
											<Trash2 size={16} />
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					))}
				</div>
			)}
			<MorphingPopover
				transition={{
					type: 'spring',
					bounce: 0.05,
					duration: 0.3,
				}}
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<MorphingPopoverTrigger className="flex h-9 items-center rounded-lg border mt-4 shadow-sm active:shadow-none border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50">
					<motion.span
						layoutId={`popover-label-${uniqueId}`}
						className="text-sm"
					>
						Add Note
					</motion.span>
				</MorphingPopoverTrigger>
				<MorphingPopoverContent className="rounded-xl bg-white p-0 shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] dark:bg-zinc-700">
					<div className="h-[200px] w-[364px]">
						<form
							className="flex h-full flex-col"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit(note);
								closeMenu();
							}}
						>
							<motion.span
								layoutId={`popover-label-${uniqueId}`}
								aria-hidden="true"
								style={{
									opacity: note ? 0 : 1,
								}}
								className="absolute top-3 left-4 text-sm text-zinc-500 select-none dark:text-zinc-400"
							>
								Add Note
							</motion.span>
							<textarea
								className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
								autoFocus
								onChange={(e) => setNote(e.target.value)}
								value={note}
							/>
							<div
								key="close"
								className="flex justify-between py-3 pr-4 pl-2"
							>
								<button
									type="button"
									className="flex items-center rounded-lg bg-white px-2 py-1 text-sm text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600"
									onClick={closeMenu}
									aria-label="Close popover"
								>
									<ArrowLeftIcon
										size={16}
										className="text-zinc-900 dark:text-zinc-100"
									/>
								</button>
								<button
									className="relative ml-1 flex h-8 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
									type="submit"
									aria-label="Submit note"
									disabled={isLoading}
								>
									{isLoading ? 'Submitting...' : 'Submit'}
								</button>
							</div>
						</form>
					</div>
				</MorphingPopoverContent>
			</MorphingPopover>
		</div>
	);
}

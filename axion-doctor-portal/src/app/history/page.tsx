/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import { Pagination } from '@heroui/react';
import { DoctorsNote } from '../elements/DoctorsNote';
import ProtectedClientComponent from '../components/ProtectedClientComponent';
import { getTokensFromCookies } from '../utils/auth'; // Assuming this utility exists

const formatDateTime = (dateTimeString: string | null | undefined): string => {
	if (!dateTimeString) return '';
	const date = new Date(dateTimeString);
	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

const History: React.FC = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchNotes = async () => {
			const { sessionToken } = await getTokensFromCookies();
			try {
				const response = await fetch(
					'https://axiontestgateway.azure-api.net/records/records/prescription/symptoms-signs',
					{
						headers: {
							Authorization: `Bearer ${sessionToken}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(
						`Failed to fetch notes: ${response.status} ${response.statusText}`
					);
				}
				const data = await response.json();
				setNotes(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchNotes();
	}, []);

	// Ensure patient is not null and has diagnoses
	// if (!patient || !notes) return null;

	const itemsPerPage = 9; // Number of accordion items per page
	const totalPages = Math.ceil(notes.length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(1);

	// Reverse notes array to show latest first
	const sortedNotes = [...notes].reverse();

	// Get paginated notes
	const paginatedNotes = sortedNotes.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	if (loading) {
		return <div className="p-4">Loading notes...</div>;
	}

	if (error) {
		return <div className="p-4 text-red-500">Error: {error}</div>;
	}

	return (
		<ProtectedClientComponent>
			<div className="p-4 bg-white dark:bg-black rounded-l-sm overflow-y-auto flex flex-col justify-between h-full">
				<div className="flex-grow">
					<h3 className="dark:text-white text-black">
						Prescription History
					</h3>
					{paginatedNotes.length > 0 ? (
						<Accordion variant="splitted">
							{paginatedNotes.map((note: any) => (
								<AccordionItem
									key={note.id}
									aria-label={`Accordion ${note.id}`}
									title={`${note.indications} by ${note.doctorName}`}
								>
									<DoctorsNote
										name={note.doctorName}
										dateTime={formatDateTime(
											note.timeStamp
										)}
										indication={note.indications}
										content={note.notes || ''}
										treatment={[]}
									/>
								</AccordionItem>
							))}
						</Accordion>
					) : (
						<div className="text-center my-auto dark:text-white text-black">
							No notes found.
						</div>
					)}
				</div>

				{/* Pagination at the bottom */}
				{totalPages > 1 && (
					<div className="mt-4 flex justify-center">
						<Pagination
							showShadow
							color="warning"
							initialPage={1}
							total={totalPages}
							page={currentPage}
							onChange={setCurrentPage}
						/>
					</div>
				)}
			</div>
		</ProtectedClientComponent>
	);
};

export default History;

/* eslint-disable */
'use client';

import React from 'react';
import { AsyncSelect } from '@/components/ui/async-select';
import { Avatar } from '@heroui/react';
import { useDispatch } from 'react-redux';
import { selectPatient } from '../store/patientSlice';
import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { getTokensFromCookies } from '../utils/auth';

type PatientProfile = {
	NIC: string;
	FirstName: string;
};

const searchPatients = async (query = '') => {
	// Get the session token from the cookie
	const { sessionToken } = await getTokensFromCookies();
	// Create a new WebSocket connection with the session token as a parameter
	const socket = new WebSocket(
		`wss://axiontestgateway.azure-api.net/patients-search?token=Bearer ${sessionToken}`
	);

	// Create a promise that resolves when the WebSocket connection is open
	await new Promise<void>((resolve) => {
		socket.onopen = () => {
			resolve();
		};
	});

	// Send the search query to the WebSocket server in the specified format
	socket.send(JSON.stringify({ packet: query }));

	// Create a promise that resolves when the WebSocket server sends a response
	const patients = await new Promise<PatientProfile[]>((resolve) => {
		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			resolve(data.packet);
		};
	});

	// Close the WebSocket connection
	socket.close();

	return patients;
};

const SearchBar = () => {
	const dispatch = useDispatch();
	const [showDialog, setShowDialog] = useState(false);
	const [selectedPatient, setSelectedPatient] =
		useState<PatientProfile | null>(null);

	const handleSelectPatient = async (patientId: string | null) => {
		const { sessionToken } = await getTokensFromCookies();
		if (patientId) {
			try {
				const response = await fetch(
					`http://localhost:3000/api/proxy8`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${sessionToken}`,
						},
						body: JSON.stringify({ NIC: patientId }),
					}
				);

				if (!response.ok) {
					throw new Error('Failed to fetch patient data');
				}

				setShowDialog(true);
				setTimeout(() => setShowDialog(false), 5000); // Hide after 5 seconds
			} catch (error) {
				console.error('Error fetching patient data:', error);
				// Handle the error, show an error message, etc.
			}
		} else {
			dispatch(selectPatient({ state: null }));
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-medium">Select Patient to Checkup</h3>
			<AsyncSelect
				fetcher={searchPatients}
				renderOption={(patient) => (
					<div className="flex items-center gap-2">
						<Avatar
							isBordered
							name={patient.FirstName}
							className="h-7 w-7 rounded-full"
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
						/>
						<div className="flex flex-col">
							<div className="font-medium">{patient.NIC}</div>
							<div className="text-xs text-muted-foreground">
								{patient.FirstName}
							</div>
						</div>
					</div>
				)}
				getOptionValue={(patient) => patient.NIC}
				getDisplayValue={(patient) => patient.FirstName}
				notFound={
					<div className="py-6 text-center text-sm">
						No Patients found
					</div>
				}
				label="Patient"
				placeholder="Search patients..."
				value={selectedPatient?.NIC || ''}
				onChange={(patientNIC) => {
					handleSelectPatient(patientNIC || null);
				}}
				width="375px"
			/>
			<p className="text-sm text-muted-foreground">
				Selected Patient: {selectedPatient?.FirstName || 'none'}
			</p>

			{/* Dialog */}
			<Dialog open={showDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-center m-3">
							Axion sent a notification to the patient phone.
						</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SearchBar;

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

// const patients: Patient[] = [
// 	{
// 		id: '4568419871',
// 		firstName: 'John',
// 		lastName: 'Doe',
// 		email: 'john.doe@example.com',
// 		phone: '+1234567890',
// 		dateOfBirth: '1985-06-15',
// 		gender: 'Male',
// 		emergencyContact: {
// 			name: 'Jane Doe',
// 			phone: '+1987654321',
// 			relation: 'Wife',
// 		},
// 		summary: [
// 			{
// 				title: 'Chief Complaint',
// 				description: 'Persistent back pain',
// 			},
// 			{
// 				title: 'History of Present Illness (HPI)',
// 				description: 'Chronic lower back pain, worsens with sitting',
// 			},
// 			{
// 				title: 'Past Medical History (PMH)',
// 				description: 'Hypertension, Type 2 Diabetes',
// 			},
// 			{
// 				title: 'Past Surgical History (PSH)',
// 				description: 'None',
// 			},
// 			{
// 				title: 'Medications',
// 				description: 'Metformin, Lisinopril',
// 			},
// 			{
// 				title: 'Allergies',
// 				description: 'None',
// 			},
// 			{
// 				title: 'Family History (FHx)',
// 				description: 'Father had diabetes',
// 			},
// 			{
// 				title: 'Social History (SHx)',
// 				description: 'Ex-smoker, no alcohol use',
// 			},
// 			{
// 				title: 'Vitals',
// 				description: 'BP: 140/90, HR: 78, BMI: 30',
// 			},
// 			{
// 				title: 'Recent Labs',
// 				description: 'HbA1c: 6.8%',
// 			},
// 			{
// 				title: 'Immunizations',
// 				description: 'COVID-19 booster up to date',
// 			},
// 			{
// 				title: 'Review of Systems (ROS)',
// 				description: 'Back pain, denies fever',
// 			},
// 		],
// 		medicalHistory: [
// 			{
// 				id: 1,
// 				name: 'Pain Management',
// 				dateTime: '2024-02-01T00:45[America/Los_Angeles]',
// 				indication: 'Symptoms',
// 				content: 'Prescribed Ibuprofen for headache relief',
// 				treatment: ['Ibuprofen 200mg twice daily'],
// 			},
// 		],
// 		medicalRecords: [
// 			{
// 				date: '2023-12-15',
// 				hospital: {
// 					name: 'City Hospital',
// 					address: '123 Main St, Springfield',
// 					tel: '+1234567890',
// 				},
// 				record: 'Annual checkup, no significant issues.',
// 			},
// 		],
// 		diagnosedAilments: [
// 			{
// 				disease: 'Migraine',
// 				currentMedication: 'Paracetamol 400mg',
// 				progression: [
// 					{
// 						date: '2024-01-10',
// 						doctor: {
// 							name: 'Dr. Smith',
// 							designation: 'Neurologist',
// 							email: 'dr.smith@hospital.com',
// 						},
// 						update: 'Mild migraines diagnosed, advised lifestyle modifications.',
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		id: '4568479876',
// 		firstName: 'Emily',
// 		lastName: 'Clark',
// 		email: 'emily.clark@example.com',
// 		phone: '+9876543210',
// 		dateOfBirth: '1992-09-21',
// 		gender: 'Female',
// 		emergencyContact: {
// 			name: 'Robert Clark',
// 			phone: '+9871234560',
// 			relation: 'Brother',
// 		},
// 		summary: [
// 			{
// 				title: 'Chief Complaint',
// 				description: 'Headache for 2 days',
// 			},
// 			{
// 				title: 'History of Present Illness (HPI)',
// 				description:
// 					'Mild headache, worsens in sunlight, relieved with rest',
// 			},
// 			{
// 				title: 'Past Medical History (PMH)',
// 				description: 'Hypertension',
// 			},
// 			{
// 				title: 'Past Surgical History (PSH)',
// 				description: 'Appendectomy (2010)',
// 			},
// 			{
// 				title: 'Medications',
// 				description: 'Lisinopril 10mg daily',
// 			},
// 			{
// 				title: 'Allergies',
// 				description: 'None',
// 			},
// 			{
// 				title: 'Family History (FHx)',
// 				description: 'Father had hypertension',
// 			},
// 			{
// 				title: 'Social History (SHx)',
// 				description: 'Non-smoker, social drinker',
// 			},
// 			{
// 				title: 'Vitals',
// 				description: 'BP: 130/85, HR: 75, BMI: 26',
// 			},
// 			{
// 				title: 'Recent Labs',
// 				description: 'Normal',
// 			},
// 			{
// 				title: 'Immunizations',
// 				description: 'Flu vaccine up to date',
// 			},
// 			{
// 				title: 'Review of Systems (ROS)',
// 				description: 'No dizziness, no fever',
// 			},
// 		],
// 		medicalHistory: [
// 			{
// 				id: 2,
// 				name: 'Flu Treatment',
// 				dateTime: '2024-02-05T00:45[America/Los_Angeles]',
// 				indication: 'Diagnosis',
// 				content: 'Prescribed rest and hydration',
// 				treatment: ['Paracetamol 500mg every 6 hours'],
// 			},
// 		],
// 		medicalRecords: [],
// 		diagnosedAilments: [
// 			{
// 				disease: 'Hyperlipidemia',
// 				currentMedication: 'Atorvastatin 20mg',
// 				progression: [
// 					{
// 						date: '2021-02-15',
// 						update: 'Diagnosed with Hyperlipidemia',
// 						doctor: {
// 							name: 'Dr. Garcia',
// 							designation: 'Cardiologist',
// 							email: 'garcia@example.com',
// 						},
// 					},
// 					{
// 						date: '2021-02-16',
// 						update: 'Started Atorvastatin 20mg',
// 						doctor: {
// 							name: 'Dr. Garcia',
// 							designation: 'Cardiologist',
// 							email: 'garcia@example.com',
// 						},
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		id: '4561499877',
// 		firstName: 'Michael',
// 		lastName: 'Johnson',
// 		email: 'michael.johnson@example.com',
// 		phone: '+1122334455',
// 		dateOfBirth: '1978-03-11',
// 		gender: 'Male',
// 		emergencyContact: {
// 			name: 'Laura Johnson',
// 			phone: '+1122334466',
// 			relation: 'Wife',
// 		},
// 		summary: [
// 			{
// 				title: 'Chief Complaint',
// 				description: 'Fever and sore throat',
// 			},
// 			{
// 				title: 'History of Present Illness (HPI)',
// 				description: 'Fever for 3 days, sore throat, no cough',
// 			},
// 			{
// 				title: 'Past Medical History (PMH)',
// 				description: 'No chronic illnesses',
// 			},
// 			{
// 				title: 'Past Surgical History (PSH)',
// 				description: 'None',
// 			},
// 			{
// 				title: 'Medications',
// 				description: 'Paracetamol as needed',
// 			},
// 			{
// 				title: 'Allergies',
// 				description: 'Penicillin (rash)',
// 			},
// 			{
// 				title: 'Family History (FHx)',
// 				description: 'Mother had asthma',
// 			},
// 			{
// 				title: 'Social History (SHx)',
// 				description: 'Non-smoker, no alcohol use',
// 			},
// 			{
// 				title: 'Vitals',
// 				description: 'BP: 120/80, HR: 80, Temp: 101°F',
// 			},
// 			{
// 				title: 'Recent Labs',
// 				description: 'Pending',
// 			},
// 			{
// 				title: 'Immunizations',
// 				description: 'Flu vaccine up to date',
// 			},
// 			{
// 				title: 'Review of Systems (ROS)',
// 				description: 'Fever, sore throat, denies cough',
// 			},
// 		],
// 		medicalHistory: [
// 			{
// 				id: 3,
// 				name: 'Pain Management',
// 				dateTime: '2024-01-20T00:45[America/Los_Angeles]',
// 				indication: 'Symptoms',
// 				content: 'Prescribed physiotherapy and painkillers',
// 				treatment: ['Physiotherapy, Ibuprofen'],
// 			},
// 		],
// 		medicalRecords: [],
// 		diagnosedAilments: [
// 			{
// 				disease: 'Chronic Kidney Disease',
// 				currentMedication: 'Losartan 50mg',
// 				progression: [
// 					{
// 						date: '2018-07-10',
// 						update: 'Diagnosed with CKD Stage 2',
// 						doctor: {
// 							name: 'Dr. Martinez',
// 							designation: 'Nephrologist',
// 							email: 'martinez@example.com',
// 						},
// 					},
// 					{
// 						date: '2019-03-05',
// 						update: 'Started Losartan 50mg',
// 						doctor: {
// 							name: 'Dr. Martinez',
// 							designation: 'Nephrologist',
// 							email: 'martinez@example.com',
// 						},
// 					},
// 					{
// 						date: '2022-12-18',
// 						update: 'CKD progressed to Stage 3',
// 						doctor: {
// 							name: 'Dr. Hernandez',
// 							designation: 'Nephrologist',
// 							email: 'hernandez@example.com',
// 						},
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

// const searchPatients = async (query = '') => {
// 	await new Promise<Patient[]>((resolve) => setTimeout(resolve, 500));
// 	if (!query) return patients;
// 	return patients.filter(
// 		(patient) =>
// 			patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
// 			patient.lastName.toLowerCase().includes(query.toLowerCase()) ||
// 			patient.id.includes(query)
// 	);
// };

// const searchPatients = async (query = '') => {
// 	// Create a new WebSocket connection
// 	const socket = new WebSocket('ws://your-websocket-endpoint');

// 	// Create a promise that resolves when the WebSocket connection is open
// 	await new Promise<void>((resolve) => {
// 		socket.onopen = () => {
// 			resolve();
// 		};
// 	});

// 	// Send the search query to the WebSocket server
// 	socket.send(JSON.stringify({ query }));

// 	// Create a promise that resolves when the WebSocket server sends a response
// 	const patients = await new Promise<Patient[]>((resolve) => {
// 		socket.onmessage = (event) => {
// 			const data = JSON.parse(event.data);
// 			resolve(data.patients);
// 		};
// 	});

// 	// Close the WebSocket connection
// 	socket.close();

// 	return patients;
// };

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
	// const selectedPatient = useSelector(
	// 	(state: RootState) => state.patient.state
	// );
	const [showDialog, setShowDialog] = useState(false);
	const [selectedPatient, setSelectedPatient] =
		useState<PatientProfile | null>(null);

	// const handleSelectPatient = (patient: Patient | null) => {
	// 	if (patient) {
	// 		dispatch(selectPatient({ state: patient }));
	// 		setRandomNumber(Math.floor(100000 + Math.random() * 900000));
	// 		setShowDialog(true);
	// 		setTimeout(() => setShowDialog(false), 5000); // Hide after 5 seconds
	// 	} else {
	// 		dispatch(selectPatient({ state: null }));
	// 	}
	// };

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
			{/* <AsyncSelect
				fetcher={searchPatients}
				renderOption={(patient) => (
					<div className="flex items-center gap-2">
						<Avatar
							isBordered
							name={patient.firstName}
							className="h-7 w-7 rounded-full"
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
						/>
						<div className="flex flex-col">
							<div className="font-medium">{patient.id}</div>
							<div className="text-xs text-muted-foreground">
								{patient.firstName} {patient.lastName}
							</div>
						</div>
					</div>
				)}
				getOptionValue={(patient) => patient.id}
				getDisplayValue={(patient) =>
					`${patient.firstName} ${patient.lastName}`
				}
				notFound={
					<div className="py-6 text-center text-sm">
						No Patients found
					</div>
				}
				label="Patient"
				placeholder="Search patients..."
				value={selectedPatient?.id || ''}
				onChange={(patientId) => {
					const patient = patients.find((p) => p.id === patientId);
					handleSelectPatient(patient || null);
				}}
				width="375px"
			/> */}
			{/* <AsyncSelect
				fetcher={searchPatients}
				renderOption={(patient) => (
					<div className="flex items-center gap-2">
						<Avatar
							isBordered
							name={patient.firstName}
							className="h-7 w-7 rounded-full"
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
						/>
						<div className="flex flex-col">
							<div className="font-medium">{patient.id}</div>
							<div className="text-xs text-muted-foreground">
								{patient.firstName} {patient.lastName}
							</div>
						</div>
					</div>
				)}
				getOptionValue={(patient) => patient.id}
				getDisplayValue={(patient) =>
					`${patient.firstName} ${patient.lastName}`
				}
				notFound={
					<div className="py-6 text-center text-sm">
						No Patients found
					</div>
				}
				label="Patient"
				placeholder="Search patients..."
				value={selectedPatient?.id || ''}
				onChange={(patientId) => {
					handleSelectPatient(patientId || null);
				}}
				width="375px"
			/> */}
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
				//   onInputChange={(value) => {
				//     searchPatients(value);
				//   }}
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
							Axion sent a notification to the patient's phone.
						</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SearchBar;

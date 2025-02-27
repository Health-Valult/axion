import React from 'react';
import { Patient } from '../models/types/Patient';
import { AsyncSelect } from '@/components/ui/async-select';
import { Avatar } from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectPatient } from '../store/patientSlice';
import { useState, useEffect } from 'react';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

const patients: Patient[] = [
	{
		id: '4568419871',
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		phone: '+1234567890',
		dateOfBirth: '1985-06-15',
		gender: 'Male',
		emergencyContact: {
			name: 'Jane Doe',
			phone: '+1987654321',
			relation: 'Wife',
		},
		summary: {
			chiefComplaint: 'Headache for 2 days',
			hpi: 'Mild headache, worsens in sunlight, relieved with rest',
			pmh: 'Hypertension',
			psh: 'Appendectomy (2010)',
			medications: 'Lisinopril 10mg daily',
			allergies: 'None',
			fhx: 'Father had hypertension',
			shx: 'Non-smoker, social drinker',
			vitals: 'BP: 130/85, HR: 75, BMI: 26',
			recentLabs: 'Normal',
			immunizations: 'Flu vaccine up to date',
			ros: 'No dizziness, no fever',
		},
		medicalHistory: [
			{
				id: 1,
				name: 'Pain Management',
				dateTime: '2024-02-01T00:45[America/Los_Angeles]',
				indication: 'Symptoms',
				content: 'Prescribed Ibuprofen for headache relief',
				treatment: ['Ibuprofen 200mg twice daily'],
			},
		],
		medicalRecords: [
			{
				date: '2023-12-15',
				hospital: {
					name: 'City Hospital',
					address: '123 Main St, Springfield',
					tel: '+1234567890',
				},
				record: 'Annual checkup, no significant issues.',
			},
		],
		diagnosedAilments: [
			{
				disease: 'Migraine',
				currentMedication: 'Paracetamol 400mg',
				progression: [
					{
						date: '2024-01-10',
						doctor: {
							name: 'Dr. Smith',
							designation: 'Neurologist',
							email: 'dr.smith@hospital.com',
						},
						update: 'Mild migraines diagnosed, advised lifestyle modifications.',
					},
				],
			},
		],
	},
	{
		id: '4568479876',
		firstName: 'Emily',
		lastName: 'Clark',
		email: 'emily.clark@example.com',
		phone: '+9876543210',
		dateOfBirth: '1992-09-21',
		gender: 'Female',
		emergencyContact: {
			name: 'Robert Clark',
			phone: '+9871234560',
			relation: 'Brother',
		},
		summary: {
			chiefComplaint: 'Fever and sore throat',
			hpi: 'Fever for 3 days, sore throat, no cough',
			pmh: 'No chronic illnesses',
			psh: 'None',
			medications: 'Paracetamol as needed',
			allergies: 'Penicillin (rash)',
			fhx: 'Mother had asthma',
			shx: 'Non-smoker, no alcohol use',
			vitals: 'BP: 120/80, HR: 80, Temp: 101°F',
			recentLabs: 'Pending',
			immunizations: 'Flu vaccine up to date',
			ros: 'Fever, sore throat, denies cough',
		},
		medicalHistory: [
			{
				id: 2,
				name: 'Flu Treatment',
				dateTime: '2024-02-05T00:45[America/Los_Angeles]',
				indication: 'Diagnosis',
				content: 'Prescribed rest and hydration',
				treatment: ['Paracetamol 500mg every 6 hours'],
			},
		],
		medicalRecords: [],
		diagnosedAilments: [
			{
				disease: 'Hyperlipidemia',
				currentMedication: 'Atorvastatin 20mg',
				progression: [
					{
						date: '2021-02-15',
						update: 'Diagnosed with Hyperlipidemia',
						doctor: {
							name: 'Dr. Garcia',
							designation: 'Cardiologist',
							email: 'garcia@example.com',
						},
					},
					{
						date: '2021-02-16',
						update: 'Started Atorvastatin 20mg',
						doctor: {
							name: 'Dr. Garcia',
							designation: 'Cardiologist',
							email: 'garcia@example.com',
						},
					},
				],
			},
		],
	},
	{
		id: '4561499877',
		firstName: 'Michael',
		lastName: 'Johnson',
		email: 'michael.johnson@example.com',
		phone: '+1122334455',
		dateOfBirth: '1978-03-11',
		gender: 'Male',
		emergencyContact: {
			name: 'Laura Johnson',
			phone: '+1122334466',
			relation: 'Wife',
		},
		summary: {
			chiefComplaint: 'Persistent back pain',
			hpi: 'Chronic lower back pain, worsens with sitting',
			pmh: 'Hypertension, Type 2 Diabetes',
			psh: 'None',
			medications: 'Metformin, Lisinopril',
			allergies: 'None',
			fhx: 'Father had diabetes',
			shx: 'Ex-smoker, no alcohol use',
			vitals: 'BP: 140/90, HR: 78, BMI: 30',
			recentLabs: 'HbA1c: 6.8%',
			immunizations: 'COVID-19 booster up to date',
			ros: 'Back pain, denies fever',
		},
		medicalHistory: [
			{
				id: 3,
				name: 'Pain Management',
				dateTime: '2024-01-20T00:45[America/Los_Angeles]',
				indication: 'Symptoms',
				content: 'Prescribed physiotherapy and painkillers',
				treatment: ['Physiotherapy, Ibuprofen'],
			},
		],
		medicalRecords: [],
		diagnosedAilments: [
			{
				disease: 'Chronic Kidney Disease',
				currentMedication: 'Losartan 50mg',
				progression: [
					{
						date: '2018-07-10',
						update: 'Diagnosed with CKD Stage 2',
						doctor: {
							name: 'Dr. Martinez',
							designation: 'Nephrologist',
							email: 'martinez@example.com',
						},
					},
					{
						date: '2019-03-05',
						update: 'Started Losartan 50mg',
						doctor: {
							name: 'Dr. Martinez',
							designation: 'Nephrologist',
							email: 'martinez@example.com',
						},
					},
					{
						date: '2022-12-18',
						update: 'CKD progressed to Stage 3',
						doctor: {
							name: 'Dr. Hernandez',
							designation: 'Nephrologist',
							email: 'hernandez@example.com',
						},
					},
				],
			},
		],
	},
	{
		id: '6664826871',
		firstName: 'Tom',
		lastName: 'Parker',
		email: 'tomparker@example.com',
		phone: '+114634455',
		dateOfBirth: '1998-03-11',
		gender: 'Male',
		emergencyContact: {
			name: 'Anna Parker',
			phone: '+112484466',
			relation: 'Wife',
		},
		summary: {
			chiefComplaint: 'Headache for 2 days',
			hpi: 'Mild headache, worsens in sunlight, relieved with rest',
			pmh: 'Hypertension',
			psh: 'Appendectomy (2010)',
			medications: 'Lisinopril 10mg daily',
			allergies: 'None',
			fhx: 'Father had hypertension',
			shx: 'Non-smoker, social drinker',
			vitals: 'BP: 130/85, HR: 75, BMI: 26',
			recentLabs: 'Normal',
			immunizations: 'Flu vaccine up to date',
			ros: 'No dizziness, no fever',
		},
		medicalHistory: [
			{
				id: 1,
				name: 'Pain Management',
				dateTime: '2024-02-01T00:45[America/Los_Angeles]',
				indication: 'Symptoms',
				content: 'Prescribed Ibuprofen for headache relief',
				treatment: ['Ibuprofen 200mg twice daily'],
			},
			{
				id: 2,
				name: 'Hypertension Control',
				dateTime: '2023-09-15T00:45[America/Los_Angeles]',
				indication: 'Diagnosis',
				content: 'Started on Lisinopril 10mg daily',
				treatment: ['Lisinopril 10mg daily', 'Low-sodium diet'],
			},
		],
		medicalRecords: [
			{
				date: '2023-12-15',
				hospital: {
					name: 'City Hospital',
					address: '123 Main St, Springfield',
					tel: '+1234567890',
				},
				record: 'Annual checkup, no significant issues.',
			},
			{
				date: '2022-11-10',
				hospital: {
					name: 'General Medical Center',
					address: '456 Oak St, Springfield',
					tel: '+1234598765',
				},
				record: 'ER visit due to severe headache, CT scan normal.',
			},
		],
		diagnosedAilments: [
			{
				disease: 'Migraine',
				currentMedication: 'Ibuprofen 200mg PRN',
				progression: [
					{
						date: '2024-01-10',
						doctor: {
							name: 'Dr. Smith',
							designation: 'Neurologist',
							email: 'dr.smith@hospital.com',
						},
						update: 'Mild migraines diagnosed, advised lifestyle modifications.',
					},
				],
			},
			{
				disease: 'Hypertension',
				currentMedication: 'Amlodipine 5mg daily',
				progression: [
					{
						date: '2023-09-15',
						doctor: {
							name: 'Dr. James',
							designation: 'Cardiologist',
							email: 'dr.james@hospital.com',
						},
						update: 'Diagnosed with stage 1 hypertension, started on medication.',
					},
				],
			},
		],
	},
	{
		id: '4568461574',
		firstName: 'Sophia',
		lastName: 'Martinez',
		email: 'sophia.martinez@example.com',
		phone: '+4455667788',
		dateOfBirth: '2000-07-08',
		gender: 'Female',
		emergencyContact: {
			name: 'Carlos Martinez',
			phone: '+4455667799',
			relation: 'Father',
		},
		summary: {
			chiefComplaint: 'Fever and sore throat',
			hpi: 'Fever for 3 days, sore throat, no cough',
			pmh: 'No chronic illnesses',
			psh: 'None',
			medications: 'Paracetamol as needed',
			allergies: 'Penicillin (rash)',
			fhx: 'Mother had asthma',
			shx: 'Non-smoker, no alcohol use',
			vitals: 'BP: 120/80, HR: 80, Temp: 101°F',
			recentLabs: 'Pending',
			immunizations: 'Flu vaccine up to date',
			ros: 'Fever, sore throat, denies cough',
		},
		medicalHistory: [
			{
				id: 3,
				name: 'Flu Treatment',
				dateTime: '2024-02-05T00:45[America/Los_Angeles]',
				indication: 'Diagnosis',
				content: 'Prescribed rest and hydration',
				treatment: ['Paracetamol 500mg every 6 hours'],
			},
		],
		medicalRecords: [
			{
				date: '2023-10-20',
				hospital: {
					name: 'Metro Clinic',
					address: '789 Pine St, Springfield',
					tel: '+9876543120',
				},
				record: 'Mild flu, recommended home treatment.',
			},
		],
		diagnosedAilments: [
			{
				disease: 'Type 2 Diabetes',
				currentMedication: 'Metformin 500mg',
				progression: [
					{
						date: '2020-05-12',
						update: 'Diagnosed with Type 2 Diabetes',
						doctor: {
							name: 'Dr. Smith',
							designation: 'Neurologist',
							email: 'smith@example.com',
						},
					},
					{
						date: '2020-05-13',
						update: 'Started Metformin 500mg BID',
						doctor: {
							name: 'Dr. Smith',
							designation: 'Neurologist',
							email: 'smith@example.com',
						},
					},
					{
						date: '2021-06-20',
						update: 'Increased Metformin to 1000mg BID',
						doctor: {
							name: 'Dr. Johnson',
							designation: 'Endocrinologist',
							email: 'johnson@example.com',
						},
					},
					{
						date: '2023-01-10',
						update: 'Started Insulin (Long-Acting) at 10 units/day',
						doctor: {
							name: 'Dr. Williams',
							designation: 'Endocrinologist',
							email: 'williams@example.com',
						},
					},
				],
			},
		],
	},
	{
		id: '4218448276',
		firstName: 'Daniel',
		lastName: 'Brown',
		email: 'daniel.brown@example.com',
		phone: '+9988776655',
		dateOfBirth: '1995-12-30',
		gender: 'Male',
		emergencyContact: {
			name: 'Sarah Brown',
			phone: '+9988776644',
			relation: 'Sister',
		},
		summary: {
			chiefComplaint: 'Persistent back pain',
			hpi: 'Chronic lower back pain, worsens with sitting',
			pmh: 'Hypertension, Type 2 Diabetes',
			psh: 'None',
			medications: 'Metformin, Lisinopril',
			allergies: 'None',
			fhx: 'Father had diabetes',
			shx: 'Ex-smoker, no alcohol use',
			vitals: 'BP: 140/90, HR: 78, BMI: 30',
			recentLabs: 'HbA1c: 6.8%',
			immunizations: 'COVID-19 booster up to date',
			ros: 'Back pain, denies fever',
		},
		medicalHistory: [
			{
				id: 4,
				name: 'Diabetes Management',
				dateTime: '2022-07-15T00:45[America/Los_Angeles]',
				indication: 'Diagnosis',
				content: 'Started on Metformin for blood sugar control.',
				treatment: ['Metformin 500mg twice daily'],
			},
			{
				id: 5,
				name: 'Physical Therapy for Back Pain',
				dateTime: '2023-10-05T00:45[America/Los_Angeles]',
				indication: 'Symptoms',
				content: 'Referred to physiotherapy.',
				treatment: [
					'Weekly physiotherapy sessions',
					'Stretching exercises',
				],
			},
		],
		medicalRecords: [
			{
				date: '2023-06-12',
				hospital: {
					name: 'Springfield Medical Center',
					address: '321 Elm St, Springfield',
					tel: '+1122339988',
				},
				record: 'Diabetes management consultation.',
			},
		],
		diagnosedAilments: [
			{
				disease: 'Coronary Artery Disease',
				currentMedication: 'Clopidogrel 75mg',
				progression: [
					{
						date: '2017-09-28',
						update: 'Diagnosed with CAD',
						doctor: {
							name: 'Dr. Wilson',
							designation: 'Cardiologist',
							email: 'wilson@example.com',
						},
					},
					{
						date: '2017-10-01',
						update: 'Started Clopidogrel 75mg',
						doctor: {
							name: 'Dr. Wilson',
							designation: 'Cardiologist',
							email: 'wilson@example.com',
						},
					},
					{
						date: '2020-06-15',
						update: 'Underwent Coronary Angioplasty',
						doctor: {
							name: 'Dr. Lee',
							designation: 'Cardiologist',
							email: 'lee@example.com',
						},
					},
				],
			},
		],
	},
];

const searchPatients = async (query = '') => {
	await new Promise<Patient[]>((resolve) => setTimeout(resolve, 500));
	if (!query) return patients;
	return patients.filter(
		(patient) =>
			patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
			patient.lastName.toLowerCase().includes(query.toLowerCase()) ||
			patient.id.includes(query)
	);
};

const SearchBar = () => {
	const dispatch = useDispatch();
	const selectedPatient = useSelector(
		(state: RootState) => state.patient.state
	);
	const [showDialog, setShowDialog] = useState(false);
	const [randomNumber, setRandomNumber] = useState<number | null>(null);

	const handleSelectPatient = (patient: Patient | null) => {
		if (patient) {
			dispatch(selectPatient({ state: patient }));
			setRandomNumber(Math.floor(10 + Math.random() * 90)); // Generate 2-digit number
			setShowDialog(true);
			setTimeout(() => setShowDialog(false), 5000); // Hide after 5 seconds
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
			/>
			<p className="text-sm text-muted-foreground">
				Selected Patient ID: {selectedPatient?.id || 'none'}
			</p>

			{/* Dialog */}
			<Dialog open={showDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-center m-3">
							Axion sent a notification to the patient's phone.
							Tap the number shown here to sign in.
						</DialogTitle>
					</DialogHeader>
					<div className="text-3xl font-bold text-center border-gray-500 p-8">
						{randomNumber}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SearchBar;

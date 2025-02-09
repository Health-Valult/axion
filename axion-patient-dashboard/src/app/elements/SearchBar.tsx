import React from 'react';
import { Patient } from '../models/types/Patient';
import { AsyncSelect } from '@/components/ui/async-select';
import { Avatar } from '@heroui/react';

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
				dateTime: '2024-02-01',
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
				progression: [
					{
						date: '2024-01-10',
						doctor: {
							name: 'Dr. Smith',
							desgination: 'Neurologist',
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
				dateTime: '2024-02-05',
				indication: 'Diagnosis',
				content: 'Prescribed rest and hydration',
				treatment: ['Paracetamol 500mg every 6 hours'],
			},
		],
		medicalRecords: [],
		diagnosedAilments: [],
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
				dateTime: '2024-01-20',
				indication: 'Symptoms',
				content: 'Prescribed physiotherapy and painkillers',
				treatment: ['Physiotherapy, Ibuprofen'],
			},
		],
		medicalRecords: [],
		diagnosedAilments: [],
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
				dateTime: '2024-02-01',
				indication: 'Symptoms',
				content: 'Prescribed Ibuprofen for headache relief',
				treatment: ['Ibuprofen 200mg twice daily'],
			},
			{
				id: 2,
				name: 'Hypertension Control',
				dateTime: '2023-09-15',
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
				progression: [
					{
						date: '2024-01-10',
						doctor: {
							name: 'Dr. Smith',
							desgination: 'Neurologist',
							email: 'dr.smith@hospital.com',
						},
						update: 'Mild migraines diagnosed, advised lifestyle modifications.',
					},
				],
			},
			{
				disease: 'Hypertension',
				progression: [
					{
						date: '2023-09-15',
						doctor: {
							name: 'Dr. James',
							desgination: 'Cardiologist',
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
				dateTime: '2024-02-05',
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
				disease: 'Influenza',
				progression: [
					{
						date: '2024-02-05',
						doctor: {
							name: 'Dr. Green',
							desgination: 'General Physician',
							email: 'dr.green@clinic.com',
						},
						update: 'Mild flu symptoms, self-limiting illness expected.',
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
				dateTime: '2022-07-15',
				indication: 'Diagnosis',
				content: 'Started on Metformin for blood sugar control.',
				treatment: ['Metformin 500mg twice daily'],
			},
			{
				id: 5,
				name: 'Physical Therapy for Back Pain',
				dateTime: '2023-10-05',
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
				disease: 'Type 2 Diabetes',
				progression: [
					{
						date: '2022-07-15',
						doctor: {
							name: 'Dr. Patel',
							desgination: 'Endocrinologist',
							email: 'dr.patel@diabetesclinic.com',
						},
						update: 'Started on Metformin, advised dietary changes.',
					},
				],
			},
		],
	},
];

const searchPatients = async (query?: string): Promise<Patient[]> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	if (!query) return patients;

	return patients.filter(
		(patient) =>
			patient.firstName.toLowerCase().includes(query.toLowerCase()) ||
			patient.lastName.toLowerCase().includes(query.toLowerCase()) ||
			patient.id.includes(query)
	);
};

// Basic Demo
const SearchBar: React.FC = () => {
	const [selectedPatient, setSelectedPatient] = React.useState('');

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-medium">Select Patient to checkup</h3>
			<AsyncSelect<Patient>
				fetcher={searchPatients}
				renderOption={(patient) => (
					<div className="flex items-center gap-2">
						<Avatar
							isBordered
							name={patient.firstName}
							className="transition-transform h-7 w-7 flex-shrink-0 rounded-full"
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
				getDisplayValue={(patient) => (
					<div className="flex items-center gap-2 text-left">
						<Avatar
							isBordered
							name={patient.firstName}
							className="transition-transform h-24 w-24 flex-shrink-0 rounded-full"
							src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
						/>
						<div className="flex flex-col leading-tight">
							<div className="font-medium">{patient.id}</div>
							<div className="text-xxs text-muted-foreground">
								{patient.firstName} {patient.lastName}
							</div>
						</div>
					</div>
				)}
				notFound={
					<div className="py-6 text-center text-sm">
						No Patients found
					</div>
				}
				label="Patient"
				placeholder="Search patients..."
				value={selectedPatient}
				onChange={setSelectedPatient}
				width="375px"
			/>
			<p className="text-sm text-muted-foreground">
				Selected Patient ID: {selectedPatient || 'none'}
			</p>
		</div>
	);
};

export default SearchBar;

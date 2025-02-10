'use client';

import React, { useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import { Pagination } from '@heroui/react';
import { DoctorsNote } from '../elements/DoctorsNote';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const History: React.FC = () => {
	// const notes = [
	// 	{
	// 		id: 1,
	// 		name: 'Dr. Smith',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Patient has a mild fever.',
	// 		treatment: ['Paracetamol', 'Rest'],
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Dr. Jones',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Recommended antibiotics for throat infection.',
	// 		treatment: ['Amoxicillin'],
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Dr. Miller',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Follow-up in 2 weeks.',
	// 		treatment: [],
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Dr. Lee',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Blood test results pending.',
	// 		treatment: [],
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Dr. Brown',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Advised more hydration and rest.',
	// 		treatment: ['Electrolyte drinks', 'Fluids'],
	// 	},
	// 	{
	// 		id: 6,
	// 		name: 'Dr. White',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Patient reported persistent headache.',
	// 		treatment: ['Ibuprofen', 'Rest'],
	// 	},
	// 	{
	// 		id: 7,
	// 		name: 'Dr. Taylor',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Diagnosed with seasonal allergies.',
	// 		treatment: ['Antihistamines'],
	// 	},
	// 	{
	// 		id: 8,
	// 		name: 'Dr. Adams',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Complaints of dizziness and nausea.',
	// 		treatment: ['Hydration', 'Rest'],
	// 	},
	// 	{
	// 		id: 9,
	// 		name: 'Dr. Wilson',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Confirmed case of mild food poisoning.',
	// 		treatment: ['Electrolytes', 'Rest'],
	// 	},
	// 	{
	// 		id: 10,
	// 		name: 'Dr. Evans',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Complained of muscle pain after exercise.',
	// 		treatment: ['Pain relievers', 'Hydration'],
	// 	},
	// 	{
	// 		id: 11,
	// 		name: 'Dr. Harris',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Diagnosed with mild anxiety.',
	// 		treatment: ['Breathing exercises', 'Therapy'],
	// 	},
	// 	{
	// 		id: 12,
	// 		name: 'Dr. Clark',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Reported persistent cough.',
	// 		treatment: ['Cough syrup', 'Steam inhalation'],
	// 	},
	// 	{
	// 		id: 13,
	// 		name: 'Dr. Lewis',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Confirmed case of mild bronchitis.',
	// 		treatment: ['Antibiotics', 'Rest'],
	// 	},
	// 	{
	// 		id: 14,
	// 		name: 'Dr. Walker',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Patient complained of lower back pain.',
	// 		treatment: ['Physiotherapy', 'Pain relievers'],
	// 	},
	// 	{
	// 		id: 15,
	// 		name: 'Dr. Hall',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Confirmed diagnosis of high cholesterol.',
	// 		treatment: ['Diet change', 'Exercise'],
	// 	},
	// 	{
	// 		id: 16,
	// 		name: 'Dr. Allen',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Reported difficulty sleeping.',
	// 		treatment: ['Sleep hygiene tips', 'Melatonin'],
	// 	},
	// 	{
	// 		id: 17,
	// 		name: 'Dr. Young',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Diagnosed with mild asthma.',
	// 		treatment: ['Inhaler', 'Avoid allergens'],
	// 	},
	// 	{
	// 		id: 18,
	// 		name: 'Dr. King',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Complained of knee pain after running.',
	// 		treatment: ['Ice packs', 'Physiotherapy'],
	// 	},
	// 	{
	// 		id: 19,
	// 		name: 'Dr. Wright',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Confirmed mild iron deficiency.',
	// 		treatment: ['Iron supplements', 'Diet adjustment'],
	// 	},
	// 	{
	// 		id: 20,
	// 		name: 'Dr. Scott',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Reported mild eye irritation.',
	// 		treatment: ['Eye drops', 'Rest'],
	// 	},
	// 	{
	// 		id: 21,
	// 		name: 'Dr. Green',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Diagnosed with seasonal flu.',
	// 		treatment: ['Fluids', 'Rest'],
	// 	},
	// 	{
	// 		id: 22,
	// 		name: 'Dr. Baker',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Patient reported mild chest pain.',
	// 		treatment: ['ECG test', 'Rest'],
	// 	},
	// 	{
	// 		id: 23,
	// 		name: 'Dr. Carter',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Mild case of stomach ulcer.',
	// 		treatment: ['Antacids', 'Diet change'],
	// 	},
	// 	{
	// 		id: 24,
	// 		name: 'Dr. Nelson',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'symptoms/signs',
	// 		content: 'Patient complained of ear pain.',
	// 		treatment: ['Pain relievers', 'Antibiotic drops'],
	// 	},
	// 	{
	// 		id: 25,
	// 		name: 'Dr. Perez',
	// 		dateTime: '2022-11-07T00:45[America/Los_Angeles]',
	// 		indication: 'diagnosis',
	// 		content: 'Confirmed case of mild tendonitis.',
	// 		treatment: ['Rest', 'Ice therapy'],
	// 	},
	// ];

	const patient = useSelector((state: RootState) => state.patient.state);

	// Ensure patient is not null and has diagnoses
	if (!patient || !patient.medicalHistory) return null;

	const itemsPerPage = 9; // Number of accordion items per page
	const totalPages = Math.ceil(patient.medicalHistory.length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(1);

	// Reverse notes array to show latest first
	const sortedNotes = [...patient.medicalHistory].reverse();

	// Get paginated notes
	const paginatedNotes = sortedNotes.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<div className="p-4 bg-white rounded-l-sm overflow-y-auto flex flex-col justify-between h-full">
			<div className="flex-grow">
				<Accordion variant="splitted">
					{paginatedNotes.map((note) => (
						<AccordionItem
							key={note.id}
							aria-label={`Accordion ${note.id}`}
							title={`${note.indication} by ${note.name}`}
						>
							<DoctorsNote
								name={note.name}
								dateTime={note.dateTime}
								indication={note.indication}
								content={note.content}
								treatment={note.treatment}
							/>
						</AccordionItem>
					))}
				</Accordion>
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
	);
};

export default History;

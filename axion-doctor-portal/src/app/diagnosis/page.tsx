/* eslint-disable */
'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import DiagnosisTimeline from '../elements/DiagnosisTimeline';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProtectedClientComponent from '../components/ProtectedClientComponent';

const Diagnosis: React.FC = () => {
	// const patient = useSelector((state: RootState) => state.patient.state);

	const diagnosedAilments = [
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
	];

	return (
		<ProtectedClientComponent>
			<div className="flex flex-1 bg-white rounded-l-sm h-full overflow-y-auto">
				<WordPullUp
					className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
					words="Diagnosed Chronic Conditions"
				/>
				<Accordion variant="shadow">
					{diagnosedAilments.map((illness) => (
						<AccordionItem
							key={illness.disease}
							aria-label={`${illness.disease}`}
							title={`${illness.disease}`}
						>
							<span>{illness.currentMedication}</span>
							<DiagnosisTimeline illness={illness} />
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</ProtectedClientComponent>
	);
};

export default Diagnosis;

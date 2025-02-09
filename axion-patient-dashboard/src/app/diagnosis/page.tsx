'use client';

import { Accordion, AccordionItem } from '@heroui/react';
import DiagnosisTimeline from '../elements/DiagnosisTimeline';
import { DiagnosisRecord } from '../types/types';
import { WordPullUp } from '@/components/ui/word-pull-up';

export default function App() {
	const diagnosis: DiagnosisRecord[] = [
		{
			disease: 'Type 2 Diabetes',
			medication: 'Metformin 500mg',
			history: [
				{
					date: '2020-05-12',
					diagnosis_update: 'Diagnosed with Type 2 Diabetes',
					doctor: 'Dr. Smith',
				},
				{
					date: '2020-05-13',
					diagnosis_update: 'Started Metformin 500mg BID',
					doctor: 'Dr. Smith',
				},
				{
					date: '2021-06-20',
					diagnosis_update: 'Increased Metformin to 1000mg BID',
					doctor: 'Dr. Johnson',
				},
				{
					date: '2023-01-10',
					diagnosis_update:
						'Started Insulin (Long-Acting) at 10 units/day',
					doctor: 'Dr. Williams',
				},
			],
		},
		{
			disease: 'Hypertension',
			medication: 'Lisinopril 10mg',
			history: [
				{
					date: '2019-08-20',
					diagnosis_update: 'Diagnosed with Hypertension',
					doctor: 'Dr. Brown',
				},
				{
					date: '2019-08-21',
					diagnosis_update: 'Started Lisinopril 5mg',
					doctor: 'Dr. Brown',
				},
				{
					date: '2020-02-10',
					diagnosis_update: 'Increased Lisinopril to 10mg',
					doctor: 'Dr. Davis',
				},
				{
					date: '2021-11-05',
					diagnosis_update: 'Added Amlodipine 5mg',
					doctor: 'Dr. Davis',
				},
			],
		},
		{
			disease: 'Hyperlipidemia',
			medication: 'Atorvastatin 20mg',
			history: [
				{
					date: '2021-02-15',
					diagnosis_update: 'Diagnosed with Hyperlipidemia',
					doctor: 'Dr. Garcia',
				},
				{
					date: '2021-02-16',
					diagnosis_update: 'Started Atorvastatin 20mg',
					doctor: 'Dr. Garcia',
				},
			],
		},
		{
			disease: 'Chronic Kidney Disease',
			medication: 'Losartan 50mg',
			history: [
				{
					date: '2018-07-10',
					diagnosis_update: 'Diagnosed with CKD Stage 2',
					doctor: 'Dr. Martinez',
				},
				{
					date: '2019-03-05',
					diagnosis_update: 'Started Losartan 50mg',
					doctor: 'Dr. Martinez',
				},
				{
					date: '2022-12-18',
					diagnosis_update: 'CKD progressed to Stage 3',
					doctor: 'Dr. Hernandez',
				},
			],
		},
		{
			disease: 'Coronary Artery Disease',
			medication: 'Clopidogrel 75mg',
			history: [
				{
					date: '2017-09-28',
					diagnosis_update: 'Diagnosed with CAD',
					doctor: 'Dr. Wilson',
				},
				{
					date: '2017-10-01',
					diagnosis_update: 'Started Clopidogrel 75mg',
					doctor: 'Dr. Wilson',
				},
				{
					date: '2020-06-15',
					diagnosis_update: 'Underwent Coronary Angioplasty',
					doctor: 'Dr. Lee',
				},
			],
		},
	];

	return (
		<div className="flex flex-1 bg-white rounded-l-sm h-full overflow-y-auto">
			<WordPullUp
				className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
				words="Diagnosed Chronic Conditions"
			/>
			<Accordion variant="shadow">
				{diagnosis.map((illness) => (
					<AccordionItem
						key={illness.disease}
						aria-label={`${illness.disease}`}
						title={`${illness.disease}`}
					>
						<DiagnosisTimeline illness={illness} />
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

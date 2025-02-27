'use client';

import { Card } from '@/components/ui/card2';
import { motion } from 'framer-motion';

const recentPatients = [
	{
		name: 'John Doe',
		conditionSummary:
			'Diagnosed with Type 2 Diabetes, managing with Metformin.',
		checkupSummary:
			'Routine checkup, stable blood sugar levels, advised dietary adjustments.',
	},
	{
		name: 'Jane Smith',
		conditionSummary:
			'Hypertension and mild hyperlipidemia, controlled with medication.',
		checkupSummary:
			'Blood pressure slightly elevated, increased Lisinopril dosage.',
	},
	{
		name: 'Robert Johnson',
		conditionSummary:
			'Recovering from coronary angioplasty, on Clopidogrel.',
		checkupSummary:
			'No complications observed, advised regular exercise and healthy diet.',
	},
	{
		name: 'Emily Davis',
		conditionSummary:
			'Migraine episodes, currently managed with lifestyle modifications.',
		checkupSummary:
			'Reduced migraine frequency, prescribed preventive medication.',
	},
	{
		name: 'Michael Lee',
		conditionSummary:
			'Chronic kidney disease, stage 3, on Losartan therapy.',
		checkupSummary:
			'Renal function stable, continued monitoring recommended.',
	},
	{
		name: 'John Park',
		conditionSummary:
			'Chronic kidney disease, stage 3, on Losartan therapy.',
		checkupSummary:
			'Renal function stable, continued monitoring recommended.',
	},
];

const RecentPatients = () => {
	return (
		<div className="bg-white dark:bg-black text-center">
			<span className="font-bold items-center justify-center mx-auto">
				Recent Patient Checkups
			</span>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
				{recentPatients.map((patient, index) => (
					<motion.div
						key={index}
						whileHover={{
							scale: 1.05,
							boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
						}}
						transition={{ duration: 0.3 }}
						className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-black"
					>
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
							className="rounded-lg overflow-hidden"
						>
							<Card
								variant="neubrutalism"
								title={patient.name}
								description={
									patient.conditionSummary +
									' ' +
									patient.checkupSummary
								}
								className="rounded-lg shadow-md bg-white dark:bg-black dark:text-white dark:border-gray-600"
							></Card>
						</motion.div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default RecentPatients;

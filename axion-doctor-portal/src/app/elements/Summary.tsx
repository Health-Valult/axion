'use client';

import React from 'react';
import { User } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const patientData = [
	{
		title: 'Chief Complaint',
		description: 'Chest pain for 3 days',
	},
	{
		title: 'HPI',
		description: 'Sudden onset, worsens with exertion, relieved with rest',
	},
	{
		title: 'PMH',
		description: 'Hypertension, Type 2 Diabetes, Hyperlipidemia',
	},
	{
		title: 'PSH',
		description: 'CABG (2018)',
	},
	{
		title: 'Medications',
		description:
			'Metformin 500mg BID, Lisinopril 10mg daily, Atorvastatin 40mg',
	},
	{
		title: 'Allergies',
		description: 'Penicillin (rash)',
	},
	{
		title: 'FHx',
		description: 'Father had heart disease, Mother had Type 2 Diabetes',
	},
	{
		title: 'SHx',
		description:
			'Smoker (1 pack/day), occasional alcohol, sedentary lifestyle',
	},
	{
		title: 'Vitals',
		description: 'BP: 145/90, HR: 88, BMI: 28',
	},
	{
		title: 'Recent Labs',
		description: 'HbA1c: 7.2%, LDL: 130 mg/dL',
	},
	{
		title: 'Immunizations',
		description: 'Flu vaccine up to date, COVID-19 booster pending',
	},
	{
		title: 'ROS',
		description: 'Reports mild dizziness, denies fever, cough, or swelling',
	},
];

interface summaryProps {
	name: string;
	age: number;
	gender: string;
	patientData: {
		title: string;
		description: string;
	}[];
}

const Summary: React.FC<summaryProps> = ({
	name,
	age,
	gender,
	patientData,
}) => {
	return (
		<Card className="w-full shadow-none border-gray-300 dark:border-gray-700">
			<CardHeader>
				<CardTitle>
					<User />
					<div className="flex flex-col mt-2">
						<span className="p-1">
							{name} ({age})
						</span>
						<span className="p-1">
							{gender === 'Male' ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									fill="currentColor"
									className="bi bi-gender-male"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
									fill="currentColor"
									className="bi bi-gender-female"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"
									/>
								</svg>
							)}
						</span>
					</div>
				</CardTitle>
				<CardDescription>Patient Summary</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div>
					{patientData.map((section, index) => (
						<div
							key={index}
							className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
						>
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									{section.title}
								</p>
								<p className="text-sm text-muted-foreground">
									{section.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default Summary;

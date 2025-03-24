/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import DiagnosisTimeline from '../elements/DiagnosisTimeline';
import { WordPullUp } from '@/components/ui/word-pull-up';
import ProtectedClientComponent from '../components/ProtectedClientComponent';
import { getTokensFromCookies } from '../utils/auth';

const Diagnosis: React.FC = () => {
	// State to store fetched diagnoses
	const [diagnosedAilments, setDiagnosedAilments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const { sessionToken } = await getTokensFromCookies();
			setLoading(true);
			try {
				const response = await fetch(
					'http://localhost:3000/api/proxy12',
					{
						headers: {
							Authorization: `Bearer ${sessionToken}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(
						`Failed to fetch diagnoses: ${response.status} ${response.statusText}`
					);
				}

				const data = await response.json();

				// Process and transform the data
				const transformedData = processApiData(data);
				setDiagnosedAilments(transformedData as any);
				setError(null);
			} catch (err: any) {
				console.error('Error fetching diagnoses:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchDiagnoses();
	}, []);

	// Function to process and transform API data into the required format
	const processApiData = (apiData: any) => {
		// Create a map to group diagnoses by condition
		const diagnosisGroups: { [key: string]: any } = {};

		// Iterate through each condition key in the response
		Object.keys(apiData).forEach((conditionKey) => {
			const diagnoses = apiData[conditionKey];

			if (Array.isArray(diagnoses) && diagnoses.length > 0) {
				// Use the condition key as the disease name, or 'Unknown Condition' if it's "null"
				const diseaseName =
					conditionKey === 'null'
						? 'Unknown Condition'
						: conditionKey;

				// Create progression entries from each diagnosis
				const progression = diagnoses.map((diagnosis) => ({
					date: diagnosis.timeStamp
						? new Date(diagnosis.timeStamp)
								.toISOString()
								.split('T')[0]
						: 'Unknown Date',
					update: diagnosis.notes || 'No details available',
					doctor: {
						name: `${diagnosis.doctorName}`,
					},
				}));

				// Sort progression by date (newest first)
				progression.sort(
					(a: any, b: any) =>
						new Date(b.date).getTime() - new Date(a.date).getTime()
				);

				// Add to diagnosisGroups
				if (!diagnosisGroups[diseaseName]) {
					diagnosisGroups[diseaseName] = {
						disease: diseaseName,
						progression: progression,
					};
				} else {
					// If the disease already exists, add these progression items
					diagnosisGroups[diseaseName].progression = [
						...diagnosisGroups[diseaseName].progression,
						...progression,
					].sort(
						(a: any, b: any) =>
							new Date(b.date).getTime() -
							new Date(a.date).getTime()
					);
				}
			}
		});

		// Convert the map to an array
		return Object.values(diagnosisGroups);
	};

	if (loading) {
		return (
			<ProtectedClientComponent>
				<div className="flex flex-1 bg-white dark:bg-black rounded-l-sm h-full items-center justify-center">
					<p>Loading diagnoses...</p>
				</div>
			</ProtectedClientComponent>
		);
	}

	if (error) {
		return (
			<ProtectedClientComponent>
				<div className="flex flex-1 bg-white dark:bg-black rounded-l-sm h-full items-center justify-center">
					<p className="text-red-500">
						Error loading diagnoses: {error}
					</p>
				</div>
			</ProtectedClientComponent>
		);
	}

	return (
		<ProtectedClientComponent>
			<div className="flex flex-1 flex-col bg-white dark:bg-black rounded-l-sm h-full overflow-y-auto p-4">
				<WordPullUp
					className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem] mb-6"
					words="Diagnosed Chronic Conditions"
				/>

				{diagnosedAilments.length === 0 ? (
					<div className="flex items-center justify-center h-40">
						<p>No diagnosed conditions found.</p>
					</div>
				) : (
					<Accordion variant="shadow">
						{diagnosedAilments.map((illness: any) => (
							<AccordionItem
								key={illness.disease}
								aria-label={`${illness.disease}`}
								title={`${illness.disease}`}
							>
								<DiagnosisTimeline illness={illness} />
							</AccordionItem>
						))}
					</Accordion>
				)}
			</div>
		</ProtectedClientComponent>
	);
};

export default Diagnosis;

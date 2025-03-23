import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_SERUM_ELECTROLYTES } from './queries';

// Result interface for chart data
interface ElectrolyteResult {
	electrolyte: string;
	electrolytes: number;
	fill: string;
}

// Interface for hook return value
interface ElectrolytesDataResult {
	loading: boolean;
	error: any;
	data: ElectrolyteResult[];
	date: string | null;
}

// Custom hook for fetching and formatting electrolyte data
export const useElectrolytesData = (): ElectrolytesDataResult => {
	const { loading, error, data } = useQuery(GET_SERUM_ELECTROLYTES);
	const [chartData, setChartData] = useState<ElectrolyteResult[]>([]);
	const [testDate, setTestDate] = useState<string | null>(null);

	useEffect(() => {
		if (!data) return;

		// Track the most recent timestamp across all electrolytes
		let latestTimestamp: Date | null = null;

		// Process the most recent observation for each electrolyte
		const processElectrolyte = (
			observations: any[],
			name: string,
			color: string
		) => {
			if (!observations || observations.length === 0) return null;

			// Sort by timestamp to get the most recent
			const sortedObservations = [...observations].sort((a, b) => {
				return (
					new Date(b.timestamp).getTime() -
					new Date(a.timestamp).getTime()
				);
			});

			// Use the most recent observation
			const latestObservation = sortedObservations[0];
			if (!latestObservation || latestObservation.value === 'N/A')
				return null;

			// Update the latest timestamp if this one is more recent
			const observationDate = new Date(latestObservation.timestamp);
			if (!latestTimestamp || observationDate > latestTimestamp) {
				latestTimestamp = observationDate;
			}

			const value =
				typeof latestObservation.value === 'string'
					? parseFloat(latestObservation.value)
					: latestObservation.value;

			if (isNaN(value)) return null;

			return {
				electrolyte: name,
				electrolytes: value,
				fill: color,
			};
		};

		// Process each electrolyte
		const sodium = processElectrolyte(
			data.sodium?.Observations || [],
			'sodium',
			'var(--color-sodium)'
		);

		const chloride = processElectrolyte(
			data.chloride?.Observations || [],
			'chloride',
			'var(--color-chloride)'
		);

		const potassium = processElectrolyte(
			data.potassium?.Observations || [],
			'potassium',
			'var(--color-potassium)'
		);

		// Combine results into an array, filtering out null values
		const results = [sodium, chloride, potassium].filter(
			(item): item is ElectrolyteResult => item !== null
		);

		// Format the date for display (YYYY-MM-DD)
		let formattedDate: string | null = null;
		if (latestTimestamp) {
			formattedDate = (latestTimestamp as Date)
				.toISOString()
				.split('T')[0];
		}

		setChartData(results);
		setTestDate(formattedDate);
	}, [data]);

	return { loading, error, data: chartData, date: testDate };
};

// Static data for testing purposes
export const getStaticElectrolytesData = () => {
	return {
		data: [
			{
				electrolyte: 'sodium',
				electrolytes: 140,
				fill: 'var(--color-sodium)',
			},
			{
				electrolyte: 'chloride',
				electrolytes: 102,
				fill: 'var(--color-chloride)',
			},
			{
				electrolyte: 'potassium',
				electrolytes: 4.2,
				fill: 'var(--color-potassium)',
			},
		],
		date: '2024-07-08',
	};
};

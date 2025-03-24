/* eslint-disable */
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_BLOOD_PRESSURE } from './queries';

// Result interface for chart data
interface BPResult {
	month: string;
	systolic: number;
	diastolic: number;
}

// Custom hook for fetching and formatting blood pressure data
export const useBloodPressureData = () => {
	const { loading, error, data } = useQuery(GET_BLOOD_PRESSURE);
	const [chartData, setChartData] = useState<BPResult[]>([]);

	useEffect(() => {
		if (!data) return;

		// Map to store data by month
		const monthMap: Record<string, any> = {};

		// Helper to process each type of observation
		const processData = (observations: any[] | undefined, key: string) => {
			if (!observations || observations.length === 0) return;

			observations.forEach((obs) => {
				if (obs.value === 'N/A') return;

				const date = new Date(obs.timestamp);
				const monthKey = date.toLocaleString('default', {
					month: 'long',
				});

				if (!monthMap[monthKey]) {
					monthMap[monthKey] = { month: monthKey };
				}

				const value =
					typeof obs.value === 'string'
						? parseFloat(obs.value)
						: obs.value;

				if (!isNaN(value)) {
					monthMap[monthKey][key] = value;
				}
			});
		};

		// Process systolic and diastolic readings
		processData(data.systolic?.Observations, 'systolic');
		processData(data.diastolic?.Observations, 'diastolic');

		// Convert to array
		const formattedData = Object.values(monthMap).map((item: any) => ({
			month: item.month,
			systolic: item.systolic || 0,
			diastolic: item.diastolic || 0,
		}));

		// Sort by month
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		formattedData.sort(
			(a, b) => months.indexOf(a.month) - months.indexOf(b.month)
		);

		setChartData(formattedData);
	}, [data]);

	return { loading, error, data: chartData };
};

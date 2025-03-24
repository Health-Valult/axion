import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_HBA1C_OBSERVATIONS } from './queries';

// Result interface for chart data
interface HbA1cResult {
	month: string;
	hba1c: number;
}

// Custom hook for fetching and formatting HbA1c data
export const useHbA1cData = () => {
	const { loading, error, data } = useQuery(GET_HBA1C_OBSERVATIONS);
	const [chartData, setChartData] = useState<HbA1cResult[]>([]);

	useEffect(() => {
		if (!data || !data.observationGraph) return;

		// Map to store data by month
		const monthMap: Record<string, any> = {};

		// Process HbA1c observations
		const observations = data.observationGraph.Observations;

		if (observations && observations.length > 0) {
			observations.forEach((obs: any) => {
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
					monthMap[monthKey].hba1c = value;
				}
			});
		}

		// Convert to array
		const formattedData = Object.values(monthMap).map((item: any) => ({
			month: item.month,
			hba1c: item.hba1c || 0,
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
			(a: any, b: any) =>
				months.indexOf(a.month) - months.indexOf(b.month)
		);

		setChartData(formattedData);
	}, [data]);

	return { loading, error, data: chartData };
};

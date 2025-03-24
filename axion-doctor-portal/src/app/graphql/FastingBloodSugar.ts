import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_FBG_OBSERVATIONS } from './queries';

// Result interface for chart data
interface FBGResult {
	month: string;
	FBG: number;
}

// Custom hook for fetching and formatting FBG data
export const useFBGData = () => {
	const { loading, error, data } = useQuery(GET_FBG_OBSERVATIONS);
	const [chartData, setChartData] = useState<FBGResult[]>([]);

	useEffect(() => {
		if (!data || !data.observationGraph) return;

		// Map to store data by month
		const monthMap: Record<string, any> = {};

		// Process FBG observations
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
					monthMap[monthKey].FBG = value;
				}
			});
		}

		// Convert to array
		const formattedData = Object.values(monthMap).map((item: any) => ({
			month: item.month,
			FBG: item.FBG || 0,
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

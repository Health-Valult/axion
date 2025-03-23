import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_CRP_OBSERVATIONS } from './queries';

// Result interface for chart data
interface CRPResult {
	month: string;
	CRP: number;
}

// Custom hook for fetching and formatting CRP data
export const useCRPData = () => {
	const { loading, error, data } = useQuery(GET_CRP_OBSERVATIONS);
	const [chartData, setChartData] = useState<CRPResult[]>([]);

	useEffect(() => {
		if (!data || !data.observationGraph) return;

		// Map to store data by month
		const monthMap: Record<string, any> = {};

		// Process CRP observations
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
					monthMap[monthKey].CRP = value;
				}
			});
		}

		// Convert to array
		const formattedData = Object.values(monthMap).map((item: any) => ({
			month: item.month,
			CRP: item.CRP || 0,
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

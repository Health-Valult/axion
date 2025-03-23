import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ESR } from './queries';

// Result interface for chart data
interface ESRResult {
	date: string;
	wintrobe: number;
	westergren: number;
}

// Custom hook for fetching and formatting ESR data
export const useESRData = () => {
	const { loading, error, data } = useQuery(GET_ESR);
	const [chartData, setChartData] = useState<ESRResult[]>([]);

	useEffect(() => {
		if (!data) return;

		// Map to store data by date
		const dateMap: Record<string, any> = {};

		// Helper to process each type of observation
		const processData = (observations: any[] | undefined, key: string) => {
			if (!observations || observations.length === 0) return;

			observations.forEach((obs) => {
				if (obs.value === 'N/A') return;

				const timestamp = obs.timestamp;
				const date = new Date(timestamp);
				const dateKey = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

				if (!dateMap[dateKey]) {
					dateMap[dateKey] = { date: dateKey };
				}

				const value =
					typeof obs.value === 'string'
						? parseFloat(obs.value)
						: obs.value;

				if (!isNaN(value)) {
					dateMap[dateKey][key] = value;
				}
			});
		};

		// Process Westergren and Wintrobe readings
		processData(data.westergren?.Observations, 'westergren');
		processData(data.wintrobe?.Observations, 'wintrobe');

		// Convert to array
		const formattedData = Object.values(dateMap).map((item: any) => ({
			date: item.date,
			westergren: item.westergren || 0,
			wintrobe: item.wintrobe || 0,
		}));

		// Sort by date chronologically
		formattedData.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});

		setChartData(formattedData);
	}, [data]);

	return { loading, error, data: chartData };
};

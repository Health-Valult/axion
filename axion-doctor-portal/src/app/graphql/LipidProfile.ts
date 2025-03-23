import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_LIPID_PROFILE } from './queries'; // Import your GraphQL query

// Result interface for chart data
interface LipidProfileResult {
	month: string;
	totalCholesterol: number;
	triglycerides: number;
	HDL: number;
	LDL: number;
	VLDL: number;
	LDL_HDL: number;
	TC_HDL: number;
	TG_HDL: number;
	nonHDL: number;
}

// Custom hook for fetching and formatting lipid profile data
export const useLipidProfileData = () => {
	const { loading, error, data } = useQuery(GET_LIPID_PROFILE);
	const [chartData, setChartData] = useState<LipidProfileResult[]>([]);

	useEffect(() => {
		if (!data) return;

		// Map to store data by month
		const monthMap: Record<string, any> = {};

		// Helper to process each type of observation
		const processData = (observations: any[], key: string) => {
			if (!observations) return;

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

		// Process each lipid component
		processData(data.totalCholesterol?.Observations, 'totalCholesterol');
		processData(data.ldl?.Observations, 'LDL');
		processData(data.hdl?.Observations, 'HDL');
		processData(data.triglycerides?.Observations, 'triglycerides');
		processData(data.nonHdl?.Observations, 'nonHDL');
		processData(data.vldl?.Observations, 'VLDL');

		// Convert to array and calculate derived values
		const formattedData = Object.values(monthMap).map((item) => {
			const tc = item.totalCholesterol || 0;
			const tg = item.triglycerides || 0;
			const hdl = item.HDL || 0;
			const ldl = item.LDL || 0;
			const vldl = item.VLDL || 0;
			const nonHdl = item.nonHDL || 0;

			return {
				month: item.month,
				totalCholesterol: tc,
				triglycerides: tg,
				HDL: hdl,
				LDL: ldl,
				VLDL: vldl,
				nonHDL: nonHdl,
				LDL_HDL: hdl > 0 ? ldl / hdl : 0,
				TC_HDL: hdl > 0 ? tc / hdl : 0,
				TG_HDL: hdl > 0 ? tg / hdl : 0,
			};
		});

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

import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_LIVER_FUNCTION_PROFILE } from './queries';

// Result interface for liver function test data
export interface LiverFunctionResult {
	parameter: string;
	result: string;
	normalRange: string;
}

// Interface for the data structure expected by LiverFunctionTest
export interface LiverFunctionData {
	date: string;
	testResults: LiverFunctionResult[];
}

// Custom hook for fetching and formatting liver function test data
export const useLiverFunctionData = () => {
	const { loading, error, data } = useQuery(GET_LIVER_FUNCTION_PROFILE);
	const [chartData, setChartData] = useState<LiverFunctionData>({
		date: new Date().toISOString().split('T')[0],
		testResults: [],
	});

	useEffect(() => {
		if (!data) return;

		// Standard reference ranges for liver function parameters
		const referenceRanges: Record<string, string> = {
			'Total Protein': '6.4 - 8.3 g/dL',
			Albumin: '3.5 - 5.0 g/dL',
			Globulin: '2.3 - 3.5 g/dL',
			'A/G Ratio': '1.0 - 2.0',
			Bilirubin: '0.3 - 1.2 mg/dL',
			'Alkaline Phosphatase': '40 - 150 U/L',
			'ALT (SGPT)': '0 - 40 U/L',
			'AST (SGOT)': '0 - 35 U/L',
		};

		// Helper to process each type of observation
		const processObservations = (
			observations: any[] | undefined,
			displayName: string,
			unit: string = ''
		): LiverFunctionResult | null => {
			if (!observations || observations.length === 0) return null;

			// Take the most recent observation
			const latestObs = observations.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() -
					new Date(a.timestamp).getTime()
			)[0];

			if (!latestObs || !latestObs.value) return null;

			// Format the result with the appropriate unit
			const result = unit
				? `${latestObs.value} ${unit}`
				: latestObs.value.toString();

			return {
				parameter: displayName,
				result: result,
				normalRange: referenceRanges[displayName] || 'Not specified',
			};
		};

		const resultsArray: LiverFunctionResult[] = [];
		let mostRecentDate: Date | null = null;

		// Process each liver function component and track the most recent date
		const processComponentAndUpdateDate = (
			observations: any[] | undefined,
			displayName: string,
			unit: string = ''
		) => {
			if (!observations || observations.length === 0) return;

			// Find the most recent observation
			const latestObs = observations.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() -
					new Date(a.timestamp).getTime()
			)[0];

			if (!latestObs) return;

			// Update the most recent date if this observation is newer
			const obsDate = new Date(latestObs.timestamp);
			if (!mostRecentDate || obsDate > mostRecentDate) {
				mostRecentDate = obsDate;
			}

			const result = processObservations(observations, displayName, unit);
			if (result) resultsArray.push(result);
		};

		// Process all components
		processComponentAndUpdateDate(
			data.totalProtein?.Observations,
			'Total Protein',
			'g/dL'
		);
		processComponentAndUpdateDate(
			data.albumin?.Observations,
			'Albumin',
			'g/dL'
		);
		processComponentAndUpdateDate(
			data.globulin?.Observations,
			'Globulin',
			'g/dL'
		);
		processComponentAndUpdateDate(data.agRatio?.Observations, 'A/G Ratio');
		processComponentAndUpdateDate(
			data.bilirubin?.Observations,
			'Bilirubin',
			'mg/dL'
		);
		processComponentAndUpdateDate(
			data.alkalinePhosphatase?.Observations,
			'Alkaline Phosphatase',
			'U/L'
		);
		processComponentAndUpdateDate(
			data.alt?.Observations,
			'ALT (SGPT)',
			'U/L'
		);
		processComponentAndUpdateDate(
			data.ast?.Observations,
			'AST (SGOT)',
			'U/L'
		);

		// Preserve the standard order of liver function parameters
		const standardOrder = [
			'Total Protein',
			'Albumin',
			'Globulin',
			'A/G Ratio',
			'Bilirubin',
			'Alkaline Phosphatase',
			'ALT (SGPT)',
			'AST (SGOT)',
		];

		resultsArray.sort(
			(a, b) =>
				standardOrder.indexOf(a.parameter) -
				standardOrder.indexOf(b.parameter)
		);

		// Format the date to YYYY-MM-DD format
		const formattedDate = mostRecentDate
			? (mostRecentDate as Date).toISOString().split('T')[0]
			: new Date().toISOString().split('T')[0];

		// Set the chart data in the format expected by LiverFunctionTest
		setChartData({
			date: formattedDate,
			testResults: resultsArray,
		});
	}, [data]);

	return { loading, error, data: chartData };
};

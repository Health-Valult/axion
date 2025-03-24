import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_URINALYSIS_PROFILE } from './queries';

// Result interface for urinalysis data
export interface UrinalysisResult {
	parameter: string;
	result: string;
	normal: string;
}

// Interface for the data structure expected by KidneyChart
export interface KidneyChartData {
	date: string;
	testResults: UrinalysisResult[];
}

// Custom hook for fetching and formatting urinalysis data for KidneyChart
export const useUrinalysisData = () => {
	const { loading, error, data } = useQuery(GET_URINALYSIS_PROFILE);
	const [chartData, setChartData] = useState<KidneyChartData>({
		date: new Date().toISOString().split('T')[0],
		testResults: [],
	});

	useEffect(() => {
		if (!data) return;

		// Standard reference ranges for urinalysis parameters
		const referenceRanges: Record<string, string> = {
			Colour: 'Pale Yellow',
			Transparency: 'Clear',
			'Specific Gravity': '1.005-1.030',
			pH: '5-7',
			'Protein / Albumin': 'Absent',
			'Sugar / Glucose': 'Absent',
			'Ketone Bodies': 'Absent',
			Bilirubin: 'Absent',
			'R.B.C.': 'Absent',
			'Pus Cells': 'Absent',
			'Epithelial Cells': 'Absent',
			Casts: 'Absent',
			Crystals: 'Absent',
			Bacteria: 'Absent',
		};

		// Helper to process each type of observation
		const processObservations = (
			observations: any[] | undefined,
			displayName: string
		): UrinalysisResult | null => {
			if (!observations || observations.length === 0) return null;

			// Take the most recent observation
			const latestObs = observations.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() -
					new Date(a.timestamp).getTime()
			)[0];

			if (!latestObs || !latestObs.value) return null;

			return {
				parameter: displayName,
				result: latestObs.value.toString(),
				normal: referenceRanges[displayName] || 'Not specified',
			};
		};

		const resultsArray: UrinalysisResult[] = [];
		let mostRecentDate: Date | null = null;

		// Process each urinalysis component and track the most recent date
		const processComponentAndUpdateDate = (
			observations: any[] | undefined,
			displayName: string
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

			const result = processObservations(observations, displayName);
			if (result) resultsArray.push(result);
		};

		// Process all components
		processComponentAndUpdateDate(data.color?.Observations, 'Colour');
		processComponentAndUpdateDate(
			data.transparency?.Observations,
			'Transparency'
		);
		processComponentAndUpdateDate(
			data.specificGravity?.Observations,
			'Specific Gravity'
		);
		processComponentAndUpdateDate(data.pH?.Observations, 'pH');
		processComponentAndUpdateDate(
			data.protein?.Observations,
			'Protein / Albumin'
		);
		processComponentAndUpdateDate(
			data.glucose?.Observations,
			'Sugar / Glucose'
		);
		processComponentAndUpdateDate(
			data.ketones?.Observations,
			'Ketone Bodies'
		);
		processComponentAndUpdateDate(
			data.bilirubin?.Observations,
			'Bilirubin'
		);
		processComponentAndUpdateDate(data.rbc?.Observations, 'R.B.C.');
		processComponentAndUpdateDate(data.wbc?.Observations, 'Pus Cells');
		processComponentAndUpdateDate(
			data.epithelialCells?.Observations,
			'Epithelial Cells'
		);
		processComponentAndUpdateDate(data.casts?.Observations, 'Casts');
		processComponentAndUpdateDate(data.crystals?.Observations, 'Crystals');
		processComponentAndUpdateDate(data.bacteria?.Observations, 'Bacteria');

		// Preserve the standard order of urinalysis parameters
		const standardOrder = [
			'Colour',
			'Transparency',
			'Specific Gravity',
			'pH',
			'Protein / Albumin',
			'Sugar / Glucose',
			'Ketone Bodies',
			'Bilirubin',
			'R.B.C.',
			'Pus Cells',
			'Epithelial Cells',
			'Casts',
			'Crystals',
			'Bacteria',
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

		// Set the chart data in the format expected by KidneyChart
		setChartData({
			date: formattedDate,
			testResults: resultsArray,
		});
	}, [data]);

	return { loading, error, data: chartData };
};

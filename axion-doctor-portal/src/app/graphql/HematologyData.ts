/* eslint-disable */
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import {
	GET_HEMOGLOBIN_OBSERVATIONS,
	GET_TLC_OBSERVATIONS,
	GET_NEUTROPHILS_OBSERVATIONS,
	GET_LYMPHOCYTES_OBSERVATIONS,
	GET_MONOCYTES_OBSERVATIONS,
	GET_EOSINOPHILS_OBSERVATIONS,
	GET_BASOPHILS_OBSERVATIONS,
	GET_PLATELET_OBSERVATIONS,
	GET_RBC_OBSERVATIONS,
	GET_HCT_OBSERVATIONS,
	GET_MCV_OBSERVATIONS,
	GET_MCH_OBSERVATIONS,
	GET_MCHC_OBSERVATIONS,
} from './queries';

// Define the result interface for a single parameter result
interface ParameterResult {
	month: string;
	value: number;
}

// Define the interface for a hematology parameter
interface HematologyParameter {
	name: string;
	results: ParameterResult[];
}

// Custom hook for fetching and formatting hematology data
export const useHematologyData = () => {
	const [parameters, setParameters] = useState<HematologyParameter[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// Query all hematology parameters
	const hemoglobin = useQuery(GET_HEMOGLOBIN_OBSERVATIONS);
	const tlc = useQuery(GET_TLC_OBSERVATIONS);
	const neutrophils = useQuery(GET_NEUTROPHILS_OBSERVATIONS);
	const lymphocytes = useQuery(GET_LYMPHOCYTES_OBSERVATIONS);
	const monocytes = useQuery(GET_MONOCYTES_OBSERVATIONS);
	const eosinophils = useQuery(GET_EOSINOPHILS_OBSERVATIONS);
	const basophils = useQuery(GET_BASOPHILS_OBSERVATIONS);
	const platelets = useQuery(GET_PLATELET_OBSERVATIONS);
	const rbc = useQuery(GET_RBC_OBSERVATIONS);
	const hct = useQuery(GET_HCT_OBSERVATIONS);
	const mcv = useQuery(GET_MCV_OBSERVATIONS);
	const mch = useQuery(GET_MCH_OBSERVATIONS);
	const mchc = useQuery(GET_MCHC_OBSERVATIONS);

	// Array of all queries to track loading and error state
	const queries = [
		{ query: hemoglobin, name: 'Haemoglobin' },
		{ query: tlc, name: 'Total Leukocyte Count' },
		{ query: neutrophils, name: 'Neutrophils' },
		{ query: lymphocytes, name: 'Lymphocytes' },
		{ query: monocytes, name: 'Monocytes' },
		{ query: eosinophils, name: 'Eosinophils' },
		{ query: basophils, name: 'Basophils' },
		{ query: platelets, name: 'Platelet Count' },
		{ query: rbc, name: 'Total RBC Count' },
		{ query: hct, name: 'Haematocrit Value, HCT' },
		{ query: mcv, name: 'Mean Corpuscular Volume, MCV' },
		{ query: mch, name: 'Mean Cell Haemoglobin, MCH' },
		{ query: mchc, name: 'Mean Cell Haemoglobin Concentration, MCHC' },
	];

	useEffect(() => {
		// Check if all queries have completed (either successfully or with errors)
		const allQueriesCompleted = queries.every((q) => !q.query.loading);

		if (allQueriesCompleted) {
			// Check for errors
			const errors = queries.filter((q) => q.query.error);
			if (errors.length > 0) {
				setError(
					new Error(
						`Error fetching hematology data: ${errors[0].query.error?.message}`
					)
				);
			}

			// Process data if no errors
			processData();
			setLoading(false);
		}
	}, [
		queries.map((q) => q.query.loading).join(','),
		queries.map((q) => q.query.error).join(','),
	]);

	// Function to process the data from all queries
	const processData = () => {
		const processedParameters: HematologyParameter[] = [];

		// Helper to process each type of observation
		const processObservations = (
			queryResult: any,
			parameterName: string
		) => {
			if (
				!queryResult ||
				!queryResult.data ||
				!queryResult.data.observationGraph
			) {
				return {
					name: parameterName,
					results: [],
				};
			}

			const observations =
				queryResult.data.observationGraph.Observations || [];
			const monthMap: Record<string, ParameterResult> = {};

			observations.forEach((obs: any) => {
				if (obs.value === 'N/A') return;

				const date = new Date(obs.timestamp);
				const monthKey = date.toLocaleString('default', {
					month: 'long',
				});

				const value =
					typeof obs.value === 'string'
						? parseFloat(obs.value)
						: obs.value;

				if (!isNaN(value)) {
					monthMap[monthKey] = {
						month: monthKey,
						value: value,
					};
				}
			});

			// Convert to array
			const results = Object.values(monthMap);

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

			results.sort(
				(a, b) => months.indexOf(a.month) - months.indexOf(b.month)
			);

			return {
				name: parameterName,
				results,
			};
		};

		// Process each parameter and add to the array
		for (const { query, name } of queries) {
			const parameter = processObservations(query, name);
			processedParameters.push(parameter);
		}

		setParameters(processedParameters);
	};

	return { loading, error, parameters };
};

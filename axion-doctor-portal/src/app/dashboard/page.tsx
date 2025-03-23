/* eslint-disable */
'use client';

import dynamic from 'next/dynamic';
import FastingBloodGlucoseChart from '../charts/FastingBloodGlucose';
import LiverFunctionTest from '../charts/LiverFunctionChart';
import CRPChart from '../charts/CRPChart';
import SerumElectrolytesChart from '../charts/SerumElectrolytes';
import ESRChart from '../charts/ESRChart';
import GlycatedHemoglobinChart from '../charts/GlycatedHemoglobinChart';
import { useLipidProfileData } from '../graphql/LipidProfile';
import { useHbA1cData } from '../graphql/GlycatedHemoglobin';
import { useHematologyData } from '../graphql/HematologyData';
import { useFBGData } from '../graphql/FastingBloodSugar';
import { useElectrolytesData } from '../graphql/Electrolytes';
import { useCRPData } from '../graphql/CReactiveProtein';
import { useUrinalysisData } from '../graphql/UrineAnalysis';

const HematologyTrendsChart = dynamic(
	() => import('../charts/HematologyTrendChart'),
	{
		ssr: false,
	}
);
const BloodPressureChart = dynamic(
	() => import('../charts/BloodPressureChart'),
	{ ssr: false }
);
const LipidProfileChart = dynamic(() => import('../charts/LipidProfileChart'), {
	ssr: false,
});
const Summary = dynamic(() => import('../elements/Summary'), { ssr: false });

const KidneyChart = dynamic(() => import('../charts/KidneyChart'), {
	ssr: false,
});

// interface ESRValue {
// 	wintrobe: number;
// 	westergren: number;
// }

// interface SimpleValue {
// 	number: number;
// }

// interface LipidValue {
// 	totalCholesterol: number;
// 	LDL: number;
// 	HDL: number;
// 	triglycerides: number;
// 	nonHDL: number;
// 	VLDL: number;
// }

// interface ESRObservation {
// 	date: string;
// 	value: ESRValue;
// }

// interface SimpleObservation {
// 	date: string;
// 	value: SimpleValue;
// }

// interface ElectrolyteObservation {
// 	date: string;
// 	subType: string;
// 	value: SimpleValue;
// }

// interface LipidObservation {
// 	date: string;
// 	value: LipidValue;
// }

// interface LipidProfileDataPoint {
// 	month: string;
// 	totalCholesterol: number;
// 	LDL: number;
// 	HDL: number;
// 	triglycerides: number;
// 	nonHDL: number;
// 	VLDL: number;
// 	LDL_HDL: number;
// 	TC_HDL: number;
// 	TG_HDL: number;
// }

// const Dashboard: React.FC = () => {
// 	const patientId = '12345';
// 	const {
// 		loading: esrLoading,
// 		error: esrError,
// 		data: esrQueryData,
// 	} = useQuery(GET_ESR_OBSERVATIONS, { variables: { patient: patientId } });

// Hemoglobin Query
// const {
// 	loading: hbLoading,
// 	error: hbError,
// 	data: hbData,
// } = useQuery(GET_HEMOGLOBIN_OBSERVATIONS, {
// });

// 	// TLC Query
// 	const {
// 		loading: tlcLoading,
// 		error: tlcError,
// 		data: tlcData,
// 	} = useQuery(GET_TLC_OBSERVATIONS, { variables: { patient: patientId } });

// 	// Neutrophils Query
// 	const {
// 		loading: neutrophilsLoading,
// 		error: neutrophilsError,
// 		data: neutrophilsData,
// 	} = useQuery(GET_NEUTROPHILS_OBSERVATIONS, {
// 		variables: { patient: patientId },
// 	});

// 	// Lymphocytes Query
// 	const {
// 		loading: lymphocytesLoading,
// 		error: lymphocytesError,
// 		data: lymphocytesData,
// 	} = useQuery(GET_LYMPHOCYTES_OBSERVATIONS, {
// 		variables: { patient: patientId },
// 	});

// 	// Monocytes Query
// 	const {
// 		loading: monocytesLoading,
// 		error: monocytesError,
// 		data: monocytesData,
// 	} = useQuery(GET_MONOCYTES_OBSERVATIONS, {
// 		variables: { patient: patientId },
// 	});

// 	// Eosinophils Query
// 	const {
// 		loading: eosinophilsLoading,
// 		error: eosinophilsError,
// 		data: eosinophilsData,
// 	} = useQuery(GET_EOSINOPHILS_OBSERVATIONS, {
// 		variables: { patient: patientId },
// 	});

// 	// Basophils Query
// 	const {
// 		loading: basophilsLoading,
// 		error: basophilsError,
// 		data: basophilsData,
// 	} = useQuery(GET_BASOPHILS_OBSERVATIONS, {
// 		variables: { patient: patientId },
// 	});

// 	// Platelet Query
// 	const {
// 		loading: plateletLoading,
// 		error: plateletError,
// 		data: plateletData,
// 	} = useQuery(GET_PLATELET_OBSERVATIONS, {
// 		variables: { patient: patientId },
// 	});

// 	// RBC Query
// 	const {
// 		loading: rbcLoading,
// 		error: rbcError,
// 		data: rbcData,
// 	} = useQuery(GET_RBC_OBSERVATIONS, { variables: { patient: patientId } });

// 	// HbA1c Query
// 	const {
// 		loading: hba1cLoading,
// 		error: hba1cError,
// 		data: hba1cData,
// 	} = useQuery(GET_HBA1C_OBSERVATIONS, { variables: { patient: patientId } });

// 	// Serum Electrolytes Query
// 	const {
// 		loading: serumLoading,
// 		error: serumError,
// 		data: serumData,
// 	} = useQuery(GET_SERUM_ELECTROLYTES, { variables: { patient: patientId } });

// 	// Lipid Profile Query
// 	const {
// 		loading: lipidLoading,
// 		error: lipidError,
// 		data: lipidData,
// 	} = useQuery(GET_LIPID_PROFILE, { variables: { patient: patientId } });

// 	// Check if any queries are still loading
// 	const isLoading =
// 		esrLoading ||
// 		hbLoading ||
// 		tlcLoading ||
// 		neutrophilsLoading ||
// 		lymphocytesLoading ||
// 		monocytesLoading ||
// 		eosinophilsLoading ||
// 		basophilsLoading ||
// 		plateletLoading ||
// 		rbcLoading ||
// 		hba1cLoading ||
// 		serumLoading ||
// 		lipidLoading;

// 	// Check for errors
// 	const hasError =
// 		esrError ||
// 		hbError ||
// 		tlcError ||
// 		neutrophilsError ||
// 		lymphocytesError ||
// 		monocytesError ||
// 		eosinophilsError ||
// 		basophilsError ||
// 		plateletError ||
// 		rbcError ||
// 		hba1cError ||
// 		serumError ||
// 		lipidError;

// 	// If loading, show loading indicator
// 	if (isLoading) return <p>Loading...</p>;

// 	// If there's an error, show error message
// 	if (hasError) return <p>Error loading data</p>;

// 	// Transform the data for your charts
// 	const transformData = () => {
// 		// Transform ESR data - fixed variable name clash
// 		const esrTransformedData =
// 			esrQueryData?.observationStack?.observations.map(
// 				(obs: ESRObservation) => ({
// 					date: obs.date,
// 					wintrobe: obs.value.wintrobe,
// 					westergren: obs.value.westergren,
// 				})
// 			) || [];

// 		const hematologyData = [
// 			{
// 				name: 'Haemoglobin',
// 				results:
// 					hbData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Total Leukocyte Count',
// 				results:
// 					tlcData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Neutrophils',
// 				results:
// 					neutrophilsData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Lymphocytes',
// 				results:
// 					lymphocytesData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Monocytes',
// 				results:
// 					monocytesData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Eosinophils',
// 				results:
// 					eosinophilsData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Basophils',
// 				results:
// 					basophilsData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Platelet Count',
// 				results:
// 					plateletData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 			{
// 				name: 'Total RBC Count',
// 				results:
// 					rbcData?.observationStack?.observations.map(
// 						(obs: SimpleObservation) => ({
// 							month: obs.date,
// 							value: obs.value.number,
// 						})
// 					) || [],
// 			},
// 		];

// 		// Transform HbA1c data - fixed to use hba1cData instead of hbData
// 		const hba1cTransformedData =
// 			hba1cData?.observationStack?.observations.map(
// 				(obs: SimpleObservation) => ({
// 					month: obs.date,
// 					hba1c: obs.value.number,
// 				})
// 			) || [];

// 		// Transform serum electrolytes data - fixed type for subType
// 		const serumElectrolytesData =
// 			serumData?.observationStack?.observations.map(
// 				(obs: ElectrolyteObservation) => ({
// 					electrolyte: obs.subType,
// 					electrolytes: obs.value.number,
// 					fill: `var(--color-${obs.subType.toLowerCase()})`,
// 				})
// 			) || [];

// 		// Transform lipid profile data - fixed type issues
// 		const lipidProfileData =
// 			lipidData?.observationStack?.observations.map(
// 				(obs: LipidObservation): LipidProfileDataPoint => {
// 					const result: LipidProfileDataPoint = {
// 						month: obs.date,
// 						totalCholesterol: obs.value.totalCholesterol,
// 						LDL: obs.value.LDL,
// 						HDL: obs.value.HDL,
// 						triglycerides: obs.value.triglycerides,
// 						nonHDL: obs.value.nonHDL,
// 						VLDL: obs.value.VLDL,
// 						LDL_HDL: 0,
// 						TC_HDL: 0,
// 						TG_HDL: 0,
// 					};

// 					// Calculate ratios
// 					result.LDL_HDL = result.LDL / result.HDL;
// 					result.TC_HDL = result.totalCholesterol / result.HDL;
// 					result.TG_HDL = result.triglycerides / result.HDL;

// 					return result;
// 				}
// 			) || [];

// 		return {
// 			esrData: esrTransformedData,
// 			hematologyData,
// 			hba1cData: hba1cTransformedData,
// 			serumElectrolytesData,
// 			lipidProfileData,
// 		};
// 	};

// const chartData = transformData();

const Dashboard: React.FC = () => {
	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 h-full w-full overflow-y-auto gap-3 mt-2 mb-5">
			<div className="col-span-1 grid sm:grid-cols-1 md:grid-cols-2 gap-3">
				<div className="col-span-1 flex flex-col gap-3">
					{/* {patient && (
						<Summary
							name={patient.firstName + patient.lastName}
							age={age}
							gender={patient.gender}
							patientData={patient.summary}
						/>
					)} */}
					<ESRChart
						chartData={[
							{ date: '2024-07-08', wintrobe: 6, westergren: 10 },
							{ date: '2024-08-16', wintrobe: 8, westergren: 12 },
							{ date: '2024-10-17', wintrobe: 5, westergren: 9 },
							{
								date: '2024-10-28',
								wintrobe: 12,
								westergren: 18,
							},
							{
								date: '2025-01-19',
								wintrobe: 10,
								westergren: 15,
							},
							{ date: '2024-02-02', wintrobe: 7, westergren: 11 },
						]}
					/>
				</div>

				<div className="col-span-1 flex flex-col gap-3">
					{/* <HematologyTrendsChart
						parameters={[
							{
								name: 'Haemoglobin',
								results: [
									{ month: 'January', value: 15.5 },
									{ month: 'February', value: 14.8 },
									{ month: 'March', value: 16.2 },
									{ month: 'April', value: 15.0 },
									{ month: 'May', value: 15.7 },
									{ month: 'June', value: 16.0 },
								],
							},
							{
								name: 'Total Leukocyte Count',
								results: [
									{ month: 'January', value: 7000 },
									{ month: 'February', value: 6800 },
									{ month: 'March', value: 7500 },
									{ month: 'April', value: 7100 },
									{ month: 'May', value: 7300 },
									{ month: 'June', value: 6900 },
								],
							},
							{
								name: 'Neutrophils',
								results: [
									{ month: 'January', value: 60 },
									{ month: 'February', value: 62 },
									{ month: 'March', value: 65 },
									{ month: 'April', value: 58 },
									{ month: 'May', value: 61 },
									{ month: 'June', value: 59 },
								],
							},
							{
								name: 'Lymphocytes',
								results: [
									{ month: 'January', value: 30 },
									{ month: 'February', value: 28 },
									{ month: 'March', value: 32 },
									{ month: 'April', value: 33 },
									{ month: 'May', value: 31 },
									{ month: 'June', value: 34 },
								],
							},
							{
								name: 'Monocytes',
								results: [
									{ month: 'January', value: 7 },
									{ month: 'February', value: 6 },
									{ month: 'March', value: 8 },
									{ month: 'April', value: 5 },
									{ month: 'May', value: 6 },
									{ month: 'June', value: 7 },
								],
							},
							{
								name: 'Eosinophils',
								results: [
									{ month: 'January', value: 3 },
									{ month: 'February', value: 4 },
									{ month: 'March', value: 2 },
									{ month: 'April', value: 3 },
									{ month: 'May', value: 2 },
									{ month: 'June', value: 4 },
								],
							},
							{
								name: 'Basophils',
								results: [
									{ month: 'January', value: 1 },
									{ month: 'February', value: 0 },
									{ month: 'March', value: 1 },
									{ month: 'April', value: 1 },
									{ month: 'May', value: 0 },
									{ month: 'June', value: 1 },
								],
							},
							{
								name: 'Platelet Count',
								results: [
									{ month: 'January', value: 2.5 },
									{ month: 'February', value: 3.0 },
									{ month: 'March', value: 3.3 },
									{ month: 'April', value: 2.8 },
									{ month: 'May', value: 3.1 },
									{ month: 'June', value: 2.7 },
								],
							},
							{
								name: 'Total RBC Count',
								results: [
									{ month: 'January', value: 5.1 },
									{ month: 'February', value: 4.8 },
									{ month: 'March', value: 5.2 },
									{ month: 'April', value: 5.0 },
									{ month: 'May', value: 5.3 },
									{ month: 'June', value: 5.0 },
								],
							},
							{
								name: 'Haematocrit Value, HCT',
								results: [
									{ month: 'January', value: 45 },
									{ month: 'February', value: 44 },
									{ month: 'March', value: 46 },
									{ month: 'April', value: 47 },
									{ month: 'May', value: 45 },
									{ month: 'June', value: 46 },
								],
							},
							{
								name: 'Mean Corpuscular Volume, MCV',
								results: [
									{ month: 'January', value: 90 },
									{ month: 'February', value: 91 },
									{ month: 'March', value: 89 },
									{ month: 'April', value: 90 },
									{ month: 'May', value: 92 },
									{ month: 'June', value: 91 },
								],
							},
							{
								name: 'Mean Cell Haemoglobin, MCH',
								results: [
									{ month: 'January', value: 29 },
									{ month: 'February', value: 30 },
									{ month: 'March', value: 31 },
									{ month: 'April', value: 30 },
									{ month: 'May', value: 32 },
									{ month: 'June', value: 31 },
								],
							},
							{
								name: 'Mean Cell Haemoglobin Concentration, MCHC',
								results: [
									{ month: 'January', value: 33 },
									{ month: 'February', value: 32 },
									{ month: 'March', value: 34 },
									{ month: 'April', value: 33 },
									{ month: 'May', value: 34 },
									{ month: 'June', value: 32 },
								],
							},
						]}
					/> */}
					<HematologyTrendsChart
						parameters={useHematologyData().parameters}
					/>
					{/* <GlycatedHemoglobinChart
						chartData={[
							{
								month: 'January',
								hba1c: 6.5,
							},
						]}
					/> */}
					<GlycatedHemoglobinChart chartData={useHbA1cData().data} />
					{/* <SerumElectrolytesChart
						date="2024-07-08"
						chartData={[
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
						]}
					/> */}
					<SerumElectrolytesChart
						date={useElectrolytesData().date ?? 'No Date'}
						chartData={useElectrolytesData().data}
					/>
					{/* <CRPChart chartData={
						[
							{ month: 'January', CRP: 15 },
							{ month: 'February', CRP: 12 },
							{ month: 'March', CRP: 18 },
							{ month: 'April', CRP: 70 },
							{ month: 'May', CRP: 19 },
							{ month: 'June', CRP: 16 },
						]
					} /> */}
					<CRPChart chartData={useCRPData().data} />
				</div>
			</div>
			<div className="col-span-1 grid gap-2">
				{/* <LipidProfileChart
					chartData={[
						{
							month: 'January',
							totalCholesterol: 200,
							LDL: 130,
							HDL: 50,
							triglycerides: 150,
							nonHDL: 150,
							VLDL: 30,
							LDL_HDL: 130 / 50,
							TC_HDL: 200 / 50,
							TG_HDL: 150 / 50,
						},
						{
							month: 'February',
							totalCholesterol: 190,
							LDL: 120,
							HDL: 55,
							triglycerides: 140,
							nonHDL: 135,
							VLDL: 28,
							LDL_HDL: 120 / 55,
							TC_HDL: 190 / 55,
							TG_HDL: 140 / 55,
						},
						{
							month: 'April',
							totalCholesterol: 195,
							LDL: 125,
							HDL: 57,
							triglycerides: 145,
							nonHDL: 138,
							VLDL: 29,
							LDL_HDL: 125 / 57,
							TC_HDL: 195 / 57,
							TG_HDL: 145 / 57,
						},
						{
							month: 'June',
							totalCholesterol: 198,
							LDL: 128,
							HDL: 56,
							triglycerides: 148,
							nonHDL: 142,
							VLDL: 30,
							LDL_HDL: 128 / 56,
							TC_HDL: 198 / 56,
							TG_HDL: 148 / 56,
						},
					]}
				/> */}
				<LipidProfileChart chartData={useLipidProfileData().data} />
				<div className="grid sm:grid-cols-1 md:grid-cols-2 h-full w-full overflow-y-auto gap-3">
					{/* <FastingBloodGlucoseChart
						chartData={[
							{ month: 'January', FBG: 95 },
							{ month: 'February', FBG: 110 },
							{ month: 'March', FBG: 130 },
							{ month: 'April', FBG: 85 },
							{ month: 'May', FBG: 145 },
							{ month: 'June', FBG: 105 },
						]}
					/> */}
					<FastingBloodGlucoseChart chartData={useFBGData().data} />
					<BloodPressureChart
						chartData={[
							{ month: 'January', systolic: 120, diastolic: 80 },
							{ month: 'February', systolic: 125, diastolic: 82 },
							{ month: 'March', systolic: 130, diastolic: 85 },
							{ month: 'April', systolic: 135, diastolic: 88 },
							{ month: 'May', systolic: 140, diastolic: 90 },
							{ month: 'June', systolic: 145, diastolic: 95 },
						]}
					/>
					{/* <KidneyChart
						date="2024-12-18"
						testResults={[
							{
								parameter: 'Colour',
								result: 'Pale Yellow',
								normal: 'Pale Yellow',
							},
							{
								parameter: 'Transparency',
								result: 'Clear',
								normal: 'Clear',
							},
							{
								parameter: 'Specific Gravity',
								result: '1.015',
								normal: '1.005-1.030',
							},
							{
								parameter: 'pH',
								result: '6',
								normal: '5-7',
							},
							{
								parameter: 'Protein / Albumin',
								result: 'Absent',
								normal: 'Absent',
							},
							{
								parameter: 'Sugar / Glucose',
								result: 'Absent',
								normal: 'Absent',
							},
							{
								parameter: 'Ketone Bodies',
								result: 'Absent',
								normal: 'Absent',
							},
							{
								parameter: 'Bilirubin',
								result: 'Absent',
								normal: 'Absent',
							},
							{
								parameter: 'R.B.C.',
								result: '2 / HPF',
								normal: 'Absent',
							},
							{
								parameter: 'Pus Cells',
								result: '3 / HPF',
								normal: 'Absent',
							},
							{
								parameter: 'Epithelial Cells',
								result: 'Few',
								normal: 'Absent',
							},
							{
								parameter: 'Casts',
								result: 'Absent',
								normal: 'Absent',
							},
							{
								parameter: 'Crystals',
								result: 'Absent',
								normal: 'Absent',
							},
							{
								parameter: 'Bacteria',
								result: 'Absent',
								normal: 'Absent',
							},
						]}
					/> */}
					<KidneyChart
						date={useUrinalysisData().data?.date ?? 'No Date'}
						testResults={useUrinalysisData().data?.testResults}
					/>
					<LiverFunctionTest
						date="2024-09-07"
						testResults={[
							{
								parameter: 'Total Protein',
								result: '7.5 g/dL',
								normalRange: '6.4 - 8.3 g/dL',
							},
							{
								parameter: 'Albumin',
								result: '4.0 g/dL',
								normalRange: '3.5 - 5.0 g/dL',
							},
							{
								parameter: 'Globulin',
								result: '3.5 g/dL',
								normalRange: '2.3 - 3.5 g/dL',
							},
							{
								parameter: 'A/G Ratio',
								result: '1.1',
								normalRange: '1.0 - 2.0',
							},
							{
								parameter: 'Bilirubin',
								result: '0.7 mg/dL',
								normalRange: '0.3 - 1.2 mg/dL',
							},
							{
								parameter: 'Alkaline Phosphatase',
								result: '60 U/L',
								normalRange: '40 - 150 U/L',
							},
							{
								parameter: 'ALT (SGPT)',
								result: '30 U/L',
								normalRange: '0 - 40 U/L',
							},
							{
								parameter: 'AST (SGOT)',
								result: '25 U/L',
								normalRange: '0 - 35 U/L',
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

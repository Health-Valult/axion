'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import FastingBloodGlucoseChart from '../elements/FastingBloodGlucose';
import LiverFunctionTest from '../elements/LiverFunctionChart';
import CRPChart from '../elements/CRPChart';
import SerumElectrolytesChart from '../elements/SerumElectrolytes';
import ESRChart from '../elements/ESRChart';
import GlycatedHemoglobinChart from '../elements/GlycatedHemoglobinChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const HematologyTrendsChart = dynamic(
	() => import('../elements/HematologyTrendChart'),
	{
		ssr: false,
	}
);
const BloodPressureChart = dynamic(
	() => import('../elements/BloodPressureChart'),
	{ ssr: false }
);
const LipidProfileChart = dynamic(
	() => import('../elements/LipidProfileChart'),
	{ ssr: false }
);
const Summary = dynamic(() => import('../elements/Summary'), { ssr: false });

const KidneyChart = dynamic(() => import('../elements/KidneyChart'), {
	ssr: false,
});

const GET_OBSERVATIONS = gql`
	query GetObservations($patient: String!) {
		observations(patient: $patient) {
			id
			date
			type
			value
			unit
		}
	}
`;

const Dashboard: React.FC = () => {
	const { loading, error, data } = useQuery(GET_OBSERVATIONS, {
		variables: { patient: '123' },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	// Transform data for different charts
	const esrData = data.observations
		.filter((obs: { type: string }) => obs.type === 'ESR')
		.map(
			(obs: {
				date: string;
				value: { wintrobe: number; westergren: number };
			}) => ({
				date: obs.date,
				wintrobe: obs.value.wintrobe,
				westergren: obs.value.westergren,
			})
		);

	const hematologyData = [
		{
			name: 'Haemoglobin',
			results: data.observations
				.filter((obs: { type: string }) => obs.type === 'Haemoglobin')
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Total Leukocyte Count',
			results: data.observations
				.filter(
					(obs: { type: string }) =>
						obs.type === 'Total Leukocyte Count'
				)
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Neutrophils',
			results: data.observations
				.filter((obs: { type: string }) => obs.type === 'Neutrophils')
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Lymphocytes',
			results: data.observations
				.filter((obs: { type: string }) => obs.type === 'Lymphocytes')
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Monocytes',
			results: data.observations
				.filter((obs: { type: string }) => obs.type === 'Monocytes')
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Eosinophils',
			results: data.observations
				.filter((obs: { type: string }) => obs.type === 'Eosinophils')
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Basophils',
			results: data.observations
				.filter((obs: { type: string }) => obs.type === 'Basophils')
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Platelet Count',
			results: data.observations
				.filter(
					(obs: { type: string }) => obs.type === 'Platelet Count'
				)
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
		{
			name: 'Total RBC Count',
			results: data.observations
				.filter(
					(obs: { type: string }) => obs.type === 'Total RBC Count'
				)
				.map((obs: { date: string; value: number }) => ({
					month: obs.date,
					value: obs.value,
				})),
		},
	];

	const hba1cData = data.observations
		.filter((obs: { type: string }) => obs.type === 'HbA1c')
		.map((obs: { date: string; value: number }) => ({
			month: obs.date,
			hba1c: obs.value,
		}));

	const serumElectrolytesData = data.observations
		.filter((obs: { type: string }) => obs.type === 'Serum Electrolytes')
		.map((obs: { subType: string; value: number }) => ({
			electrolyte: obs.subType, // Example: sodium, chloride, etc.
			electrolytes: obs.value,
			fill: `var(--color-${obs.subType.toLowerCase()})`,
		}));

	const lipidProfileData = data.observations
		.filter((obs: { type: string }) => obs.type === 'Lipid Profile')
		.map(
			(obs: {
				date: string;
				value: {
					totalCholesterol: number;
					LDL: number;
					HDL: number;
					triglycerides: number;
					nonHDL: number;
					VLDL: number;
				};
			}) => ({
				month: obs.date,
				totalCholesterol: obs.value.totalCholesterol,
				LDL: obs.value.LDL,
				HDL: obs.value.HDL,
				triglycerides: obs.value.triglycerides,
				nonHDL: obs.value.nonHDL,
				VLDL: obs.value.VLDL,
				LDL_HDL: obs.value.LDL / obs.value.HDL,
				TC_HDL: obs.value.totalCholesterol / obs.value.HDL,
				TG_HDL: obs.value.triglycerides / obs.value.HDL,
			})
		);

	const patient = useSelector((state: RootState) => state.patient.state);
	const age = patient
		? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()
		: 0;
	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 h-full w-full overflow-y-auto gap-3 mt-2 mb-5">
			<div className="col-span-1 grid sm:grid-cols-1 md:grid-cols-2 gap-3">
				<div className="col-span-1 flex flex-col gap-3">
					{patient && (
						<Summary
							name={patient.firstName + patient.lastName}
							age={age}
							gender={patient.gender}
							patientData={patient.summary}
						/>
					)}
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
					<HematologyTrendsChart
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
					/>
					<GlycatedHemoglobinChart
						chartData={[
							{
								month: 'January',
								hba1c: 6.5,
							},
						]}
					/>
					<SerumElectrolytesChart
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
					/>
					<CRPChart />
				</div>
			</div>
			<div className="col-span-1 grid gap-2">
				<LipidProfileChart
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
				/>
				<div className="grid sm:grid-cols-1 md:grid-cols-2 h-full w-full overflow-y-auto gap-3">
					<FastingBloodGlucoseChart
						chartData={[
							{ month: 'January', FBG: 95 },
							{ month: 'February', FBG: 110 },
							{ month: 'March', FBG: 130 },
							{ month: 'April', FBG: 85 },
							{ month: 'May', FBG: 145 },
							{ month: 'June', FBG: 105 },
						]}
					/>
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
					<KidneyChart
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

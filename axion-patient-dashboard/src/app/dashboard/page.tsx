'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import FastingBloodGlucoseChart from '../elements/FastingBloodGlucose';
import LiverFunctionTest from '../elements/LiverFunctionChart';
import CRPChart from '../elements/CRPChart';
import SerumElectrolytesChart from '../elements/SerumElectrolytes';
import ESRChart from '../elements/ESRChart';
import GlycatedHemoglobinChart from '../elements/GlycatedHemoglobinChart';

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
const BloodSugarChart = dynamic(() => import('../elements/BloodSugarChart'), {
	ssr: false,
});
const Summary = dynamic(() => import('../elements/Summary'), { ssr: false });

const KidneyChart = dynamic(() => import('../elements/KidneyChart'), {
	ssr: false,
});

const Dashboard: React.FC = () => {
	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 h-full w-full overflow-y-auto gap-3 mt-2 mb-5">
			<div className="col-span-1 grid sm:grid-cols-1 md:grid-cols-2 gap-3">
				<div className="col-span-1 flex flex-col gap-3">
					<Summary />
					<ESRChart />
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
					<GlycatedHemoglobinChart />
					<SerumElectrolytesChart />
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
					<KidneyChart />
					<LiverFunctionTest />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

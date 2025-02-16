'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import KidneyChart from '../elements/KidneyChart';
import LipidProfileChart from '../elements/LipidProfileChart';

const WeightChart = dynamic(() => import('../elements/WeightChart'), {
	ssr: false,
});
const BloodPressureChart = dynamic(
	() => import('../elements/BloodPressureChart'),
	{ ssr: false }
);
const CholesterolChart = dynamic(
	() => import('../elements/LipidProfileChart'),
	{ ssr: false }
);
const BloodSugarChart = dynamic(() => import('../elements/BloodSugarChart'), {
	ssr: false,
});
const Summary = dynamic(() => import('../elements/Summary'), { ssr: false });

const Dashboard: React.FC = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 h-full w-full overflow-y-auto gap-3 mt-2 mb-5">
			<div className="col-span-1 grid grid-cols-2 gap-3">
				<div className="col-span-1">
					<Summary />
				</div>

				<div className="col-span-1 flex flex-col gap-3">
					<WeightChart
						chartData={[
							{ month: 'January', weight: 186 },
							{ month: 'February', weight: 305 },
							{ month: 'March', weight: 237 },
							{ month: 'April', weight: 73 },
							{ month: 'May', weight: 209 },
							{ month: 'June', weight: 214 },
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
							nonHDL: 160,
							VLDL: 30,
							ApoB: 90,
							Lp_a: 25,
						},
						{
							month: 'February',
							totalCholesterol: 190,
							LDL: 120,
							HDL: 55,
							triglycerides: 140,
							nonHDL: 150,
							VLDL: 28,
							ApoB: 85,
							Lp_a: 23,
						},
						{
							month: 'March',
							totalCholesterol: 210,
							LDL: 135,
							HDL: 52,
							triglycerides: 160,
							nonHDL: 170,
							VLDL: 32,
							ApoB: 95,
							Lp_a: 27,
						},
						{
							month: 'April',
							totalCholesterol: 195,
							LDL: 125,
							HDL: 57,
							triglycerides: 145,
							nonHDL: 155,
							VLDL: 29,
							ApoB: 88,
							Lp_a: 22,
						},
						{
							month: 'May',
							totalCholesterol: 205,
							LDL: 132,
							HDL: 53,
							triglycerides: 155,
							nonHDL: 165,
							VLDL: 31,
							ApoB: 92,
							Lp_a: 26,
						},
						{
							month: 'June',
							totalCholesterol: 198,
							LDL: 128,
							HDL: 56,
							triglycerides: 148,
							nonHDL: 158,
							VLDL: 30,
							ApoB: 89,
							Lp_a: 24,
						},
					]}
				/>
				<BloodSugarChart />
			</div>
		</div>
	);
};

export default Dashboard;

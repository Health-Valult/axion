'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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
	const sampleProps = {
		data: {
			normal: [1420, 1620, 1820, 1420, 1650, 2120],
			actual: [788, 810, 866, 788, 1100, 1200],
		},
		bloodGlucose: 5405,
		risk: 23.5,
		categories: [
			'Hemoglobin A1c',
			'Insulin',
			'C-Peptide',
			'Ketones',
			'Creatinine',
			'Beta-Hydroxybutyrate',
		], // X-axis labels
	};

	return (
		<div className="flex flex-1 bg-white rounded-l-sm h-full overflow-y-auto">
			{/* Wrapper with transition animation on page load */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="p-2 md:p-10 rounded-tl-2xl flex-col gap-2 w-full h-full"
			>
				<div className="grid grid-cols-3 gap-4">
					{/* Left-side Charts */}
					<div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4 rounded p-4">
						{/* Weight Chart */}
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="flex items-center justify-center rounded p-2"
						>
							<WeightChart
								series={[
									{
										name: 'Weight',
										data: [
											231, 122, 63, 421, 122, 323, 111,
										],
									},
								]}
								categories={[
									'Mon',
									'Tue',
									'Wed',
									'Thu',
									'Fri',
									'Sat',
									'Sun',
								]}
							/>
						</motion.div>

						{/* Blood Pressure Chart */}
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="flex items-center justify-center rounded p-2"
						>
							<BloodPressureChart />
						</motion.div>

						{/* Blood Sugar Chart */}
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="flex items-center justify-center rounded p-2"
						>
							<BloodSugarChart {...sampleProps} />
						</motion.div>

						{/* Cholesterol Chart */}
						<motion.div
							whileHover={{ scale: 1.05 }}
							className="flex items-center justify-center rounded p-2"
						>
							<CholesterolChart
								data={{
									categories: [
										'01 Feb',
										'02 Feb',
										'03 Feb',
										'04 Feb',
										'05 Feb',
										'06 Feb',
										'07 Feb',
									],
									series: [
										{
											name: 'Total Cholesterol',
											data: [
												6500, 6418, 6456, 6526, 6356,
												6456,
											],
											color: '#1A56DB',
										},
										{
											name: 'HDL Cholesterol',
											data: [
												6456, 6356, 6526, 6332, 6418,
												6500,
											],
											color: '#7E3AF2',
										},
										{
											name: 'ApoB or Lp(a)',
											data: [
												6356, 6236, 6396, 6300, 6425,
												6550,
											],
											color: '#FF5733',
										},
										{
											name: 'Triglycerides',
											data: [
												6520, 6480, 6435, 6375, 6420,
												6450,
											],
											color: '#FFC300',
										},
										{
											name: 'LDL Cholesterol',
											data: [
												6390, 6350, 6380, 6400, 6420,
												6440,
											],
											color: '#DAF7A6',
										},
										{
											name: 'VLDL and Non-HDL',
											data: [
												6450, 6420, 6400, 6390, 6410,
												6445,
											],
											color: '#900C3F',
										},
									],
								}}
							/>
						</motion.div>
					</div>

					{/* Right-side Summary */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="col-span-1 flex flex-col gap-4 rounded p-4"
					>
						<Summary />
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default Dashboard;

'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

const BloodPressureChart: React.FC = () => {
	const options: ApexOptions = {
		chart: {
			height: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: { enabled: false },
			toolbar: { show: false },
		},
		tooltip: {
			enabled: true,
			x: { show: false },
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2'],
			},
		},
		dataLabels: { enabled: false },
		stroke: { width: 6 },
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: { left: 2, right: 2, top: 0 },
		},
		xaxis: {
			categories: [
				'01 February',
				'02 February',
				'03 February',
				'04 February',
				'05 February',
				'06 February',
				'07 February',
			],
			labels: { show: false },
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: { show: false },
		colors: ['#1A56DB', '#FDBA8C'],
	};

	const series = [
		{
			name: 'Systolic Pressure',
			data: [6500, 6418, 6456, 6526, 6356, 6456],
		},
		{
			name: 'Diastolic Pressure',
			data: [6800, 6318, 6426, 6126, 6396, 5946],
		},
	];

	return (
		<div className="w-full h-full bg-white rounded-lg shadow p-4 md:p-6">
			<div className="flex justify-between mb-20">
				<div>
					<h5 className="leading-none text-3xl font-bold text-gray-900  pb-2">
						120
					</h5>
					<h5 className="leading-none text-3xl font-bold text-gray-900  pb-2">
						80
					</h5>
					<p className="text-base font-normal text-gray-500 ">
						Blood Pressure
					</p>
				</div>
				<div>
					<span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
						<span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
						Normal
					</span>
				</div>
			</div>
			<ReactApexChart
				options={options}
				series={series}
				type="area"
				height="250"
			/>
		</div>
	);
};

export default BloodPressureChart;

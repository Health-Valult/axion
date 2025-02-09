'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically load ApexCharts to avoid SSR issues
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const LipidProfileChart = ({ data }: { data: any }) => {
	const chartType: 'line' | 'bar' | 'area' = 'line';
	const options: ApexOptions = {
		chart: {
			height: '100%',
			type: chartType,
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		tooltip: {
			enabled: true,
			x: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 6,
			curve: 'smooth',
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: -26,
			},
		},
		series: data.series,
		legend: {
			show: false,
		},
		xaxis: {
			categories: data.categories,
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass:
						'text-xs font-normal fill-gray-500 dark:fill-gray-400',
				},
			},
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
		},
		yaxis: {
			show: false,
		},
	};

	return (
		<div className="w-full h-full bg-white rounded-lg shadow p-4 md:p-6">
			<div className="flex justify-between mb-5">
				<div className="grid gap-4 grid-cols-2">
					{data.series.map((item: any) => (
						<div key={item.name}>
							<h5 className="inline-flex items-center text-gray-500 leading-none font-normal mb-2">
								{item.name}
							</h5>
							<p className="text-gray-900 text-2xl leading-none font-bold">
								{item.data[item.data.length - 1]}
							</p>
						</div>
					))}
				</div>
			</div>
			<div id="line-chart">
				<ApexCharts
					options={options}
					series={options.series}
					type="line"
					height={300}
				/>
			</div>
		</div>
	);
};

export default LipidProfileChart;

'use client';

import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface BloodSugarChartProps {
	data: {
		normal: number[];
		actual: number[];
	};
	bloodGlucose: number;
	risk: number;
	categories: string[];
}

const BloodSugarChart: React.FC<BloodSugarChartProps> = ({
	data,
	bloodGlucose,
	risk,
	categories,
}) => {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chartRef.current && typeof ApexCharts !== 'undefined') {
			const options = {
				series: [
					{
						name: 'Normal',
						color: '#31C48D',
						data: data.normal,
					},
					{
						name: 'Actual',
						data: data.actual,
						color: '#F05252',
					},
				],
				chart: {
					sparkline: {
						enabled: false,
					},
					type: 'bar',
					width: '100%',
					height: 400,
					toolbar: {
						show: false,
					},
				},
				fill: {
					opacity: 1,
				},
				plotOptions: {
					bar: {
						horizontal: true,
						columnWidth: '100%',
						borderRadiusApplication: 'end',
						borderRadius: 6,
						dataLabels: {
							position: 'top',
						},
					},
				},
				legend: {
					show: true,
					position: 'bottom',
				},
				dataLabels: {
					enabled: false,
				},
				tooltip: {
					shared: true,
					intersect: false,
					formatter: (value: number) => value.toString(),
				},
				xaxis: {
					labels: {
						show: true,
						style: {
							fontFamily: 'Inter, sans-serif',
							cssClass:
								'text-xs font-normal fill-gray-500 dark:fill-gray-400',
						},
						formatter: (value: number) => value.toString(),
					},
					categories: categories,
					axisTicks: {
						show: false,
					},
					axisBorder: {
						show: false,
					},
				},
				yaxis: {
					labels: {
						show: true,
						style: {
							fontFamily: 'Inter, sans-serif',
							cssClass:
								'text-xs font-normal fill-gray-500 dark:fill-gray-400',
						},
					},
				},
				grid: {
					show: true,
					strokeDashArray: 4,
					padding: {
						left: 2,
						right: 2,
						top: -20,
					},
				},
			};

			const chart = new ApexCharts(chartRef.current, options);
			chart.render();

			return () => {
				chart.destroy();
			};
		}
	}, [data, categories]);

	return (
		<div className="w-full h-full bg-white rounded-lg shadow p-4 md:p-6">
			<div className="flex justify-between border-gray-200 border-b  pb-3">
				<dl>
					<dt className="text-base font-normal text-gray-500 pb-1">
						Blood Glucose
					</dt>
					<dd className="leading-none text-3xl font-bold text-gray-900">
						{bloodGlucose} mg/dL
					</dd>
				</dl>
			</div>
			<div ref={chartRef} className="w-full h-full mt-12"></div>;
		</div>
	);
};

export default BloodSugarChart;

'use client';

import { AlertCircle, CheckCircle, TriangleAlert } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	systolic: {
		label: 'Systolic',
		color: 'hsl(var(--chart-1))',
	},
	diastolic: {
		label: 'Diastolic',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

interface ChartProps {
	chartData: {
		month: string;
		systolic: number;
		diastolic: number;
	}[];
}

const getBloodPressureStatus = (systolic: number, diastolic: number) => {
	if (systolic < 120 && diastolic < 80) {
		return {
			label: 'Normal Blood Pressure',
			color: 'text-green-600',
			icon: <CheckCircle className="h-4 w-4" />,
		};
	} else if (
		systolic >= 120 &&
		systolic < 140 &&
		diastolic >= 80 &&
		diastolic < 90
	) {
		return {
			label: 'Prehypertension',
			color: 'text-yellow-600',
			icon: <AlertCircle className="h-4 w-4" />,
		};
	} else if (
		(systolic >= 140 && systolic < 160) ||
		(diastolic >= 90 && diastolic < 100)
	) {
		return {
			label: 'Stage 1 Hypertension',
			color: 'text-orange-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else {
		return {
			label: 'Stage 2 Hypertension',
			color: 'text-red-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	}
};

const BloodPressureChart: React.FC<ChartProps> = ({ chartData }) => {
	const latest = chartData[chartData.length - 1];
	const status = getBloodPressureStatus(latest.systolic, latest.diastolic);
	return (
		<Card className="shadow-none border-gray-300 dark:border-gray-700">
			<CardHeader>
				<CardTitle>Blood Pressure Chart (mmHg)</CardTitle>
				<CardDescription>
					{chartData[0].month} - {latest.month}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar
							dataKey="systolic"
							fill="var(--color-systolic)"
							radius={4}
						/>
						<Bar
							dataKey="diastolic"
							fill="var(--color-diastolic)"
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div
							className={`flex items-center gap-2 ${status.color} font-medium leading-none`}
						>
							{status.label} {status.icon}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default BloodPressureChart;

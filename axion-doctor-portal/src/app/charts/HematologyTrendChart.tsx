'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart1';
import React from 'react';

type BloodComponent = {
	name: string;
	measurementUnit: string;
	normalRange: {
		min: number;
		max: number;
	};
};

const bloodComponents: BloodComponent[] = [
	{
		name: 'Haemoglobin',
		measurementUnit: 'g/dL',
		normalRange: { min: 13, max: 17 },
	},
	{
		name: 'Total Leukocyte Count',
		measurementUnit: 'cumm',
		normalRange: { min: 4800, max: 10800 },
	},
	{
		name: 'Neutrophils',
		measurementUnit: '%',
		normalRange: { min: 40, max: 80 },
	},
	{
		name: 'Lymphocytes',
		measurementUnit: '%',
		normalRange: { min: 20, max: 40 },
	},
	{
		name: 'Monocytes',
		measurementUnit: '%',
		normalRange: { min: 2, max: 10 },
	},
	{
		name: 'Eosinophils',
		measurementUnit: '%',
		normalRange: { min: 1, max: 6 },
	},
	{
		name: 'Basophils',
		measurementUnit: '%',
		normalRange: { min: 0, max: 2 },
	},
	{
		name: 'Platelet Count',
		measurementUnit: 'lakhs/cumm',
		normalRange: { min: 1.5, max: 4.1 },
	},
	{
		name: 'Total RBC Count',
		measurementUnit: 'million/cumm',
		normalRange: { min: 4.5, max: 5.5 },
	},
	{
		name: 'Haematocrit Value, HCT',
		measurementUnit: '%',
		normalRange: { min: 40, max: 50 },
	},
	{
		name: 'Mean Corpuscular Volume, MCV',
		measurementUnit: 'fL',
		normalRange: { min: 83, max: 101 },
	},
	{
		name: 'Mean Cell Haemoglobin, MCH',
		measurementUnit: 'Pg',
		normalRange: { min: 27, max: 32 },
	},
	{
		name: 'Mean Cell Haemoglobin Concentration, MCHC',
		measurementUnit: '%',
		normalRange: { min: 31.5, max: 34.5 },
	},
];

interface trendProps {
	parameters: {
		name: string;
		results: {
			month: string;
			value: number;
		}[];
	}[];
}

const HematologyChart: React.FC<trendProps> = ({ parameters }) => {
	// Check if parameters is undefined or empty
	if (!parameters || parameters.length === 0) {
		return (
			<Card className="shadow-none max-h-96 border-gray-300 dark:border-gray-700">
				<CardHeader>
					<CardTitle>Hematology Trend Charts</CardTitle>
					<CardDescription>
						No hematology data available
					</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-64">
					<p className="text-muted-foreground">No data to display</p>
				</CardContent>
			</Card>
		);
	}

	const [open, setOpen] = React.useState(false);
	const [selectedComponent, setSelectedComponent] =
		React.useState<BloodComponent | null>(null);
	const [selectedReportData, setSelectedReportData] = React.useState<
		{ month: string; value: number }[]
	>([]);

	const handleOpen = (component: BloodComponent) => {
		setSelectedComponent(component);
		const found = parameters.find(
			(material) => material.name === component.name
		);
		setSelectedReportData(
			Array.isArray(found?.results) ? found.results : []
		);
		setOpen(true);
	};
	return (
		<Card className="shadow-none max-h-96 overflow-y-auto border-gray-300 dark:border-gray-700 scrollbar-thin scrollbar-thumb-gray-350 scrollbar-track-gray-200">
			<CardHeader>
				<CardTitle>Hematology Trend Charts</CardTitle>
				<CardDescription>
					Select component to view trend chart
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap justify-center gap-2">
					{bloodComponents.map((component, index) => {
						return (
							<div key={index} className="m-2">
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											onClick={() =>
												handleOpen(component)
											}
										>
											{component.name}
										</Button>
									</DialogTrigger>
									{selectedComponent && (
										<DialogContent className="sm:max-w-[800px]">
											<DialogHeader>
												<DialogTitle>
													{selectedComponent.name}{' '}
													Chart
												</DialogTitle>
												<DialogDescription>
													{selectedComponent.name}{' '}
													variation over last{' '}
													{selectedReportData.length}{' '}
													months
												</DialogDescription>
											</DialogHeader>
											<Chart
												measurementUnit={
													selectedComponent.measurementUnit
												}
												reportData={selectedReportData}
												normalRange={
													selectedComponent.normalRange
												}
											/>
										</DialogContent>
									)}
								</Dialog>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

interface chartProps {
	measurementUnit: string;
	reportData: {
		month: string;
		value: number;
	}[];
	normalRange: {
		min: number;
		max: number;
	};
}

const Chart: React.FC<chartProps> = ({
	measurementUnit,
	reportData,
	normalRange,
}) => {
	// Check if reportData is undefined or empty
	if (!reportData || reportData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>{measurementUnit}</CardTitle>
					<CardDescription>No data available</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-64">
					<p className="text-muted-foreground">
						No trend data to display
					</p>
				</CardContent>
			</Card>
		);
	}

	const chartData = reportData.map((data) => ({
		month: data.month,
		actual: data.value,
		normalMin: normalRange.min,
		normalMax: normalRange.max,
	}));

	return (
		<Card>
			<CardHeader>
				<CardTitle>{measurementUnit}</CardTitle>
				<CardDescription>
					{chartData.at(0)?.month} - {chartData.at(-1)?.month}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Line
							dataKey="normalMin"
							type="monotone"
							stroke="var(--color-normalMin)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="normalMax"
							type="monotone"
							stroke="var(--color-normalMax)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="actual"
							type="monotone"
							stroke="var(--color-actual)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							{(() => {
								const last = chartData.at(-1);
								const beforeLast = chartData.at(-2);

								if (!last || !beforeLast) return null; // Handle cases where data is missing

								const { actual } = last;
								const { normalMin, normalMax } = beforeLast;

								let statusText = 'Normal';
								let textColor = 'text-green-500';

								if (actual < normalMin) {
									statusText = 'Warning: Low';
									textColor = 'text-red-500';
								} else if (actual > normalMax) {
									statusText = 'Warning: High';
									textColor = 'text-red-500';
								}

								return (
									<span className={textColor}>
										{statusText}
									</span>
								);
							})()}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

const chartConfig = {
	actual: {
		label: 'Actual',
		color: 'hsl(var(--chart-1))',
	},
	normalMin: {
		label: 'Normal Range - Min',
		color: 'hsl(var(--chart-2))',
	},
	normalMax: {
		label: 'Normal Range - Max',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

export default HematologyChart;

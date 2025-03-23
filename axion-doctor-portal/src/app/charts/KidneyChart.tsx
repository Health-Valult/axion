'use client';

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog2';
import { Button } from '@/components/ui/button';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

interface resultsProps {
	date: string;
	testResults: {
		parameter: string;
		result: string;
		normal: string;
	}[];
}

type UrineTestResult = {
	parameter: string;
	result: string;
	normal: string;
};

const isWithinNormal = (test: UrineTestResult): boolean => {
	const { result, normal } = test;

	// Direct match
	if (result === normal) return true;

	// Check for range values
	const rangeMatch = normal.match(/^([\d.]+) – ([\d.]+)$/);
	if (rangeMatch) {
		const min = parseFloat(rangeMatch[1]);
		const max = parseFloat(rangeMatch[2]);
		const resultValue = parseFloat(result);

		if (!isNaN(resultValue) && resultValue >= min && resultValue <= max) {
			return true;
		}
	}

	// Check for values with units like "/ HPF"
	const unitMatch = normal.match(/^([\d.]+) \/ HPF$/);
	if (unitMatch) {
		const max = parseFloat(unitMatch[1]);
		const resultValue = parseFloat(result);

		if (!isNaN(resultValue) && resultValue <= max) {
			return true;
		}
	}

	return false;
};

const KidneyChart: React.FC<resultsProps> = ({ date, testResults }) => {
	// Handle case where testResults is undefined
	const safeTestResults = testResults || [];

	// Calculate Overall Urine Health Score (Percentage of Normal Markers)
	const totalParameters = safeTestResults.length;
	const normalCount = safeTestResults.filter((test) =>
		isWithinNormal(test)
	).length;
	const urineHealthScore =
		totalParameters > 0
			? Math.round((normalCount / totalParameters) * 100)
			: 0;

	const chartData = [
		{
			name: 'Urine Health Score',
			value: urineHealthScore,
			fill: 'var(--color-urineHealth)',
		},
	];

	const chartConfig = {
		health: {
			label: 'Overall Kidney Health',
		},
		urineHealth: {
			label: 'Patient Health Score',
			color: 'hsl(var(--chart-1))',
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col shadow-none border-gray-300 dark:border-gray-700">
			<CardHeader className="items-center pb-0">
				<CardTitle>Urinalysis Overview</CardTitle>
				<CardDescription>Test taken {date}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col items-center justify-center py-2">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full h-full max-h-[250px]"
				>
					<RadialBarChart
						data={chartData}
						startAngle={0}
						endAngle={chartData[0].value * 3.6}
						innerRadius={80}
						outerRadius={110}
					>
						<PolarGrid
							gridType="circle"
							radialLines={false}
							stroke="none"
							className="first:fill-muted last:fill-background"
							polarRadius={[86, 74]}
						/>
						<RadialBar
							dataKey="value"
							background
							cornerRadius={10}
						/>
						<PolarRadiusAxis
							tick={false}
							tickLine={false}
							axisLine={false}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										'cx' in viewBox &&
										'cy' in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-4xl font-bold"
												>
													{chartData[0].value.toLocaleString()}
													%
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Kidney Health
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="mb-2">
							View detailed overview
						</Button>
					</DialogTrigger>
					<DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
						<DialogHeader className="contents space-y-0 text-left">
							<DialogTitle className="border-b border-border px-6 py-4 text-base">
								Kidney Health
							</DialogTitle>
							<div className="overflow-y-auto">
								<DialogDescription asChild>
									<div className="px-6 py-4">
										{safeTestResults.length > 0 ? (
											<Table>
												<TableCaption>
													Composition of urine as at{' '}
													{date}
												</TableCaption>
												<TableHeader>
													<TableRow>
														<TableHead className="w-[100px]">
															Parameter
														</TableHead>
														<TableHead>
															Result
														</TableHead>
														<TableHead>
															Normal
														</TableHead>
														<TableHead className="text-right">
															Remarks
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{safeTestResults.map(
														(component) => (
															<TableRow
																key={
																	component.parameter
																}
															>
																<TableCell className="font-medium">
																	{
																		component.parameter
																	}
																</TableCell>
																<TableCell>
																	{
																		component.result
																	}
																</TableCell>
																<TableCell>
																	{
																		component.normal
																	}
																</TableCell>
																<TableCell className="text-right">
																	{isWithinNormal(
																		component
																	)
																		? 'Normal'
																		: 'Abnormal'}
																</TableCell>
															</TableRow>
														)
													)}
												</TableBody>
												<TableFooter>
													<TableRow>
														<TableCell colSpan={3}>
															Overall Condition
														</TableCell>
														<TableCell className="text-right text-green-600">
															Good.
														</TableCell>
													</TableRow>
												</TableFooter>
											</Table>
										) : (
											<div className="py-8 text-center text-muted-foreground">
												No test results available
											</div>
										)}
									</div>
								</DialogDescription>
							</div>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
};

export default KidneyChart;

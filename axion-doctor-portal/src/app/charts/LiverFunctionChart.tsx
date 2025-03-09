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
		normalRange: string;
	}[];
}

type LiverTestResult = {
	parameter: string;
	result: string;
	normalRange: string;
};

const isWithinNormal = (test: LiverTestResult): boolean => {
	const { result, normalRange } = test;

	// Extract numerical values from result and normalRange
	const resultValue = parseFloat(result);
	const rangeMatch = normalRange.match(/([\d.]+)\s*-\s*([\d.]+)/);

	// If exact match (like "Absent"), check for direct equality
	if (!isNaN(resultValue) && normalRange === result) return true;

	// If range exists (e.g., "6.4 - 8.3 g/dL"), compare against result
	if (rangeMatch) {
		const min = parseFloat(rangeMatch[1]);
		const max = parseFloat(rangeMatch[2]);

		if (!isNaN(resultValue) && resultValue >= min && resultValue <= max) {
			return true;
		}
	}

	return false;
};

const LiverFunctionChart: React.FC<resultsProps> = ({ date, testResults }) => {
	// Calculate Overall Liver Health Score (Percentage of Normal Markers)
	const totalParameters = testResults.length;
	const normalCount = testResults.filter((test) =>
		isWithinNormal(test)
	).length;
	const liverHealthScore = Math.round((normalCount / totalParameters) * 100);

	const chartData = [
		{
			name: 'Liver Health Score',
			value: liverHealthScore,
			fill: 'var(--color-liverHealth)',
		},
	];

	const chartConfig = {
		health: {
			label: 'Overall Liver Health',
		},
		liverHealth: {
			label: 'Patient Health Score',
			color: 'hsl(var(--chart-1))',
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col shadow-none border-gray-300 dark:border-gray-700">
			<CardHeader className="items-center pb-0">
				<CardTitle>Liver Function Overview</CardTitle>
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
													Liver Health
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
								Liver Health
							</DialogTitle>
							<div className="overflow-y-auto">
								<DialogDescription asChild>
									<div className="px-6 py-4">
										<Table>
											<TableCaption>
												Liver Functionality as at
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
														Normal Range
													</TableHead>
													<TableHead className="text-right">
														Remarks
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{testResults.map(
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
																	component.normalRange
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

export default LiverFunctionChart;

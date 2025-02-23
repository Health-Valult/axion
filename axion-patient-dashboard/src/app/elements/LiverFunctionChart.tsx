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

type testData = {
	parameter: string;
	isNormal: boolean;
};

const liverTestData: testData[] = [
	{ parameter: 'SERUM BILIRUBIN (TOTAL)', isNormal: true },
	{ parameter: 'SERUM BILIRUBIN (DIRECT)', isNormal: true },
	{ parameter: 'SERUM BILIRUBIN (INDIRECT)', isNormal: true },
	{ parameter: 'SGPT (ALT)', isNormal: true },
	{ parameter: 'SGOT (AST)', isNormal: true },
	{ parameter: 'SERUM ALKALINE PHOSPHATASE', isNormal: false },
	{ parameter: 'SERUM PROTEIN', isNormal: true },
	{ parameter: 'SERUM ALBUMIN', isNormal: true },
	{ parameter: 'GLOBULIN', isNormal: true },
	{ parameter: 'A/G RATIO', isNormal: true },
];

// Calculate Overall liver Health Score (Percentage of Normal Markers)
const totalParameters = liverTestData.length;
const normalCount = liverTestData.filter((test) => test.isNormal).length;
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

const testResults = [
	{
		parameter: 'SERUM BILIRUBIN (TOTAL)',
		result: '0.9 mg/dl',
		normalRange: '0.2 - 1.2 mg/dl',
		remarks: 'Normal',
	},
	{
		parameter: 'SERUM BILIRUBIN (DIRECT)',
		result: '0.2 mg/dl',
		normalRange: '0 - 0.3 mg/dl',
		remarks: 'Normal',
	},
	{
		parameter: 'SERUM BILIRUBIN (INDIRECT)',
		result: '0.70 mg/dl',
		normalRange: '0.2 - 1 mg/dl',
		remarks: 'Normal',
	},
	{
		parameter: 'SGPT (ALT)',
		result: '36 U/I',
		normalRange: '13 - 40 U/I',
		remarks: 'Normal',
	},
	{
		parameter: 'SGOT (AST)',
		result: '32 U/I',
		normalRange: '0 - 37 U/I',
		remarks: 'Normal',
	},
	{
		parameter: 'SERUM ALKALINE PHOSPHATASE',
		result: '11 U/I',
		normalRange: 'Reference range not provided', // Assuming no reference range was given
		remarks: 'Low', // Based on the context of other values being normal, we can infer it's low
	},
	{
		parameter: 'SERUM PROTEIN',
		result: '7.2 g/dl',
		normalRange: '6.4 - 8.3 g/dl',
		remarks: 'Normal',
	},
	{
		parameter: 'SERUM ALBUMIN',
		result: '4.7 g/dl',
		normalRange: '3.5 - 5.2 g/dl',
		remarks: 'Normal',
	},
	{
		parameter: 'GLOBULIN',
		result: '2.50 g/dl',
		normalRange: '1.8 - 3.6 g/dl',
		remarks: 'Normal',
	},
	{
		parameter: 'A/G RATIO',
		result: '1.88',
		normalRange: '1.1 - 2.1',
		remarks: 'Normal',
	},
];

const KidneyChart: React.FC = () => {
	return (
		<Card className="flex flex-col shadow-none border-gray-300 dark:border-gray-700">
			<CardHeader className="items-center pb-0">
				<CardTitle>Liver Function Overview</CardTitle>
				<CardDescription>Test taken 27.01.2024</CardDescription>
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
												27.01.2024
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
																{
																	component.remarks
																}
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

export default KidneyChart;

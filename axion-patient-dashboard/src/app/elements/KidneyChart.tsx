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
	CardFooter,
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
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const urineTestData = [
	{ parameter: 'Protein', isNormal: false },
	{ parameter: 'Blood (Hematuria)', isNormal: false },
	{ parameter: 'Leukocytes (WBCs)', isNormal: false },
	{ parameter: 'Nitrites', isNormal: false },
	{ parameter: 'RBCs', isNormal: false },
	{ parameter: 'WBCs', isNormal: false },
	{ parameter: 'Crystals', isNormal: false },
	{ parameter: 'Bacteria', isNormal: false },
	{ parameter: 'pH', isNormal: true },
	{ parameter: 'Specific Gravity', isNormal: true },
	{ parameter: 'Glucose', isNormal: true },
	{ parameter: 'Ketones', isNormal: true },
	{ parameter: 'Bilirubin', isNormal: true },
	{ parameter: 'Urobilinogen', isNormal: true },
];

// Calculate Overall Urine Health Score (Percentage of Normal Markers)
const totalParameters = urineTestData.length;
const normalCount = urineTestData.filter((test) => test.isNormal).length;
const urineHealthScore = Math.round((normalCount / totalParameters) * 100);

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

const testResults = [
	{
		parameter: 'Color',
		result: 'Yellow',
		normalRange: 'Pale Yellow to Amber',
		remarks: 'Normal',
	},
	{
		parameter: 'Clarity',
		result: 'Clear',
		normalRange: 'Clear',
		remarks: 'Normal',
	},
	{
		parameter: 'Odor',
		result: 'Slightly Foul',
		normalRange: 'Normal (Mild)',
		remarks: 'May indicate infection',
	},
	{
		parameter: 'pH',
		result: '6.5',
		normalRange: '4.5 – 8.0',
		remarks: 'Normal',
	},
	{
		parameter: 'Specific Gravity',
		result: '1.020',
		normalRange: '1.005 – 1.030',
		remarks: 'Normal',
	},
	{
		parameter: 'Protein',
		result: '+1 (30 mg/dL)',
		normalRange: 'Negative / <30 mg/dL',
		remarks: 'Mild Proteinuria',
	},
	{
		parameter: 'Glucose',
		result: 'Negative',
		normalRange: 'Negative',
		remarks: 'Normal',
	},
	{
		parameter: 'Ketones',
		result: 'Negative',
		normalRange: 'Negative',
		remarks: 'Normal',
	},
	{
		parameter: 'Bilirubin',
		result: 'Negative',
		normalRange: 'Negative',
		remarks: 'Normal',
	},
	{
		parameter: 'Urobilinogen',
		result: '0.2 mg/dL',
		normalRange: '0.1 – 1.0 mg/dL',
		remarks: 'Normal',
	},
	{
		parameter: 'Blood (Hematuria)',
		result: '+1 (RBCs detected)',
		normalRange: 'Negative',
		remarks: 'Possible infection/stones',
	},
	{
		parameter: 'Leukocytes (WBCs)',
		result: '+2',
		normalRange: 'Negative',
		remarks: 'Possible UTI',
	},
	{
		parameter: 'Nitrites',
		result: 'Positive',
		normalRange: 'Negative',
		remarks: 'Suggests bacterial infection',
	},
	{
		parameter: 'Red Blood Cells (RBCs)',
		result: '8 / HPF',
		normalRange: '0 – 3 / HPF',
		remarks: 'Possible infection/stones',
	},
	{
		parameter: 'White Blood Cells (WBCs)',
		result: '15 / HPF',
		normalRange: '0 – 5 / HPF',
		remarks: 'Suggests UTI',
	},
	{
		parameter: 'Casts',
		result: 'Hyaline Casts',
		normalRange: 'None or Few',
		remarks: 'Normal',
	},
	{
		parameter: 'Crystals',
		result: 'Few Oxalate Crystals',
		normalRange: 'Absent / Few',
		remarks: 'May indicate kidney stones',
	},
	{
		parameter: 'Bacteria',
		result: 'Present',
		normalRange: 'Absent',
		remarks: 'UTI suspected',
	},
];

const KidneyChart: React.FC = () => {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Urinalysis Overview</CardTitle>
				<CardDescription>Test taken 10.02.2024</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col items-center justify-center py-2">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
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
						<Button variant="outline">
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
										<Table>
											<TableCaption>
												A list of your recent invoices.
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
			<CardFooter className="flex-col gap-2 text-sm"></CardFooter>
		</Card>
	);
};

export default KidneyChart;

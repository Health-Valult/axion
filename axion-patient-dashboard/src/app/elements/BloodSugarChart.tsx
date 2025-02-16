'use client';

import { TrendingUp } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';

import { TooltipProps } from 'recharts';

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
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';

// Updated Chart Data with Normal Ranges
const chartData = [
	{
		parameter: 'FBG (mg/dL)',
		normalMin: 70,
		normalMax: 99,
		actual: 110,
		excess: 11,
	},
	{
		parameter: 'PPBG (mg/dL)',
		normalMin: 70,
		normalMax: 140,
		actual: 160,
		excess: 20,
	},
	{
		parameter: 'RBG (mg/dL)',
		normalMin: 70,
		normalMax: 140,
		actual: 145,
		excess: 5,
	},
	{
		parameter: 'HbA1c (%)',
		normalMin: 4.0,
		normalMax: 5.7,
		actual: 6.8,
		excess: 1.1,
	},
	{
		parameter: 'Insulin (µU/mL)',
		normalMin: 2,
		normalMax: 25,
		actual: 18,
		excess: 0,
	},
	{
		parameter: 'C-Peptide (ng/mL)',
		normalMin: 0.5,
		normalMax: 2.7,
		actual: 2.4,
		excess: 0,
	},
	{
		parameter: 'Ketones (mmol/L)',
		normalMin: 0,
		normalMax: 0.3,
		actual: 0.3,
		excess: 0,
	},
	{
		parameter: 'BHB (mmol/L)',
		normalMin: 0,
		normalMax: 0.4,
		actual: 0.3,
		excess: 0,
	},
	{
		parameter: 'Creatinine (mg/dL)',
		normalMin: 0.6,
		normalMax: 1.3,
		actual: 1.1,
		excess: 0,
	},
	{
		parameter: 'eGFR (mL/min/1.73m²)',
		normalMin: 90,
		normalMax: 120,
		actual: 85,
		excess: 0,
	},
];

// Chart Configuration for Labels and Colors
const chartConfig = {
	actual: {
		label: 'Actual Value',
		color: 'hsl(var(--chart-1))', // Darker color for test result
	},
	normalRange: {
		label: 'Normal Range',
		color: 'hsl(var(--chart-2))', // Light color for background reference
	},
	excess: {
		label: 'Excess beyond normal',
		color: 'hsl(var(--chart-7))', // Red for exceeding values
	},
} satisfies ChartConfig;

interface ChartData {
	parameter: string;
	normalMin: number;
	normalMax: number;
	actual: number;
	excess: number;
}

// Define the CustomTooltip component with types
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
	active,
	payload,
}) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload as ChartData; // Type assertion

		return (
			<div className="bg-white p-2 rounded shadow-md">
				<p className="font-bold">{data.parameter}</p>
				<p>
					Normal Range: {data.normalMin} - {data.normalMax}
				</p>
				<p>Actual Value: {data.actual}</p>
				{data.excess > 0 && (
					<p className="text-red-500">Excess: {data.excess}</p>
				)}
			</div>
		);
	}
	return null;
};

const BloodSugarChart: React.FC = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Blood Glucose Chart</CardTitle>
				<CardDescription>Normal vs. Actual Values</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						data={chartData}
						layout="vertical"
						width={700}
						height={500}
					>
						<CartesianGrid
							horizontal={false}
							strokeDasharray="3 3"
						/>
						<XAxis
							type="number"
							domain={[0, 200]}
							tick={{ fontSize: 12 }}
						/>
						<YAxis
							type="category"
							dataKey="parameter"
							tick={{ fontSize: 12 }}
							width={150}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend content={<ChartLegendContent />} />

						{/* Background Normal Range (from normalMin to normalMax) */}
						<Bar
							dataKey="normalMax"
							stackId="a"
							fill="var(--color-normalRange)"
							barSize={20}
						/>

						{/* Actual Value Bar */}
						<Bar
							dataKey="actual"
							stackId="a"
							fill="var(--color-actual)"
							barSize={20}
						/>

						{/* Excess Value Bar (Only appears when actual > normalMax) */}
						<Bar
							dataKey="excess"
							stackId="a"
							fill="var(--color-excess)"
							barSize={20}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none text-green-600">
					Low risk <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing blood sugar composition against normal ranges
				</div>
			</CardFooter>
		</Card>
	);
};

export default BloodSugarChart;

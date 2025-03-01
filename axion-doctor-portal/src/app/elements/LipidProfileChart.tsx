'use client';

import { CheckCircle, CircleAlert, TriangleAlert } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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
	totalCholesterol: {
		label: 'Total Cholesterol',
		color: 'hsl(var(--chart-1))',
	},
	triglycerides: {
		label: 'Triglycerides',
		color: 'hsl(var(--chart-4))',
	},
	HDL: {
		label: 'HDL Cholesterol',
		color: 'hsl(var(--chart-3))',
	},
	LDL: {
		label: 'LDL Cholesterol (Calculated)',
		color: 'hsl(var(--chart-2))',
	},
	VLDL: {
		label: 'VLDL Cholesterol (Calculated)',
		color: 'hsl(var(--chart-6))',
	},
	LDL_HDL: {
		label: 'LDL / HDL (Calculated)',
		color: 'hsl(var(--chart-7))',
	},
	TC_HDL: {
		label: 'Total Cholesterol / HDL (Calculated)',
		color: 'hsl(var(--chart-8))',
	},
	TG_HDL: {
		label: 'TG / HDL (Calculated)',
		color: 'hsl(var(--chart-9))',
	},
	nonHDL: {
		label: 'Non-HDL cholesterol (Calculated)',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

interface chartProps {
	chartData: {
		month: string;
		totalCholesterol: number;
		triglycerides: number;
		HDL: number;
		LDL: number;
		VLDL: number;
		LDL_HDL: number;
		TC_HDL: number;
		TG_HDL: number;
		nonHDL: number;
	}[];
}

const getCholesterolRisk = (
	totalCholesterol: number,
	triglycerides: number,
	HDL: number,
	LDL: number,
	VLDL: number,
	LDL_HDL: number,
	TC_HDL: number,
	nonHDL: number
) => {
	if (
		totalCholesterol >= 125 &&
		totalCholesterol <= 200 &&
		triglycerides >= 25 &&
		triglycerides <= 200 &&
		HDL >= 35 &&
		HDL <= 80 &&
		LDL >= 85 &&
		LDL <= 130 &&
		VLDL >= 5 &&
		VLDL <= 40 &&
		LDL_HDL >= 1.5 &&
		LDL_HDL <= 3.5 &&
		TC_HDL >= 3.5 &&
		TC_HDL <= 5
	) {
		return {
			label: 'Optimal Cholesterol Levels',
			color: 'text-green-600',
			icon: <CheckCircle className="h-4 w-4" />,
		};
	} else if (LDL < 50 && nonHDL < 80) {
		return {
			label: 'Extreme Risk Group Category A (Treatment Goal)',
			color: 'text-blue-600',
			icon: <CircleAlert className="h-4 w-4" />,
		};
	} else if (LDL <= 30 && nonHDL <= 60) {
		return {
			label: 'Extreme Risk Group Category A (Optional Goal)',
			color: 'text-blue-600',
			icon: <CircleAlert className="h-4 w-4" />,
		};
	} else if (LDL >= 50 && nonHDL >= 80) {
		return {
			label: 'Consider Therapy (Extreme Risk Group Category A)',
			color: 'text-red-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else if (LDL > 30 && nonHDL > 60) {
		return {
			label: 'Consider Therapy (Extreme Risk Group Category A - Optional Goal)',
			color: 'text-red-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else if (LDL < 50 && nonHDL < 80) {
		return {
			label: 'Very High Risk (Treatment Goal)',
			color: 'text-blue-600',
			icon: <CircleAlert className="h-4 w-4" />,
		};
	} else if (LDL >= 50 && nonHDL >= 80) {
		return {
			label: 'Consider Therapy (Very High Risk)',
			color: 'text-red-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else if (LDL < 70 && nonHDL < 100) {
		return {
			label: 'High Risk (Treatment Goal)',
			color: 'text-orange-600',
			icon: <CircleAlert className="h-4 w-4" />,
		};
	} else if (LDL >= 70 && nonHDL >= 100) {
		return {
			label: 'Consider Therapy (High Risk)',
			color: 'text-red-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else {
		return {
			label: 'High Cholesterol Risk',
			color: 'text-orange-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		}; // Default to High Cholesterol Risk if no other condition is met
	}
};

const LipidProfileChart: React.FC<chartProps> = ({ chartData }) => {
	const latest = chartData[chartData.length - 1];
	const status = getCholesterolRisk(
		latest.totalCholesterol,
		latest.triglycerides,
		latest.HDL,
		latest.LDL,
		latest.VLDL,
		latest.LDL_HDL, // Added LDL_HDL
		latest.TC_HDL, // Added TC_HDL
		latest.nonHDL
	);
	return (
		<Card className="shadow-none border-gray-300 dark:border-gray-700">
			<CardHeader>
				<CardTitle>Cholesterol Chart (mg/dL)</CardTitle>
				<CardDescription>
					{chartData[0].month} - {latest.month}
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
							dataKey="totalCholesterol"
							type="monotone"
							stroke="var(--color-totalCholesterol)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="LDL"
							type="monotone"
							stroke="var(--color-LDL)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="HDL"
							type="monotone"
							stroke="var(--color-HDL)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="triglycerides"
							type="monotone"
							stroke="var(--color-triglycerides)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="nonHDL"
							type="monotone"
							stroke="var(--color-nonHDL)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="VLDL"
							type="monotone"
							stroke="var(--color-VLDL)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="ApoB"
							type="monotone"
							stroke="var(--color-ApoB)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="Lp_a"
							type="monotone"
							stroke="var(--color-Lp_a)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
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
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							Cholesterol level variation for the last 6 months
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default LipidProfileChart;

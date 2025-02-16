'use client';

import {
	AlertCircle,
	CheckCircle,
	HelpCircle,
	TrendingUp,
	TriangleAlert,
} from 'lucide-react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts';

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
		label: 'Total',
		color: 'hsl(var(--chart-1))',
	},
	LDL: {
		label: 'LDL',
		color: 'hsl(var(--chart-2))',
	},
	HDL: {
		label: 'HDL',
		color: 'hsl(var(--chart-3))',
	},
	triglycerides: {
		label: 'Triglycerides',
		color: 'hsl(var(--chart-4))',
	},
	nonHDL: {
		label: 'Non-HDL',
		color: 'hsl(var(--chart-5))',
	},
	VLDL: {
		label: 'VLDL ',
		color: 'hsl(var(--chart-6))',
	},
	ApoB: {
		label: 'ApoB',
		color: 'hsl(var(--chart-7))',
	},
	Lp_a: {
		label: 'Lp(a) - Lipoprotein(a)',
		color: 'hsl(var(--chart-8))',
	},
} satisfies ChartConfig;

interface chartProps {
	chartData: {
		month: string;
		totalCholesterol: number;
		LDL: number;
		HDL: number;
		triglycerides: number;
		nonHDL: number;
		VLDL: number;
		ApoB: number;
		Lp_a: number;
	}[];
}

const getCholesterolRisk = (
	totalCholesterol: number,
	LDL: number,
	HDL: number,
	triglycerides: number,
	nonHDL: number,
	VLDL: number,
	ApoB: number,
	Lp_a: number
) => {
	if (totalCholesterol < 200 && LDL < 100 && HDL >= 60) {
		return {
			label: 'Optimal Cholesterol Levels',
			color: 'text-green-600',
			icon: <CheckCircle className="h-4 w-4" />,
		};
	} else if (
		(totalCholesterol >= 200 && totalCholesterol < 240) ||
		(LDL >= 100 && LDL < 160) ||
		(HDL < 60 && HDL >= 40) ||
		(triglycerides >= 150 && triglycerides < 200) ||
		(nonHDL >= 130 && nonHDL < 160) ||
		(VLDL >= 30 && VLDL < 40) // Added VLDL here
	) {
		return {
			label: 'Borderline High Cholesterol',
			color: 'text-yellow-600',
			icon: <AlertCircle className="h-4 w-4" />,
		};
	} else if (
		totalCholesterol >= 240 ||
		LDL >= 160 ||
		HDL < 40 ||
		triglycerides >= 200 ||
		nonHDL >= 160 ||
		VLDL >= 40 // Added VLDL here
	) {
		return {
			label: 'High Cholesterol Risk',
			color: 'text-orange-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else if (
		ApoB >= 130 ||
		Lp_a >= 50 ||
		triglycerides >= 500 // Severe case
	) {
		return {
			label: 'Very High Cholesterol Risk',
			color: 'text-red-600',
			icon: <TriangleAlert className="h-4 w-4" />,
		};
	} else {
		return {
			label: 'Unknown Risk Level',
			color: 'text-gray-600',
			icon: <HelpCircle className="h-4 w-4" />,
		};
	}
};

const LipidProfileChart: React.FC<chartProps> = ({ chartData }) => {
	const latest = chartData[chartData.length - 1];
	const status = getCholesterolRisk(
		latest.totalCholesterol,
		latest.LDL,
		latest.HDL,
		latest.triglycerides,
		latest.nonHDL,
		latest.VLDL,
		latest.ApoB,
		latest.Lp_a
	);
	return (
		<Card>
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

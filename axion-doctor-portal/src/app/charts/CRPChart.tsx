'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
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
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	CRP: {
		label: 'C-Reactive Protein',
		color: 'hsl(var(--chart-1))',
	},
	label: {
		color: 'hsl(var(--background))',
	},
} satisfies ChartConfig;

interface chartProps {
	chartData?: { month: string; CRP: number }[];
}

const CRPChart: React.FC<chartProps> = ({ chartData }) => {
	// Check if chartData is undefined or empty
	if (!chartData || chartData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>C-Reactive Protein</CardTitle>
					<CardDescription>January - June 2024</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-40">
					<p className="text-muted-foreground">No data available</p>
				</CardContent>
			</Card>
		);
	}

	// Ensure all data points have valid CRP values
	const validChartData = chartData.map((item) => ({
		month: item.month || 'Unknown',
		CRP: typeof item.CRP === 'number' && !isNaN(item.CRP) ? item.CRP : 0,
	}));

	return (
		<Card>
			<CardHeader>
				<CardTitle>C-Reactive Protein</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={validChartData}
						layout="vertical"
						margin={{
							right: 16,
						}}
					>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey="month"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) =>
								value ? value.slice(0, 3) : ''
							}
							hide
						/>
						<XAxis dataKey="CRP" type="number" hide />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar
							dataKey="CRP"
							layout="vertical"
							fill="var(--color-CRP)"
							radius={4}
						>
							<LabelList
								dataKey="month"
								position="insideLeft"
								offset={8}
								className="fill-[--color-label]"
								fontSize={12}
								formatter={(value: string) =>
									value ? value.slice(0, 3) : ''
								}
							/>
							<LabelList
								dataKey="CRP"
								position="right"
								offset={8}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 text-green-600 font-medium leading-none">
					Normal
				</div>
			</CardFooter>
		</Card>
	);
};

export default CRPChart;

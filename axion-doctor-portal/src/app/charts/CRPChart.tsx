'use client';

import { TrendingUp } from 'lucide-react';
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

const chartData = [
	{ month: 'January', CRP: 15 },
	{ month: 'February', CRP: 12 },
	{ month: 'March', CRP: 25 },
	{ month: 'April', CRP: 8 },
	{ month: 'May', CRP: 15 },
	{ month: 'June', CRP: 38 },
];

const chartConfig = {
	CRP: {
		label: 'C-Reactive Protein',
		color: 'hsl(var(--chart-1))',
	},
	label: {
		color: 'hsl(var(--background))',
	},
} satisfies ChartConfig;

const LiverFunctionTest = () => {
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
						data={chartData}
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
							tickFormatter={(value) => value.slice(0, 3)}
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

export default LiverFunctionTest;

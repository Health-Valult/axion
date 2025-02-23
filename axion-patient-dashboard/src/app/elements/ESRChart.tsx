'use client';

import { Bar, BarChart, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
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
	{ date: '2024-07-15', wintrobe: 6, westergren: 10 },
	{ date: '2024-07-16', wintrobe: 8, westergren: 12 },
	{ date: '2024-07-17', wintrobe: 5, westergren: 9 },
	{ date: '2024-07-18', wintrobe: 12, westergren: 18 },
	{ date: '2024-07-19', wintrobe: 10, westergren: 15 },
	{ date: '2024-07-20', wintrobe: 7, westergren: 11 },
];

const chartConfig = {
	ESR: {
		label: 'ESR',
	},
	wintrobe: {
		label: 'wintrobe',
		color: 'hsl(var(--chart-1))',
	},
	westergren: {
		label: 'westergren',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

const ESRChart: React.FC = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Erythrocyte Sedimentation Rate Chart</CardTitle>
				<CardDescription>mm for 1st hour</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<XAxis
							dataKey="date"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => {
								return new Date(value).toLocaleDateString(
									'en-US',
									{
										weekday: 'short',
									}
								);
							}}
						/>
						<Bar
							dataKey="wintrobe"
							stackId="a"
							fill="var(--color-wintrobe)"
							radius={[0, 0, 4, 4]}
						/>
						<Bar
							dataKey="westergren"
							stackId="a"
							fill="var(--color-westergren)"
							radius={[4, 4, 0, 0]}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									labelKey="ESR"
									indicator="line"
								/>
							}
							cursor={false}
							defaultIndex={1}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ESRChart;

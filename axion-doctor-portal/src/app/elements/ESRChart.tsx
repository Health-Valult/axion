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

interface chartProps {
	chartData: { date: string; wintrobe: number; westergren: number }[];
}

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

const ESRChart: React.FC<chartProps> = ({ chartData }) => {
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
										month: 'short',
										day: 'numeric',
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

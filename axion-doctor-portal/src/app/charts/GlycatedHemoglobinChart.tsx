'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

interface chartProps {
	chartData: { month: string; hba1c: number }[];
}

const chartConfig = {
	hba1c: {
		label: 'HbA1c',
		color: 'hsl(var(--chart-1))',
	},
	remaining: {
		label: 'Remaining',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

const GlycatedHemoglobinChart: React.FC<chartProps> = ({ chartData }) => {
	const totalValue = 100;

	const formattedChartData = chartData.map(({ month, hba1c }) => ({
		month,
		hba1c,
		remaining: totalValue - hba1c, // Calculate remaining percentage
	}));

	if (!chartData || chartData.length === 0) {
		return (
			<Card className="flex flex-col">
				<CardHeader className="items-center pb-0">
					<CardTitle>HbA1c %</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-1 items-center justify-center pt-8">
					<div className="text-muted-foreground">
						No HbA1c data available
					</div>
				</CardContent>
			</Card>
		);
	}
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>HbA1c %</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-1 items-center pt-8">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full max-w-[250px] max-h-48"
				>
					<RadialBarChart
						data={formattedChartData}
						endAngle={180}
						innerRadius={80}
						outerRadius={130}
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
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
											>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className="fill-foreground text-2xl font-bold"
												>
													{chartData[0].hba1c.toLocaleString()}
													%
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground"
												>
													HbA1C
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="hba1c" // Move this first so it appears underneath
							stackId="a"
							cornerRadius={5}
							fill="var(--color-hba1c)"
							className="stroke-transparent stroke-2"
						/>

						<RadialBar
							dataKey="remaining"
							stackId="a"
							cornerRadius={5}
							fill="var(--color-remaining)"
							className="stroke-transparent stroke-2 opacity-50"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GlycatedHemoglobinChart;

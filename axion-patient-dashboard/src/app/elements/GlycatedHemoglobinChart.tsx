'use client';

import { TrendingUp } from 'lucide-react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

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

const chartData = [{ month: 'january', hba1c: 1260 }];

const chartConfig = {
	hba1c: {
		label: 'HbA1c',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

const GlycatedHemoglobinChart: React.FC = () => {
	const totalValue = 100;

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>HbA1c %</CardTitle>
				<CardDescription>Gycated Hemoglobin percentage</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-1 items-center pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square w-full max-w-[250px] max-h-48"
				>
					<RadialBarChart
						data={chartData}
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
													{totalValue.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className="fill-muted-foreground"
												>
													HbA1C%
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="hba1c"
							stackId="a"
							cornerRadius={5}
							fill="var(--color-hba1c)"
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default GlycatedHemoglobinChart;

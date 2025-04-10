'use client';

import { AlertTriangle, CircleAlert } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
	FBG: {
		label: 'FBG',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

interface chartProps {
	chartData: {
		month: string;
		FBG: number;
	}[];
}

const FastingBloodGlucoseChart: React.FC<chartProps> = ({ chartData }) => {
	if (!chartData || chartData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Fasting Blood Glucose</CardTitle>
					<CardDescription>No data available</CardDescription>
				</CardHeader>
				<CardContent className="flex items-center justify-center h-64">
					<p className="text-muted-foreground">
						No FBG data to display
					</p>
				</CardContent>
			</Card>
		);
	}
	const latestFBG = chartData.at(-1)?.FBG;

	let glucoseStatus = '';
	let glucoseIcon = null;
	let glucoseColor = '';

	if (latestFBG !== undefined) {
		if (latestFBG < 100) {
			glucoseStatus = 'Normal';
			glucoseIcon = null;
			glucoseColor = 'text-green-600';
		} else if (latestFBG >= 100 && latestFBG <= 125) {
			glucoseStatus = 'Pre Diabetes';
			glucoseIcon = <AlertTriangle className="h-4 w-4" />;
			glucoseColor = 'text-orange-500';
		} else {
			glucoseStatus = 'Diabetes';
			glucoseIcon = <CircleAlert className="h-4 w-4" />;
			glucoseColor = 'text-red-600';
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fasting Blood Glucose</CardTitle>
				<CardDescription>
					Trend for the last {chartData.length} tests
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
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
							content={<ChartTooltipContent indicator="line" />}
						/>
						<defs>
							<linearGradient
								id="fillFBG"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-FBG)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-FBG)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey="FBG"
							type="natural"
							fill="url(#fillFBG)"
							fillOpacity={0.4}
							stroke="var(--color-FBG)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div
							className={`flex items-center gap-2 font-medium leading-none ${glucoseColor}`}
						>
							{glucoseStatus}
							{glucoseIcon}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default FastingBloodGlucoseChart;

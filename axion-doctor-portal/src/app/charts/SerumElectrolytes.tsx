'use client';

import { LabelList, RadialBar, RadialBarChart } from 'recharts';

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
	electrolytes: {
		label: 'Electrolytes (mmol/L)',
	},
	sodium: {
		label: 'sodium',
		color: 'hsl(var(--chart-1))',
	},
	potassium: {
		label: 'potassium',
		color: 'hsl(var(--chart-2))',
	},
	chloride: {
		label: 'chloride',
		color: 'hsl(var(--chart-3))',
	},
} satisfies ChartConfig;

interface SERprops {
	date: string;
	chartData: { electrolyte: string; electrolytes: number; fill: string }[];
}

const SerumElectrolytesChart: React.FC<SERprops> = ({ date, chartData }) => {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Serum Electrolytes Chart</CardTitle>
				<CardDescription>Test taken {date}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<RadialBarChart
						data={chartData}
						startAngle={-90}
						endAngle={380}
						innerRadius={30}
						outerRadius={110}
					>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
									nameKey="electrolyte"
								/>
							}
						/>
						<RadialBar dataKey="electrolytes" background>
							<LabelList
								position="insideStart"
								dataKey="electrolyte"
								className="fill-white capitalize mix-blend-luminosity"
								fontSize={11}
							/>
						</RadialBar>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center  text-green-600 gap-2 font-medium leading-none">
					Normal
				</div>
			</CardFooter>
		</Card>
	);
};

export default SerumElectrolytesChart;

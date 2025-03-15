import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SerumElectrolytesChart from './SerumElectrolytes';

const mockData = [
	{ electrolyte: 'sodium', electrolytes: 140, fill: 'var(--color-sodium)' },
	{
		electrolyte: 'chloride',
		electrolytes: 102,
		fill: 'var(--color-chloride)',
	},
	{
		electrolyte: 'potassium',
		electrolytes: 4.2,
		fill: 'var(--color-potassium)',
	},
];

describe('SerumElectrolytesChart', () => {
	it('renders chart title', () => {
		render(
			<SerumElectrolytesChart date="2024-07-08" chartData={mockData} />
		);
		expect(
			screen.getByText('Serum Electrolytes Chart')
		).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(
			<SerumElectrolytesChart date="2024-07-08" chartData={mockData} />
		);
		expect(screen.getByText('Test taken 2024-07-08')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(
			<SerumElectrolytesChart date="2024-07-08" chartData={mockData} />
		);
		expect(screen.getByText('sodium')).toBeInTheDocument();
		expect(screen.getByText('chloride')).toBeInTheDocument();
		expect(screen.getByText('potassium')).toBeInTheDocument();
	});
});

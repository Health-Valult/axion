import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChartContainer, useChart, ChartTooltip } from './chart1';

const mockConfig = {
	test: {
		label: 'Test Label',
		color: '#000000',
	},
};

describe('ChartContainer', () => {
	it('renders without crashing', () => {
		render(
			<ChartContainer config={mockConfig}>
				<div>Test Chart</div>
			</ChartContainer>
		);
		expect(screen.getByText('Test Chart')).toBeInTheDocument();
	});

	it('renders chart container with config', () => {
		const config = {
			test: {
				label: 'Test Chart',
				color: 'red',
			},
		};

		render(
			<ChartContainer config={config}>
				<div>Chart Content</div>
			</ChartContainer>
		);

		expect(screen.getByText('Chart Content')).toBeInTheDocument();
	});
});

describe('useChart', () => {
	it('throws error when used outside ChartContainer', () => {
		const TestComponent = () => {
			useChart();
			return null;
		};
		expect(() => render(<TestComponent />)).toThrow(
			'useChart must be used within a <ChartContainer />'
		);
	});
});

describe('ChartTooltip', () => {
	it('renders without crashing', () => {
		render(<ChartTooltip />);
		expect(screen.getByRole('tooltip')).toBeInTheDocument();
	});
});

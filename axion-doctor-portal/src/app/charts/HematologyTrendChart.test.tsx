import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HematologyChart from './HematologyTrendChart';

const mockParameters = [
	{
		name: 'Haemoglobin',
		results: [
			{ month: 'January', value: 15 },
			{ month: 'February', value: 14 },
		],
	},
];

describe('HematologyChart', () => {
	it('renders chart title', () => {
		render(<HematologyChart parameters={mockParameters} />);
		expect(screen.getByText('Hematology Trend Charts')).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<HematologyChart parameters={mockParameters} />);
		expect(
			screen.getByText('Select component to view trend chart')
		).toBeInTheDocument();
	});

	it('opens dialog on button click', () => {
		render(<HematologyChart parameters={mockParameters} />);
		const button = screen.getByText('Haemoglobin');
		fireEvent.click(button);
		expect(screen.getByText('Haemoglobin Chart')).toBeInTheDocument();
	});
});

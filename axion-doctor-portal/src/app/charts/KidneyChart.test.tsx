import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KidneyChart from './KidneyChart';

const mockData = [
	{ parameter: 'Creatinine', result: '1.1 mg/dL', normal: '0.6 - 1.3 mg/dL' },
	{
		parameter: 'eGFR',
		result: '85 mL/min/1.73m²',
		normal: '90 - 120 mL/min/1.73m²',
	},
];

describe('KidneyChart', () => {
	it('renders chart title', () => {
		render(<KidneyChart date="2024-10-10" testResults={mockData} />);
		expect(screen.getByText('Urinalysis Overview')).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<KidneyChart date="2024-10-10" testResults={mockData} />);
		expect(screen.getByText('Test taken 2024-10-10')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<KidneyChart date="2024-10-10" testResults={mockData} />);
		expect(screen.getByText('Creatinine')).toBeInTheDocument();
		expect(screen.getByText('eGFR')).toBeInTheDocument();
	});
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LiverFunctionChart from './LiverFunctionChart';

const mockData = [
	{
		parameter: 'Total Protein',
		result: '7.5 g/dL',
		normalRange: '6.4 - 8.3 g/dL',
	},
	{ parameter: 'Albumin', result: '4.0 g/dL', normalRange: '3.5 - 5.0 g/dL' },
];

describe('LiverFunctionChart', () => {
	it('renders chart title', () => {
		render(<LiverFunctionChart date="2024-09-07" testResults={mockData} />);
		expect(screen.getByText('Liver Function Overview')).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<LiverFunctionChart date="2024-09-07" testResults={mockData} />);
		expect(screen.getByText('Test taken 2024-09-07')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<LiverFunctionChart date="2024-09-07" testResults={mockData} />);
		expect(screen.getByText('Total Protein')).toBeInTheDocument();
		expect(screen.getByText('Albumin')).toBeInTheDocument();
	});
});

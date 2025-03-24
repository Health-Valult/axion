import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LipidProfileChart from './LipidProfileChart';

const mockData = [
	{
		month: 'January',
		totalCholesterol: 200,
		LDL: 130,
		HDL: 50,
		triglycerides: 150,
		nonHDL: 150,
		VLDL: 30,
		LDL_HDL: 130 / 50,
		TC_HDL: 200 / 50,
		TG_HDL: 150 / 50,
	},
];

describe('LipidProfileChart', () => {
	it('renders chart title', () => {
		render(<LipidProfileChart chartData={mockData} />);
		expect(
			screen.getByText('Cholesterol Chart (mg/dL)')
		).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<LipidProfileChart chartData={mockData} />);
		expect(screen.getByText('January - January')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<LipidProfileChart chartData={mockData} />);
		expect(screen.getByText('200')).toBeInTheDocument();
		expect(screen.getByText('130')).toBeInTheDocument();
		expect(screen.getByText('50')).toBeInTheDocument();
	});
});

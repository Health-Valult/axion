import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ESRChart from './ESRChart';

const mockData = [{ date: '2024-01-01', wintrobe: 10, westergren: 20 }];

describe('ESRChart', () => {
	it('renders chart title', () => {
		render(<ESRChart chartData={mockData} />);
		expect(
			screen.getByText('Erythrocyte Sedimentation Rate Chart')
		).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<ESRChart chartData={mockData} />);
		expect(screen.getByText('mm for 1st hour')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<ESRChart chartData={mockData} />);
		expect(screen.getByText('Jan 1')).toBeInTheDocument();
	});
});

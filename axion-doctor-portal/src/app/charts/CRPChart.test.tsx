import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CRPChart from './CRPChart';

const mockData = [{ month: 'January', CRP: 15 }];

describe('CRPChart', () => {
	it('renders chart title', () => {
		render(<CRPChart />);
		expect(screen.getByText('C-Reactive Protein')).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<CRPChart />);
		expect(screen.getByText('January - June 2024')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<CRPChart />);
		expect(screen.getByText('Jan')).toBeInTheDocument();
	});
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FastingBloodGlucoseChart from './FastingBloodGlucose';

const mockData = [{ month: 'January', FBG: 95 }];

describe('FastingBloodGlucoseChart', () => {
	it('renders chart title', () => {
		render(<FastingBloodGlucoseChart chartData={mockData} />);
		expect(screen.getByText('Fasting Blood Glucose')).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<FastingBloodGlucoseChart chartData={mockData} />);
		expect(
			screen.getByText('Trend for the last 1 tests')
		).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<FastingBloodGlucoseChart chartData={mockData} />);
		expect(screen.getByText('Normal')).toBeInTheDocument();
	});
});

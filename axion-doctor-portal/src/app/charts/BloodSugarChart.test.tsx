import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BloodSugarChart from './BloodSugarChart';

describe('BloodSugarChart', () => {
	it('renders chart title', () => {
		render(<BloodSugarChart />);
		expect(screen.getByText('Blood Glucose Chart')).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<BloodSugarChart />);
		expect(
			screen.getByText('Normal vs. Actual Values')
		).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<BloodSugarChart />);
		expect(screen.getByText('FBG (mg/dL)')).toBeInTheDocument();
		expect(screen.getByText('PPBG (mg/dL)')).toBeInTheDocument();
	});
});

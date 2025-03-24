import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BloodPressureChart from './BloodPressureChart';

const mockData = [{ month: 'January', systolic: 120, diastolic: 80 }];

describe('BloodPressureChart', () => {
	it('renders chart title', () => {
		render(<BloodPressureChart chartData={mockData} />);
		expect(
			screen.getByText('Blood Pressure Chart (mmHg)')
		).toBeInTheDocument();
	});

	it('renders chart description', () => {
		render(<BloodPressureChart chartData={mockData} />);
		expect(screen.getByText('January - January')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<BloodPressureChart chartData={mockData} />);
		expect(screen.getByText('120')).toBeInTheDocument();
		expect(screen.getByText('80')).toBeInTheDocument();
	});
});

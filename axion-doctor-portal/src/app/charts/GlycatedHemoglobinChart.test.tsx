import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlycatedHemoglobinChart from './GlycatedHemoglobinChart';

const mockData = [{ month: 'January', hba1c: 5.5 }];

describe('GlycatedHemoglobinChart', () => {
	it('renders chart title', () => {
		render(<GlycatedHemoglobinChart chartData={mockData} />);
		expect(screen.getByText('HbA1c %')).toBeInTheDocument();
	});

	it('renders chart data', () => {
		render(<GlycatedHemoglobinChart chartData={mockData} />);
		expect(screen.getByText('5.5%')).toBeInTheDocument();
	});
});

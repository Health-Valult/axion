import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './page';

describe('Dashboard', () => {
	it('renders summary component', () => {
		render(<Dashboard />);
		expect(screen.getByText('Summary')).toBeInTheDocument();
	});

	it('renders ESR chart', () => {
		render(<Dashboard />);
		expect(
			screen.getByText('Erythrocyte Sedimentation Rate Chart')
		).toBeInTheDocument();
	});

	it('renders Hematology Trends chart', () => {
		render(<Dashboard />);
		expect(screen.getByText('Hematology Trend Charts')).toBeInTheDocument();
	});

	it('renders Glycated Hemoglobin chart', () => {
		render(<Dashboard />);
		expect(screen.getByText('HbA1c %')).toBeInTheDocument();
	});

	it('renders Serum Electrolytes chart', () => {
		render(<Dashboard />);
		expect(
			screen.getByText('Serum Electrolytes Chart')
		).toBeInTheDocument();
	});

	it('renders CRP chart', () => {
		render(<Dashboard />);
		expect(screen.getByText('C-Reactive Protein')).toBeInTheDocument();
	});

	it('renders Lipid Profile chart', () => {
		render(<Dashboard />);
		expect(
			screen.getByText('Cholesterol Chart (mg/dL)')
		).toBeInTheDocument();
	});

	it('renders Fasting Blood Glucose chart', () => {
		render(<Dashboard />);
		expect(screen.getByText('Fasting Blood Glucose')).toBeInTheDocument();
	});

	it('renders Blood Pressure chart', () => {
		render(<Dashboard />);
		expect(
			screen.getByText('Blood Pressure Chart (mmHg)')
		).toBeInTheDocument();
	});

	it('renders Kidney chart', () => {
		render(<Dashboard />);
		expect(screen.getByText('Kidney Chart')).toBeInTheDocument();
	});

	it('renders Liver Function Test chart', () => {
		render(<Dashboard />);
		expect(screen.getByText('Liver Function Overview')).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		const { container } = render(<Dashboard />);
		expect(container).toBeInTheDocument();
	});

	it('should display loading indicator when data is loading', () => {
		const { getByText } = render(<Dashboard />);
		expect(getByText('Loading...')).toBeInTheDocument();
	});

	it('should display error message when there is an error', () => {
		const { getByText } = render(<Dashboard />);
		expect(getByText('Error loading data')).toBeInTheDocument();
	});

	it('should render charts when data is loaded', () => {
		const { getByText } = render(<Dashboard />);
		expect(getByText('ESR Chart')).toBeInTheDocument();
		expect(getByText('Hematology Trends Chart')).toBeInTheDocument();
		expect(getByText('Lipid Profile Chart')).toBeInTheDocument();
	});
});

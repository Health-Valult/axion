import React from 'react';
import { render } from '@testing-library/react';
import Summary from './Summary';

const mockPatientData = [
	{
		title: 'Chief Complaint',
		description: 'Chest pain for 3 days',
	},
	// ...other mock data...
];

describe('Summary Component', () => {
	it('renders patient name, age, and gender correctly', () => {
		const { getByText } = render(
			<Summary
				name="John Doe"
				age={45}
				gender="Male"
				patientData={mockPatientData}
			/>
		);
		expect(getByText('John Doe (45)')).toBeInTheDocument();
		expect(getByText('Patient Summary')).toBeInTheDocument();
	});

	it('renders patient data sections correctly', () => {
		const { getByText } = render(
			<Summary
				name="John Doe"
				age={45}
				gender="Male"
				patientData={mockPatientData}
			/>
		);
		expect(getByText('Chief Complaint')).toBeInTheDocument();
		expect(getByText('Chest pain for 3 days')).toBeInTheDocument();
	});
});

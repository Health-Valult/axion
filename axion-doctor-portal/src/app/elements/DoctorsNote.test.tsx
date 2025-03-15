import React from 'react';
import { render } from '@testing-library/react';
import { DoctorsNote } from './DoctorsNote';

const mockTreatment = ['Metformin', 'Lisinopril'];

describe('DoctorsNote Component', () => {
	it('renders physician name correctly', () => {
		const { getByPlaceholderText } = render(
			<DoctorsNote
				name="Dr. Smith"
				dateTime="2023-10-10T10:00:00Z"
				indication="Hypertension"
				content="Patient needs to monitor blood pressure daily."
				treatment={mockTreatment}
			/>
		);
		expect(getByPlaceholderText('Dr. Smith')).toBeInTheDocument();
	});

	it('renders indication and content correctly', () => {
		const { getByText } = render(
			<DoctorsNote
				name="Dr. Smith"
				dateTime="2023-10-10T10:00:00Z"
				indication="Hypertension"
				content="Patient needs to monitor blood pressure daily."
				treatment={mockTreatment}
			/>
		);
		expect(getByText('Hypertension')).toBeInTheDocument();
		expect(
			getByText('Patient needs to monitor blood pressure daily.')
		).toBeInTheDocument();
	});
});

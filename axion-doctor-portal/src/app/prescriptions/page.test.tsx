import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Prescriptions from './page';

describe('Prescriptions Component', () => {
	it('renders the component', () => {
		render(<Prescriptions />);
		expect(screen.getByText('Prescribed Date')).toBeInTheDocument();
		expect(screen.getByText('Indication')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Enter patient's diagnosis")
		).toBeInTheDocument();
		expect(screen.getByText('Prescribe')).toBeInTheDocument();
		expect(screen.getByText('Reset')).toBeInTheDocument();
	});

	it('allows selecting an indication', () => {
		render(<Prescriptions />);
		const diagnosisRadio = screen.getByLabelText('Diagnosis');
		fireEvent.click(diagnosisRadio);
		expect(diagnosisRadio).toBeChecked();
	});

	it('allows adding a medicine', () => {
		render(<Prescriptions />);
		const input = screen.getByPlaceholderText('Start typing...');
		fireEvent.change(input, { target: { value: 'Paracetamol 500mg' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
		expect(screen.getByText('Paracetamol 500mg')).toBeInTheDocument();
	});

	it('allows removing a selected medicine', () => {
		render(<Prescriptions />);
		const input = screen.getByPlaceholderText('Start typing...');
		fireEvent.change(input, { target: { value: 'Paracetamol 500mg' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
		const chip = screen.getByText('Paracetamol 500mg');
		fireEvent.click(chip.querySelector('button'));
		expect(chip).not.toBeInTheDocument();
	});

	it('submits the form with correct data', () => {
		render(<Prescriptions />);
		const diagnosisRadio = screen.getByLabelText('Diagnosis');
		fireEvent.click(diagnosisRadio);
		const input = screen.getByPlaceholderText('Start typing...');
		fireEvent.change(input, { target: { value: 'Paracetamol 500mg' } });
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
		const submitButton = screen.getByText('Prescribe');
		fireEvent.click(submitButton);
		// Add assertions to check if the form data is submitted correctly
	});
});

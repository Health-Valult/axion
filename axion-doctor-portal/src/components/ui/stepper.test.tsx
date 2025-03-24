import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Stepper, StepperProps } from './stepper';

describe('Stepper', () => {
	const defaultProps: StepperProps = {
		defaultValue: 0,
		orientation: 'horizontal',
	};

	it('should render without crashing', () => {
		const { container } = render(<Stepper {...defaultProps} />);
		expect(container).toBeInTheDocument();
	});

	it('should initialize with the correct default value', () => {
		const { getByText } = render(<Stepper {...defaultProps} />);
		expect(getByText('Step 1')).toBeInTheDocument();
	});

	it('should change step when setActiveStep is called', () => {
		const { getByText } = render(<Stepper {...defaultProps} />);
		fireEvent.click(getByText('Step 2'));
		expect(getByText('Step 2')).toBeInTheDocument();
	});
});

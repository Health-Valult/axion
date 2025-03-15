import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from '@/app/signup/page';

describe('SignUp', () => {
	it('should render without crashing', () => {
		const { container } = render(<SignUp />);
		expect(container).toBeInTheDocument();
	});

	it('should display validation errors for invalid inputs', () => {
		const { getByLabelText, getByText } = render(<SignUp />);
		fireEvent.change(getByLabelText('Full Name'), {
			target: { value: '' },
		});
		fireEvent.change(getByLabelText('Email'), {
			target: { value: 'invalid-email' },
		});
		fireEvent.click(getByText('Submit'));
		expect(
			getByText('Name must be at least 2 characters')
		).toBeInTheDocument();
		expect(getByText('Invalid email address')).toBeInTheDocument();
	});

	it('should submit the form with valid inputs', () => {
		const { getByLabelText, getByText } = render(<SignUp />);
		fireEvent.change(getByLabelText('Full Name'), {
			target: { value: 'John Doe' },
		});
		fireEvent.change(getByLabelText('Email'), {
			target: { value: 'john@example.com' },
		});
		fireEvent.click(getByText('Submit'));
		expect(getByText('Form submitted successfully')).toBeInTheDocument();
	});
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './input';

describe('Input', () => {
	it('renders without crashing', () => {
		render(<Input placeholder="Enter text" />);
		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	it('accepts input value', () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByPlaceholderText('Enter text');
		fireEvent.change(input, { target: { value: 'Hello' } });
		expect(input).toHaveValue('Hello');
	});
});

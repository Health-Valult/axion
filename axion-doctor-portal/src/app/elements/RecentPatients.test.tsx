import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentPatients from './RecentPatients';

describe('RecentPatients Component', () => {
	it('renders the title correctly', () => {
		const { getByText } = render(<RecentPatients />);
		expect(getByText('Recent Patient Checkups')).toBeInTheDocument();
	});

	it('renders patient names correctly', () => {
		const { getByText } = render(<RecentPatients />);
		expect(getByText('John Doe')).toBeInTheDocument();
		expect(getByText('Jane Smith')).toBeInTheDocument();
	});
});

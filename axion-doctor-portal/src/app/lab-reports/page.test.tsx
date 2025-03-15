import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportsPage from './page';

describe('ReportsPage', () => {
	it('renders report cards', () => {
		render(<ReportsPage />);
		expect(
			screen.getByText('Complete Blood Count (CBC)')
		).toBeInTheDocument();
		expect(screen.getByText('Lipid Profile Report')).toBeInTheDocument();
	});

	it('opens modal on report card click', () => {
		render(<ReportsPage />);
		fireEvent.click(screen.getByText('Complete Blood Count (CBC)'));
		expect(screen.getByText('PDF Report')).toBeInTheDocument();
	});

	it('closes modal on close button click', () => {
		render(<ReportsPage />);
		fireEvent.click(screen.getByText('Complete Blood Count (CBC)'));
		fireEvent.click(screen.getByText('✖'));
		expect(screen.queryByText('PDF Report')).not.toBeInTheDocument();
	});
});

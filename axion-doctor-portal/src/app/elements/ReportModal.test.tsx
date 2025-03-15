import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportModal from './ReportModal';

const mockReport = {
	id: 1,
	name: 'Test Report',
	date: '2024-01-01',
	fileUrl: '/test-report.pdf',
};

describe('ReportModal', () => {
	it('renders report details', () => {
		render(<ReportModal report={mockReport} onClose={jest.fn()} />);
		expect(screen.getByText('Test Report')).toBeInTheDocument();
		expect(screen.getByText('1/1/2024')).toBeInTheDocument();
	});

	it('calls onClose when close button is clicked', () => {
		const onClose = jest.fn();
		render(<ReportModal report={mockReport} onClose={onClose} />);
		fireEvent.click(screen.getByText('✖'));
		expect(onClose).toHaveBeenCalled();
	});
});

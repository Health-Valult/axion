import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReportCard from './ReportCard';

const mockReport = {
	id: 1,
	name: 'Test Report',
	date: '2024-01-01',
	fileUrl: '/test-report.pdf',
	thumbnail: '/test-thumbnail.jpg',
};

describe('ReportCard', () => {
	it('renders report details', () => {
		render(<ReportCard report={mockReport} onClick={jest.fn()} />);
		expect(screen.getByText('Test Report')).toBeInTheDocument();
		expect(screen.getByText('1/1/2024')).toBeInTheDocument();
	});

	it('calls onClick when card is clicked', () => {
		const onClick = jest.fn();
		render(<ReportCard report={mockReport} onClick={onClick} />);
		fireEvent.click(screen.getByText('Test Report'));
		expect(onClick).toHaveBeenCalledWith('/test-report.pdf');
	});
});

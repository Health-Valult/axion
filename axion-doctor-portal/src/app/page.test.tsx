import React from 'react';
import { render } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
	it('should render without crashing', () => {
		const { container } = render(<Page />);
		expect(container).toBeInTheDocument();
	});

	it('should display welcome message', () => {
		const { getByText } = render(<Page />);
		expect(getByText('Welcome Dr. John Doe')).toBeInTheDocument();
	});

	it('should render RecentPatients component', () => {
		const { getByText } = render(<Page />);
		expect(getByText('Recent Patients')).toBeInTheDocument();
	});
});

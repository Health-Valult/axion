import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Command, CommandDialog, CommandInput } from './command';

describe('Command', () => {
	it('should render without crashing', () => {
		const { container } = render(<Command />);
		expect(container).toBeInTheDocument();
	});

	it('should open and close the command dialog', () => {
		const { getByText, queryByText } = render(
			<CommandDialog>
				<CommandInput placeholder="Search..." />
			</CommandDialog>
		);
		expect(queryByText('Search...')).toBeNull();
		fireEvent.click(getByText('Open Command'));
		expect(getByText('Search...')).toBeInTheDocument();
		fireEvent.click(getByText('Close Command'));
		expect(queryByText('Search...')).toBeNull();
	});
});

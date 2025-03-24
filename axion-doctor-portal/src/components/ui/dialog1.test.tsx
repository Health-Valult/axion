import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dialog, { DialogTrigger, DialogContent } from './dialog1';

describe('Dialog', () => {
	it('renders without crashing', () => {
		render(
			<Dialog>
				<DialogTrigger>
					<button>Open Dialog</button>
				</DialogTrigger>
				<DialogContent>
					<div>Dialog Content</div>
				</DialogContent>
			</Dialog>
		);
		expect(screen.getByText('Open Dialog')).toBeInTheDocument();
	});

	it('opens and closes the dialog', () => {
		render(
			<Dialog>
				<DialogTrigger>
					<button>Open Dialog</button>
				</DialogTrigger>
				<DialogContent>
					<div>Dialog Content</div>
				</DialogContent>
			</Dialog>
		);

		const openButton = screen.getByText('Open Dialog');
		fireEvent.click(openButton);
		expect(screen.getByText('Dialog Content')).toBeInTheDocument();
		fireEvent.click(openButton);
		expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
	});
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClientSideNavTracker } from './ClientSideNavTracker';

describe('ClientSideNavTracker', () => {
	it('renders children when not on login or signup page', () => {
		render(
			<ClientSideNavTracker initialShowSidebar={true}>
				<div>Test Child</div>
			</ClientSideNavTracker>
		);
		expect(screen.getByText('Test Child')).toBeInTheDocument();
	});

	it('does not render sidebar on login page', () => {
		render(
			<ClientSideNavTracker initialShowSidebar={false}>
				<div>Test Child</div>
			</ClientSideNavTracker>
		);
		expect(screen.getByText('Test Child')).toBeInTheDocument();
	});
});

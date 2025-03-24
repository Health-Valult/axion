import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from './layout';

describe('RootLayout', () => {
	it('renders children', () => {
		render(
			<RootLayout>
				<div>Test Child</div>
			</RootLayout>
		);
		expect(screen.getByText('Test Child')).toBeInTheDocument();
	});

	it('renders Toaster component', () => {
		render(
			<RootLayout>
				<div>Test Child</div>
			</RootLayout>
		);
		expect(screen.getByRole('alert')).toBeInTheDocument();
	});
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Drawer, { DrawerTrigger, DrawerContent } from './drawer';

describe('Drawer', () => {
	it('renders without crashing', () => {
		render(
			<Drawer>
				<DrawerTrigger>
					<button>Open Drawer</button>
				</DrawerTrigger>
				<DrawerContent>
					<div>Drawer Content</div>
				</DrawerContent>
			</Drawer>
		);
		expect(screen.getByText('Open Drawer')).toBeInTheDocument();
	});

	it('opens and closes the drawer', () => {
		render(
			<Drawer>
				<DrawerTrigger>
					<button>Open Drawer</button>
				</DrawerTrigger>
				<DrawerContent>
					<div>Drawer Content</div>
				</DrawerContent>
			</Drawer>
		);

		const openButton = screen.getByText('Open Drawer');
		fireEvent.click(openButton);
		expect(screen.getByText('Drawer Content')).toBeInTheDocument();
		fireEvent.click(openButton);
		expect(screen.queryByText('Drawer Content')).not.toBeInTheDocument();
	});
});

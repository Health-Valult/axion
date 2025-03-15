import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SidebarProvider, useSidebar } from './sidebar';

describe('Sidebar', () => {
	const TestComponent = () => {
		const { open, setOpen } = useSidebar();
		return (
			<div>
				<button onClick={() => setOpen(!open)}>Toggle Sidebar</button>
				{open && <div>Sidebar Content</div>}
			</div>
		);
	};

	it('should render without crashing', () => {
		const { container } = render(
			<SidebarProvider>
				<TestComponent />
			</SidebarProvider>
		);
		expect(container).toBeInTheDocument();
	});

	it('should toggle sidebar visibility', () => {
		const { getByText, queryByText } = render(
			<SidebarProvider>
				<TestComponent />
			</SidebarProvider>
		);
		expect(queryByText('Sidebar Content')).toBeNull();
		fireEvent.click(getByText('Toggle Sidebar'));
		expect(getByText('Sidebar Content')).toBeInTheDocument();
		fireEvent.click(getByText('Toggle Sidebar'));
		expect(queryByText('Sidebar Content')).toBeNull();
	});
});

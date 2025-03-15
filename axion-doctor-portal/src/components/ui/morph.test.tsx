import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
	MorphingPopover,
	MorphingPopoverTrigger,
	MorphingPopoverContent,
} from './morph';

describe('MorphingPopover', () => {
	it('should render without crashing', () => {
		const { container } = render(
			<MorphingPopover>
				<MorphingPopoverTrigger>Open</MorphingPopoverTrigger>
				<MorphingPopoverContent>Content</MorphingPopoverContent>
			</MorphingPopover>
		);
		expect(container).toBeInTheDocument();
	});

	it('should open and close the popover', () => {
		const { getByText, queryByText } = render(
			<MorphingPopover>
				<MorphingPopoverTrigger>Open</MorphingPopoverTrigger>
				<MorphingPopoverContent>Content</MorphingPopoverContent>
			</MorphingPopover>
		);
		expect(queryByText('Content')).toBeNull();
		fireEvent.click(getByText('Open'));
		expect(getByText('Content')).toBeInTheDocument();
		fireEvent.click(getByText('Open'));
		expect(queryByText('Content')).toBeNull();
	});
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { AsyncSelect, AsyncSelectProps } from './async-select';

const mockFetcher = jest.fn().mockResolvedValue([
	{ value: '1', label: 'Option 1' },
	{ value: '2', label: 'Option 2' },
]);

describe('AsyncSelect', () => {
	const defaultProps: AsyncSelectProps<{ value: string; label: string }> = {
		fetcher: mockFetcher,
		renderOption: (option) => <div>{option.label}</div>,
		getOptionValue: (option) => option.value,
		getDisplayValue: (option) => option.label,
		value: '',
		onChange: jest.fn(),
		label: 'Test Select',
	};

	it('should render without crashing', () => {
		const { container } = render(<AsyncSelect {...defaultProps} />);
		expect(container).toBeInTheDocument();
	});

	it('should fetch options on mount', async () => {
		render(<AsyncSelect {...defaultProps} />);
		await waitFor(() => expect(mockFetcher).toHaveBeenCalled());
	});

	it('should display options when opened', async () => {
		const { getByRole, getByText } = render(
			<AsyncSelect {...defaultProps} />
		);
		fireEvent.click(getByRole('combobox'));
		await waitFor(() => expect(getByText('Option 1')).toBeInTheDocument());
		expect(getByText('Option 2')).toBeInTheDocument();
	});

	it('should call onChange when an option is selected', async () => {
		const { getByRole, getByText } = render(
			<AsyncSelect {...defaultProps} />
		);
		fireEvent.click(getByRole('combobox'));
		await waitFor(() => expect(getByText('Option 1')).toBeInTheDocument());
		fireEvent.click(getByText('Option 1'));
		expect(defaultProps.onChange).toHaveBeenCalledWith('1');
	});
});

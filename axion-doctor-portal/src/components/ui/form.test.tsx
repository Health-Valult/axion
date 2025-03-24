import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form, {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from './form';
import { useForm } from 'react-hook-form';

describe('Form', () => {
	it('renders without crashing', () => {
		const { control } = useForm();
		render(
			<Form>
				<FormField control={control} name="test">
					<FormItem>
						<FormLabel>Test</FormLabel>
						<FormControl>
							<input />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</Form>
		);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});

	it('displays error message', () => {
		const { control } = useForm({
			defaultValues: { test: '' },
			mode: 'onChange',
		});
		render(
			<Form>
				<FormField control={control} name="test">
					<FormItem>
						<FormLabel>Test</FormLabel>
						<FormControl>
							<input />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</Form>
		);
		const input = screen.getByLabelText('Test');
		fireEvent.change(input, { target: { value: '' } });
		expect(screen.getByText('This field is required')).toBeInTheDocument();
	});
});

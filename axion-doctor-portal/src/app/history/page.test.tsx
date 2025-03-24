import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import History from './page';
import { RootState } from '../store/store';

const mockStore = configureStore([]);
const initialState: RootState = {
	// ...existing state...
	patient: {
		state: {
			medicalHistory: [
				{
					id: 1,
					name: 'Dr. Smith',
					dateTime: '2022-11-07T00:45[America/Los_Angeles]',
					indication: 'symptoms/signs',
					content: 'Patient has a mild fever.',
					treatment: ['Paracetamol', 'Rest'],
				},
				// ...more mock data...
			],
		},
	},
	// ...existing state...
};

describe('History Component', () => {
	let store;

	beforeEach(() => {
		store = mockStore(initialState);
	});

	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<History />
			</Provider>
		);
		expect(
			screen.getByText(/symptoms\/signs by Dr. Smith/i)
		).toBeInTheDocument();
	});

	it('displays the correct number of paginated notes', () => {
		render(
			<Provider store={store}>
				<History />
			</Provider>
		);
		expect(
			screen.getAllByRole('button', { name: /Accordion/i })
		).toHaveLength(9);
	});

	it('changes page when pagination is clicked', () => {
		render(
			<Provider store={store}>
				<History />
			</Provider>
		);
		const nextPageButton = screen.getByRole('button', { name: /2/i });
		fireEvent.click(nextPageButton);
		expect(
			screen.getByText(/symptoms\/signs by Dr. Smith/i)
		).toBeInTheDocument();
	});
});

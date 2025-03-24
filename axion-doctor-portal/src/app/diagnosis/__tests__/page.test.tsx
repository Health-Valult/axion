import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Diagnosis from '../page';
import { RootState } from '../../store/store';

const mockStore = configureStore([]);
const initialState: RootState = {
	// ...mock initial state...
	patient: {
		state: {
			diagnosedAilments: [
				{
					disease: 'Hypertension',
					currentMedication: 'Medication A',
					// ...other properties...
				},
				{
					disease: 'Diabetes',
					currentMedication: 'Medication B',
					// ...other properties...
				},
			],
		},
	},
};

describe('Diagnosis Page', () => {
	let store;

	beforeEach(() => {
		store = mockStore(initialState);
	});

	it('should render without crashing', () => {
		const { container } = render(
			<Provider store={store}>
				<Diagnosis />
			</Provider>
		);
		expect(container).toBeInTheDocument();
	});

	it('should display the correct title', () => {
		const { getByText } = render(
			<Provider store={store}>
				<Diagnosis />
			</Provider>
		);
		expect(getByText('Diagnosed Chronic Conditions')).toBeInTheDocument();
	});

	it('should render the correct number of AccordionItems', () => {
		const { getAllByRole } = render(
			<Provider store={store}>
				<Diagnosis />
			</Provider>
		);
		const items = getAllByRole('button', { name: /Hypertension|Diabetes/ });
		expect(items).toHaveLength(2);
	});

	it('should display the correct medication for each illness', () => {
		const { getByText } = render(
			<Provider store={store}>
				<Diagnosis />
			</Provider>
		);
		expect(getByText('Medication A')).toBeInTheDocument();
		expect(getByText('Medication B')).toBeInTheDocument();
	});
});

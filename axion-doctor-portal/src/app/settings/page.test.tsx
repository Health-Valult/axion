import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditProfilePage from './page';

describe('EditProfilePage', () => {
	it('should render without crashing', () => {
		const { container } = render(<EditProfilePage />);
		expect(container).toBeInTheDocument();
	});

	it('should toggle theme', () => {
		const { getByText } = render(<EditProfilePage />);
		const themeButton = getByText('light');
		fireEvent.click(themeButton);
		expect(getByText('dark')).toBeInTheDocument();
		fireEvent.click(themeButton);
		expect(getByText('light')).toBeInTheDocument();
	});

	it('should open and close the edit profile dialog', () => {
		const { getByText, queryByText } = render(<EditProfilePage />);
		const editButton = getByText('Edit Profile');
		fireEvent.click(editButton);
		expect(getByText('Edit Profile')).toBeInTheDocument();
		fireEvent.click(getByText('Close'));
		expect(queryByText('Edit Profile')).toBeNull();
	});
});

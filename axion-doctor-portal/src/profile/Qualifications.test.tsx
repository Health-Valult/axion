import { render, screen } from '@testing-library/react';
import { EducationTimeline } from './Qualifications';
import '@testing-library/jest-dom';

const mockEducation = [
	{
		degree: 'Bachelor of Science',
		institution: 'University of Example',
		year: '2020',
		description: 'Graduated with honors',
	},
	{
		degree: 'Master of Science',
		institution: 'Example Institute of Technology',
		year: '2022',
	},
];

describe('EducationTimeline', () => {
	it('renders the component with education data', () => {
		render(<EducationTimeline education={mockEducation} />);

		expect(screen.getByText('Qualifications')).toBeInTheDocument();
		expect(screen.getByText('Bachelor of Science')).toBeInTheDocument();
		expect(screen.getByText('University of Example')).toBeInTheDocument();
		expect(screen.getByText('2020')).toBeInTheDocument();
		expect(screen.getByText('Graduated with honors')).toBeInTheDocument();
		expect(screen.getByText('Master of Science')).toBeInTheDocument();
		expect(
			screen.getByText('Example Institute of Technology')
		).toBeInTheDocument();
		expect(screen.getByText('2022')).toBeInTheDocument();
	});

	it('renders without crashing when description is missing', () => {
		const { container } = render(
			<EducationTimeline education={mockEducation} />
		);
		expect(container).toBeInTheDocument();
	});
});

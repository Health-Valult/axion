import '@testing-library/jest-dom';

jest.mock('lucide-react', () => ({
	__esModule: true,
	...jest.requireActual('lucide-react'),
}));

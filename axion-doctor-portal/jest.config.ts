import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig: Config = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testEnvironment: 'jest-environment-jsdom',

	// ✅ Fix path alias issues
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},

	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};

export default createJestConfig(customJestConfig);

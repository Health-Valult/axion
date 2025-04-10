module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/(?!lucide-react)/"
    ],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node', 'mjs'],
};

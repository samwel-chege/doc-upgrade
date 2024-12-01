const nextJest = require('next/jest');

// Create a custom Jest configuration with Next.js settings
const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app directory
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for custom Jest environment
  moduleNameMapper: {
    // Handle module aliases (e.g., @/components)
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom', // Simulate a browser-like environment
};

module.exports = createJestConfig(customJestConfig);

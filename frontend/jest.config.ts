export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.app.json',  // Point to your TypeScript config
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   moduleNameMapper: {
    "\\.module\\.(css|sass|scss)$": "identity-obj-proxy",  // Mock CSS Modules
    "\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",  // Mock plain styles
  },
};

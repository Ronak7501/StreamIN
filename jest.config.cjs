module.exports = {
  setupFilesAfterEnv: ['./node_modules/@testing-library/jest-dom'],
  transformIgnorePatterns: [
    '/node_modules/', // Default ignore pattern for node_modules
    '\\.css$', // Ignore CSS files
  ],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Set the test environment
  testEnvironment: 'jsdom',
};

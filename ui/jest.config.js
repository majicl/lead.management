module.exports = {
    verbose: true,
    automock: false,
    globals: {
      NODE_ENV: 'test'
    },
    transform: {
      '\\.[jt]sx?$': 'babel-jest'
    },
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
    testURL: 'http://localhost',
    moduleNameMapper: {
      '~(.*)$': '<rootDir>/src/components/$1',
      '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
    }
  };
  
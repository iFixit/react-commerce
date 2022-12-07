module.exports = {
   moduleDirectories: ['node_modules', '<rootDir>/'],
   moduleNameMapper: {
      // Handle CSS imports (with CSS modules)
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      // Handle image imports
      '\\.(gif|ttf|jpeg|eot|svg|png)$':
         '<rootDir>/tests/jest/__mocks__/fileMock.js',
      // Handle module aliases
      '@components(.+)': '<rootDir>/components/$1',
      '@templates(.+)': '<rootDir>/templates/$1',
      '@helpers(.+)': '<rootDir>/helpers/$1',
      '@config(.+)': '<rootDir>/config/$1',
      '@lib(.+)': '<rootDir>/lib/$1',
   },
   setupFilesAfterEnv: ['<rootDir>/tests/jest/jest-setup.ts'],
   testPathIgnorePatterns: ['<rootDir>/(node_modules|.next|tests/cypress)/'],
   testEnvironment: 'jsdom',
   transform: {
      '\\.[jt]sx?$': ['babel-jest', { presets: ['next/babel'] }],
   },
   transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
   ],
   watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
   ],
};

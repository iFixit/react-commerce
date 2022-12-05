module.exports = {
   moduleDirectories: ['node_modules', '<rootDir>/'],
   moduleNameMapper: {
      // Handle CSS imports (with CSS modules)
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      // Handle image imports
      '\\.(gif|ttf|jpeg|eot|svg|png)$':
         '<rootDir>/test/jest/__mocks__/fileMock.js',
      // Handle module aliases
      '@assets(.+)': '<rootDir>/assets/$1',
      '@components(.+)': '<rootDir>/components/$1',
      '@templates(.+)': '<rootDir>/templates/$1',
      '@helpers(.+)': '<rootDir>/helpers/$1',
      '@config(.+)': '<rootDir>/config/$1',
      '@layouts(.+)': '<rootDir>/layouts/$1',
      '@lib(.+)': '<rootDir>/lib/$1',
      '@models(.+)': '<rootDir>/models/$1',
      '@public(.+)': '<rootDir>/public/$1',
   },
   setupFilesAfterEnv: ['<rootDir>/test/jest/jest-setup.ts'],
   testPathIgnorePatterns: ['<rootDir>/(node_modules|.next|test/cypress)/'],
   testEnvironment: 'jsdom',
   transform: {
      '\\.[jt]sx?$': ['babel-jest', { presets: ['next/babel'] }],
      '.+\\.(css|style|less|sass|scss)$': 'jest-css-modules-transform',
   },
   transformIgnorePatterns: [],
   watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
   ],
};

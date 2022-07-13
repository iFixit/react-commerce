module.exports = {
   roots: ['<rootDir>'],
   moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
   testPathIgnorePatterns: [
      '<rootDir>/(node_modules|.next)/',
      '<rootDir>/test/cypress/',
   ],
   testEnvironment: 'jsdom',
   transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
   transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
   },
   watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
   ],
   moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '\\.(gif|ttf|jpeg|eot|svg|png)$':
         '<rootDir>/test/jest/__mocks__/fileMock.js',
      '@components(.+)': '<rootDir>/components/$1',
      '@helpers(.+)': '<rootDir>/helpers/$1',
   },
   moduleDirectories: [
      'node_modules',
      './test/utils', // a utility folder
      __dirname, // the root directory
   ],
   setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
};

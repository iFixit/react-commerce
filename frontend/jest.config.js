const nextJest = require('next/jest');

const createJestConfig = nextJest({
   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
   dir: './',
});

const customJestConfig = {
   moduleDirectories: ['node_modules', '<rootDir>/'],
   moduleNameMapper: {
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
   testPathIgnorePatterns: ['<rootDir>/test/cypress'],
   testEnvironment: 'jsdom',
   transform: {
      '.+\\.(css|style|less|sass|scss)$': 'jest-css-modules-transform',
   },
   transformIgnorePatterns: [],
   watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
   ],
};

const asyncConfig = createJestConfig(customJestConfig);

module.exports = async () => {
   const config = await asyncConfig();
   // next/jest ignores node_modules and allows to add more ignore patterns, but we need to override them fully to whitelist some node_modules or leave as an empty array
   // https://github.com/vercel/next.js/blob/canary/packages/next/build/jest/jest.ts
   config.transformIgnorePatterns = customJestConfig.transformIgnorePatterns;

   return config;
};

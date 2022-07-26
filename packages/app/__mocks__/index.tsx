/**
 * Returns the actual module instead of a mock
 * and only mocks useAppContext().
 */

const app = jest.requireActual('../index.tsx');

function useAppContext() {
   return {
      relativeIfixitOrigin: 'https://www.cominor.com',
      absoluteIfixitOrigin: 'https://www.cominor.com',
   };
}

app.useAppContext = useAppContext;
module.exports = app;

export {};

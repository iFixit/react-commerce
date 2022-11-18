// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__add-custom-command

declare namespace Cypress {
   interface Chainable {
      isWithinViewport(): Chainable<JQuery<HTMLElement>>;
      /**
       * This command simulates the behavior of a foor loop in a way that is compatible with Cypress asyncronous commands.
       * Read more here https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Avoid-loops
       * @param {number} times
       * @param {(index: number) => void} callback
       */
      times(times: number, callback: (index: number) => void): Chainable;
      loadCollectionPageByPath(path: string): Chainable;
      loadProductPageByPath(path: string): Chainable;
      interceptLogin(discount_tier?: string): Chainable;
   }
}

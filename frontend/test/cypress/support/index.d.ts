// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__add-custom-command

declare namespace Cypress {
   interface Chainable {
      isWithinViewport(): Chainable<JQuery<HTMLElement>>;
      loadCollectionPageByPath(path: string): Chainable;
   }
}

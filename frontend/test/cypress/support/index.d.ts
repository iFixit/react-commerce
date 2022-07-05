// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__add-custom-command

declare namespace Cypress {
    interface Chainable {
        isWithinViewport(element: any): Chainable;
        getBySel(selector: any): Chainable;
    }
}

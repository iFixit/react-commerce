// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
   'isWithinViewport',
   { prevSubject: 'element' },
   (subject: JQuery<HTMLElement>) => {
      cy.window().should((win) => {
         const rightBoundOfWindow = win.innerWidth;
         const bottomBoundOfWindow = win.innerHeight;
         const bounding = subject[0].getBoundingClientRect();

         expect(bounding.top).to.be.at.least(0);
         expect(bounding.left).to.be.at.least(0);
         expect(bounding.right).to.be.lessThan(rightBoundOfWindow);
         expect(bounding.bottom).to.be.lessThan(bottomBoundOfWindow);
      });
   }
);

Cypress.Commands.add('loadCollectionPageByPath', (path: string) => {
   cy.intercept('/1/indexes/**').as('search');
   // Here we stub the user api request so we don't depend on ifixit api
   cy.intercept(
      { method: 'GET', url: '/api/2.0/user' },
      {
         userid: 1,
         algoliaApiKeyProduct: null,
         username: 'john',
         unique_username: 'john123',
      }
   ).as('user-api');
   cy.visit(path);
   cy.wait('@user-api');
   cy.window().its('userLoaded').should('be.true');
});

Cypress.Commands.add('loadProductPageByPath', (path: string) => {
   cy.intercept(
      { method: 'GET', url: '/api/2.0/user' },
      {
         userid: 1,
         algoliaApiKeyProduct: null,
         username: 'john',
         unique_username: 'john123',
      }
   ).as('user-api');
   cy.visit(path);
   cy.wait('@user-api');
});

Cypress.Commands.add('removeItemsFromCartAndCloseDrawer', () => {
   cy.findAllByTestId('cart-drawer-remove-item')
      .wait(500)
      .then((items) => items.trigger('click'))
      .wait(500);
   cy.findAllByTestId('cart-drawer-item-count')
      .invoke('text')
      .then(parseInt)
      .should('eq', 0);
   cy.findByTestId('cart-drawer-quantity').should('not.exist');
   cy.findByTestId('cart-drawer-close').click().wait(500);
   cy.findByTestId('cart-drawer-close').should('not.exist');
});

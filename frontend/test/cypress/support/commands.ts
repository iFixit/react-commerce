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

Cypress.Commands.add('times', (times, callback) => {
   const items = Array.from({ length: times }, (_, i) => i);
   cy.wrap(items).each(callback);
});

Cypress.Commands.add('loadCollectionPageByPath', (path: string) => {
   cy.intercept('/1/indexes/**').as('search');
   cy.interceptLogin();
   cy.visit(path);
   cy.wait('@user-api');
   cy.window().its('userLoaded').should('be.true');
});

Cypress.Commands.add('loadProductPageByPath', (path: string) => {
   cy.interceptLogin();
   cy.visit(path);
   cy.wait('@user-api');
});

Cypress.Commands.add('interceptLogin', (optional?: Object) => {
   let defaultParams = {
      userid: 1,
      algoliaApiKeyProduct: null,
      username: 'john',
      unique_username: 'john123',
   };

   cy.intercept(
      { method: 'GET', url: '/api/2.0/user' },
      {
         ...defaultParams,
         ...optional,
      }
   ).as('user-api');
});

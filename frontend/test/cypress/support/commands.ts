/// <reference path="../support/index.d.ts" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('isWithinViewport', { prevSubject: true }, (selector: any) => {
  cy.window().then((win) => {
    const rightBoundOfWindow =  win.innerWidth;
    const bottomBoundOfWindow =  win.innerHeight;
    const bounding = selector[0].getBoundingClientRect();

    expect(bounding.top).to.be.at.least(0);
    expect(bounding.left).to.be.at.least(0);
    expect(bounding.right).to.be.lessThan(rightBoundOfWindow);
    expect(bounding.bottom).to.be.lessThan(bottomBoundOfWindow);
  });
})

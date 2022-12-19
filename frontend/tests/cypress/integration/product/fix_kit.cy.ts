describe('Fix Kit and Part Only test', () => {
   beforeEach(() => {
      cy.loadProductPageByPath('/products/iphone-6s-plus-replacement-battery');
   });

   it('test kit contents and product skus', () => {
      cy.findByText('Fix Kit').click();
      cy.findByText('Kit contents').should('be.visible');
      cy.findByText('Assembly contents').should('not.be.visible');

      cy.findByTestId('product-sku')
         .should('be.visible')
         .invoke('text')
         .then((fixKitSku) => {
            cy.findByText('Part Only').click();

            cy.findByText('Assembly contents').should('be.visible');
            cy.findByText('Kit contents').should('not.be.visible');

            cy.findByTestId('product-sku')
               .should('be.visible')
               .invoke('text')
               .then((partOnlySku) => {
                  expect(fixKitSku).to.not.equal(partOnlySku);
               });
         });
   });

   it('test product image changes', () => {
      cy.findByText('Fix Kit').click();

      cy.get('img[alt$="Fix Kit"]').should('be.visible');
      cy.get('img[alt$="Part Only"]').should('not.exist');

      cy.findByText('Part Only').click();

      cy.get('img[alt$="Part Only"]').should('be.visible');
      cy.get('img[alt$="Fix Kit"]').should('not.exist');
   });
});
export {};

describe('subscribe to newsletter', () => {
   beforeEach(() => {
      cy.loadCollectionPageByPath('/Parts');
   });

   it('requires an email', () => {
      cy.findByTestId('footer-newsletter-form').within(() => {
         cy.findByText(/please insert a valid email/i).should('not.exist');
         cy.findByRole('button', { name: /subscribe|join/i }).click();
         cy.findByText(/please insert a valid email/i).should('be.visible');
      });
   });

   it('prevents invalid email', () => {
      cy.findByText(/please insert a valid email/i).should('not.exist');
      cy.findByLabelText(/enter your email/i).type('test@example');
      cy.findByRole('button', { name: /subscribe|join/i }).click();
      cy.findByText(/please insert a valid email/i).should('be.visible');
   });

   it('shows confirmation when email is subscribed', () => {
      cy.intercept('/api/2.0/cart/newsletter/subscribe', {
         statusCode: 200,
      });
      cy.findByLabelText(/enter your email/i).type('test@example.com');
      cy.findByRole('button', { name: /subscribe|join/i }).click();
      cy.findByText('Subscribed!').should('be.visible');
      cy.findByTestId('footer-newsletter-subscribe-button').should(
         'not.be.visible'
      );
      cy.findByText(/please insert a valid email/i).should('not.exist');
   });

   it('shows an error when server request fails', () => {
      cy.intercept('/api/2.0/cart/newsletter/subscribe', {
         statusCode: 500,
      });
      cy.findByLabelText(/enter your email/i).type('test@example.com');
      cy.findByRole('button', { name: /subscribe|join/i }).click();
      cy.findByText(/error trying to subscribe to newsletter/i).should(
         'be.visible'
      );
   });
});

export {};

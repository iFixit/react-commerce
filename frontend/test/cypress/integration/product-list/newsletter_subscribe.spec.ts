describe('subscribe to newsletter', () => {
   const user = cy;
   beforeEach(() => {
      user.visit('/Store/Parts');
   });

   it('requires an email', () => {
      user.findByTestId('newsletter-form').within(() => {
         user.findByText(/please insert a valid email/i).should('not.exist');
         user.findByRole('button', { name: /subscribe/i }).click();
         user.findByText(/please insert a valid email/i).should('be.visible');
      });
   });

   it('prevents invalid email', () => {
      user.findByText(/please insert a valid email/i).should('not.exist');
      user.findByLabelText(/enter your email/i).type('test@example');
      user.findByRole('button', { name: /subscribe/i }).click();
      user.findByText(/please insert a valid email/i).should('be.visible');
   });

   it('shows confirmation when email is subscribed', () => {
      cy.intercept('/api/2.0/cart/newsletter/subscribe', {
         statusCode: 200,
      });
      user.findByLabelText(/enter your email/i).type('test@example.com');
      user.findByRole('button', { name: /subscribe/i }).click();
      user
         .findByRole('button', { name: /subscribed/i })
         .should('be.visible')
         .should('be.disabled');
      user.findByText(/please insert a valid email/i).should('not.exist');
   });

   it('shows an error when server request fails', () => {
      cy.intercept('/api/2.0/cart/newsletter/subscribe', {
         statusCode: 500,
      });
      user.findByLabelText(/enter your email/i).type('test@example.com');
      user.findByRole('button', { name: /subscribe/i }).click();
      user
         .findByText(/error trying to subscribe to newsletter/i)
         .should('be.visible');
   });
});

export {};

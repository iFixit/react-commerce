describe('subscribe to newsletter', () => {
   const user = cy;
   beforeEach(() => {
      user.visit('/store/parts');
   });

   it('requires an email', () => {
      user.findByRole('button', { name: /subscribe$/i }).click();
      user
         .findByRole('button', { name: /subscribe$/i })
         .parent('form')
         .contains(/insert a valid email/i);
   });

   it('prevents invalid email', () => {
      user.findByPlaceholderText(/enter your email/i).type('test@example');
      user.findByRole('button', { name: /subscribe$/i }).click();
      user
         .findByRole('button', { name: /subscribe$/i })
         .parent('form')
         .contains(/insert a valid email/i);
   });

   it('shows confirmation when email is subscribed', () => {
      cy.intercept('/api/2.0/cart/newsletter/subscribe', {
         statusCode: 200,
      });
      user.findByPlaceholderText(/enter your email/i).type('test@example.com');
      user.findByRole('button', { name: /subscribe$/i }).click();
      user.findByRole('button', { name: /subscribed/i }).should('exist');
      user
         .findByRole('button', { name: /subscribed/i })
         .parent('form')
         .contains(/insert a valid email/i)
         .should('not.exist');
   });

   it('shows an error when server request fails', () => {
      cy.intercept('/api/2.0/cart/newsletter/subscribe', {
         statusCode: 500,
      });
      user.findByPlaceholderText(/enter your email/i).type('test@example.com');
      user.findByRole('button', { name: /subscribe$/i }).click();
      user
         .findByRole('button', { name: /subscribe$/i })
         .should('exist')
         .parent('form')
         .contains(/insert a valid email/i)
         .should('not.exist');
      user
         .findByRole('button', { name: /subscribe$/i })
         .parent('form')
         .contains(/error/i)
         .should('exist');
   });
});

export {};

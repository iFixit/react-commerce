describe('parts page devices', () => {
   const user = cy;

   beforeEach(() => {
      user.visit('/Parts');
   });

   it('should visit all devices on /Parts page', () => {
      assertVisibleFilterAndProducts();
      assertAvailableProducts();

      const visitPageCount = 4;
      user
         .getBySel('product-list-devices')
         .find('a')
         .each((device, index) => {
            // Only visit few device pages since it will take too long to visit all
            if (index == visitPageCount)
               return false;

            let deviceLink = device.attr('href');
            if (deviceLink) {
               user.visit(deviceLink);
               assertVisibleFilterAndProducts();

               user.visit('/Parts');
               assertVisibleFilterAndProducts();
               // TODO: Call assertAvailableProducts() here when the seed data is updated.
            }
         });
   });

   it('should navigate until the last device page', () => {
      assertVisibleFilterAndProducts();
      assertAvailableProducts();

      user.get('button').contains('Show more').click();
      user.get('a[href="/Parts/Mac"]').click({force: true});

      user.location('pathname', {timeout: 20000}).should('include', '/Parts/Mac');
      user.get('h1').contains('Mac Parts').should('be.visible');

      navigateUntilLastDevice();
      assertVisibleFilterAndProducts();
      assertAvailableProducts();
   });

   function assertVisibleFilterAndProducts() {
      user.getBySel('filterable-products-section').should('be.visible');
      user.getBySel('facets-accordion').scrollIntoView().should('be.visible');
   }

   // Makes sure there are at least 1 product available
   function assertAvailableProducts() {
      user
         .getBySel('list-view-products')
         .children('article')
         .its('length')
         .should('be.gte', 1);
   }

   // Recursively navigate the first device until no sub-devices are left
   function navigateUntilLastDevice() {
      user.get('body').then($body => {
         if ($body.find('[data-testid="product-list-devices"]').length > 0) {   
            user
               .getBySel('product-list-devices')
               .find('a')
               .first()
               .as('device')
               .click();
   
            user.get('@device').should('have.attr', 'href').then((href) => {
               user.location('pathname', {timeout: 20000})
               .should('include', href);
            })
            assertVisibleFilterAndProducts();
            navigateUntilLastDevice();
         }
     });
   }
});

export {};

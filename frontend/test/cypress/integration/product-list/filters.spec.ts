const TEST_MIN_PRICE_INVALID = 100;
const TEST_MIN_PRICE = 10;
const TEST_MAX_PRICE = 50;

describe('product list filters', () => {
   const user = cy;
   beforeEach(() => {
      cy.intercept('/1/indexes/**').as('search');
      user.visit('/Store/Parts');
   });

   function getVirtualListClickOptions(): Partial<Cypress.ClickOptions> {
      return {
         // Cypress won't click the button because it detects that there's a parent
         // element with the pointer-events: none style.
         // Since this it's expected behavior for a virtual list while scrolling (
         // https://github.com/bvaughn/react-window/issues/128#issuecomment-460163077 ),
         // we need to force the click.
         force: true,
      };
   }

   function getVirtualListTypeOptions(): Partial<Cypress.TypeOptions> {
      return {
         // Cypress won't click the button because it detects that there's a parent
         // element with the pointer-events: none style.
         // Since this it's expected behavior for a virtual list while scrolling (
         // https://github.com/bvaughn/react-window/issues/128#issuecomment-460163077 ),
         // we need to force the click.
         force: true,
      };
   }

   function waitForSearchCompletion() {
      user.wait('@search');
   }

   it('should help user filter', () => {
      user
         .findByRole('button', { name: /expand item type/i, expanded: false })
         .click(getVirtualListClickOptions());

      user
         .findByRole('button', { name: /collapse item type/i, expanded: true })
         .should('exist');

      user.findByTestId('accordion-item-panel-item_type').within(() => {
         user
            .findByRole('option', { name: /cables/i })
            .click(getVirtualListClickOptions());
      });

      user.findByTestId('applied-filters').within(() => {
         user.findByText(/item type:\s*cables/i).should('exist');
      });

      waitForSearchCompletion();

      user
         .findByRole('button', { name: /collapse item type/i, expanded: true })
         .click(getVirtualListClickOptions());

      user.wait(500);

      // Assert that the products update according to that filter
      user
         .window()
         .its('filteredProducts')
         .each((product) => {
            cy.wrap(product)
               .its('facet_tags.Item Type')
               .should('satisfy', function isCablesItemType(type: any) {
                  return (
                     (typeof type === 'string' &&
                        type.toLowerCase() === 'cables') ||
                     (Array.isArray(type) &&
                        type.some((t) => t.toLowerCase() === 'cables'))
                  );
               });
         });

      user
         .findByRole('button', { name: /expand device$/i, expanded: false })
         .click(getVirtualListClickOptions());

      user.findByTestId('accordion-item-panel-device').within(() => {
         user
            .findByRole('option', { name: /^iphone$/i })
            .click(getVirtualListClickOptions());
      });

      user.findByTestId('applied-filters').within(() => {
         user.findByText(/device:\s*iphone/i).should('exist');
      });

      waitForSearchCompletion();

      user
         .findByRole('button', { name: /collapse device$/i, expanded: true })
         .click(getVirtualListClickOptions());

      user.wait(500);

      user
         .findByRole('button', {
            name: /expand price range$/i,
            expanded: false,
         })
         .click(getVirtualListClickOptions());

      user
         .findByLabelText(/set min price/i)
         .type(TEST_MIN_PRICE_INVALID.toString(), getVirtualListTypeOptions());

      waitForSearchCompletion();

      user
         .findByLabelText(/set max price/i)
         .type(TEST_MAX_PRICE.toString(), getVirtualListTypeOptions());

      user.findByText(/max should be higher than min/i).should('exist');

      user
         .findByLabelText(/set min price/i)
         .type(
            `{selectall}{backspace}${TEST_MIN_PRICE}`,
            getVirtualListTypeOptions()
         );

      waitForSearchCompletion();

      user
         .findByLabelText(/set max price/i)
         .type(
            `{selectall}{backspace}${TEST_MAX_PRICE}`,
            getVirtualListTypeOptions()
         );

      waitForSearchCompletion();

      user.findByTestId('applied-filters').within(() => {
         user.findByText(/price:/i).should('exist');
      });

      user.findByTestId('filterable-products-section').within(() => {
         // Check that all articles prices are within the range
         user.findAllByTestId('product-price').each((priceEl) => {
            cy.wrap(priceEl)
               .invoke('text')
               .then((priceText) => {
                  const valueMatch = priceText.match(/(\d+\.\d+)/);
                  return valueMatch && valueMatch[0]
                     ? parseFloat(valueMatch[0])
                     : 0;
               })
               .should('be.within', TEST_MIN_PRICE, TEST_MAX_PRICE);
         });
      });

      user.findByRole('button', { name: /remove device:\s*iphone/i }).click();

      user.findByTestId('applied-filters').within(() => {
         user.findByText(/device:\s*iphone/i).should('not.exist');
      });

      waitForSearchCompletion();

      user.findByRole('button', { name: /clear all filters/i }).click();

      user.findByTestId('applied-filters').should('not.exist');
   });
});

export {};

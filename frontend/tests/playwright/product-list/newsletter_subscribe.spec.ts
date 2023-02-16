import { test, expect } from '../test-fixtures';

test.describe('Subscribe to newsletter', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test('Requires an email', async ({ page }) => {
      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).not.toBeVisible();

      await footerNewsletterForm
         .getByRole('button', { name: /subscribe|join/i })
         .click();

      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).toBeVisible();
   });

   test('Prevents invalid email', async ({ page }) => {
      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).not.toBeVisible();

      await footerNewsletterForm
         .getByLabel(/enter your email/i)
         .fill('test@example');
      await footerNewsletterForm
         .getByRole('button', { name: /subscribe|join/i })
         .click();
      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).toBeVisible();
   });

   test('Shows confirmation when email is subscribed', async ({
      page,
      clientRequestHandler,
      rest,
   }) => {
      clientRequestHandler.use(
         rest.post('/api/2.0/cart/newsletter/subscribe', (req, res, ctx) => {
            return res(ctx.status(200));
         })
      );

      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await footerNewsletterForm
         .getByLabel(/enter your email/i)
         .fill('test@example.com');
      await footerNewsletterForm
         .getByRole('button', { name: /subscribe|join/i })
         .click();
      await expect(footerNewsletterForm.getByText('Subscribed!')).toBeVisible();
      await expect(
         footerNewsletterForm.getByTestId('footer-newsletter-subscribe-button')
      ).not.toBeVisible();
      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).not.toBeVisible();
   });

   test('Shows an error when server request fails', async ({
      page,
      clientRequestHandler,
      rest,
   }) => {
      clientRequestHandler.use(
         rest.post('/api/2.0/cart/newsletter/subscribe', (req, res, ctx) => {
            return res(ctx.status(500));
         })
      );

      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await footerNewsletterForm
         .getByLabel(/enter your email/i)
         .fill('test@example.com');

      await footerNewsletterForm
         .getByRole('button', { name: /subscribe|join/i })
         .click();

      await expect(
         footerNewsletterForm.getByText(
            /error trying to subscribe to newsletter/i
         )
      ).toBeVisible();
   });
});

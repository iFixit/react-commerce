import { test, expect } from '../test-fixtures';
import Handler from '../msw/request-handler';

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
      await expect(
         page.getByText(/please insert a valid email/i)
      ).not.toBeVisible();

      await page.getByLabel(/enter your email/i).fill('test@example');
      await page.getByRole('button', { name: /subscribe|join/i }).click();
      await expect(
         page.getByText(/please insert a valid email/i)
      ).toBeVisible();
   });

   test('Shows confirmation when email is subscribed', async ({
      page,
      clientRequestHandler,
   }) => {
      clientRequestHandler.use(
         Handler.create({
            request: {
               endpoint: '/api/2.0/cart/newsletter/subscribe',
               method: 'post',
            },
            response: {
               status: 200,
            },
         })
      );

      await page.getByLabel(/enter your email/i).fill('test@example.com');
      await page.getByRole('button', { name: /subscribe|join/i }).click();
      await expect(page.getByText('Subscribed!')).toBeVisible();
      await expect(
         page.getByTestId('footer-newsletter-subscribe-button')
      ).not.toBeVisible();
      await expect(
         page.getByText(/please insert a valid email/i)
      ).not.toBeVisible();
   });

   test('Shows an error when server request fails', async ({
      page,
      clientRequestHandler,
   }) => {
      clientRequestHandler.use(
         Handler.create({
            request: {
               endpoint: '/api/2.0/cart/newsletter/subscribe',
               method: 'post',
            },
            response: {
               status: 500,
            },
         })
      );

      await page.getByLabel(/enter your email/i).fill('test@example.com');

      await page.getByRole('button', { name: /subscribe|join/i }).click();

      await expect(
         page.getByText(/error trying to subscribe to newsletter/i)
      ).toBeVisible();
   });
});

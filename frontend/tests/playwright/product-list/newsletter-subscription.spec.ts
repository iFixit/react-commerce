import { test, expect } from '../test-fixtures';
import { createRestHandler } from '../msw/request-handler';

test.describe('Newsletter Subscription', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('/Parts');
   });

   test('Email Input Required', async ({ page }) => {
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

   test('Reject Invalid Email Input', async ({ page }) => {
      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).not.toBeVisible();

      await footerNewsletterForm
         .getByTestId('newsletter-email-input')
         .fill('test@example');
      await footerNewsletterForm
         .getByRole('button', { name: /subscribe|join/i })
         .click();
      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).toBeVisible();
   });

   test('Display Success Message Upon Subscription', async ({
      page,
      clientRequestHandler,
   }) => {
      clientRequestHandler.use(
         createRestHandler({
            request: {
               endpoint: '/api/2.0/cart/newsletter/subscribe',
               method: 'post',
            },
            response: {
               status: 200,
            },
         })
      );

      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await expect(page.getByText('Subscribed!')).not.toBeVisible();
      await footerNewsletterForm
         .getByTestId('newsletter-email-input')
         .fill('test@example.com');
      await footerNewsletterForm
         .getByRole('button', { name: /subscribe|join/i })
         .click();
      await expect(page.getByText('Subscribed!')).toBeVisible();
      await expect(
         footerNewsletterForm.getByTestId('footer-newsletter-subscribe-button')
      ).not.toBeVisible();
      await expect(
         footerNewsletterForm.getByText(/please insert a valid email/i)
      ).not.toBeVisible();
   });

   test('Display Error Message for Failed Server Requests', async ({
      page,
      clientRequestHandler,
   }) => {
      clientRequestHandler.use(
         createRestHandler({
            request: {
               endpoint: '/api/2.0/cart/newsletter/subscribe',
               method: 'post',
            },
            response: {
               status: 500,
            },
         })
      );

      const footerNewsletterForm = page.getByTestId('footer-newsletter-form');

      await footerNewsletterForm
         .getByTestId('newsletter-email-input')
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

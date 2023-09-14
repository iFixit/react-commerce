import { test, expect } from './test-fixtures';

test.describe('Login Logout', () => {
   test('Using User Icon Button', async ({ page }) => {
      await page.goto('/Tools');

      // click user icon button and login on cominor
      await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
      await page.getByRole('link', { name: 'Login' }).click();
      await page.waitForURL(`https://www.cominor.com/Login`);
      await page.locator('#email').click();
      await page.locator('#email').fill('test_playwright@ifixit+test.com');
      await page.locator('#password').click();
      await page.locator('#password').fill('testpassword');
      await page.getByRole('button', { name: 'Log In' }).click();

      // navigate back to next.js app
      await page.goto('/Tools');
      // assert login button is not visible when logged in
      await expect(page.getByRole('link', { name: 'Login' })).not.toBeVisible();

      await page.getByRole('button', { name: 'Open user menu' }).click();
      await expect(
         page.getByRole('menuitem', { name: 'Log Out' })
      ).toBeVisible();
      await page.getByRole('menuitem', { name: 'Log Out' }).click();

      await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
      await expect(
         page.getByRole('menuitem', { name: 'Log Out' })
      ).not.toBeVisible();
   });
});

export {};

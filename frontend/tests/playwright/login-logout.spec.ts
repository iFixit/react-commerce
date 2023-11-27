import { test, expect } from './test-fixtures';

test.describe('Login Logout', () => {
   test('Using User Icon Button', async ({ page }) => {
      await page.goto('/Tools');

      // make sure the session cookie does not exist
      const initialCookies = await page.context().cookies();
      const initialSessionCookie = initialCookies.find(
         (cookie) => cookie.name === 'session'
      );
      expect(initialSessionCookie).toBeUndefined();

      // click user icon button and login on cominor
      await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
      await page.getByRole('link', { name: 'Login' }).click();
      await page.waitForURL(`https://www.cominor.com/Login`);
      await page.locator('#email').click();
      await page.locator('#email').fill('test_playwright@ifixit+test.com');
      await page.locator('#password').click();
      await page.locator('#password').fill('testpassword');
      await page.getByRole('button', { name: 'Log In' }).click();

      // on cominor: get session cookie
      const cominorCookies = await page.context().cookies();
      const cominorSession = cominorCookies.find(
         (cookie) => cookie.name === 'session'
      );
      expect(cominorSession).toBeDefined();

      // navigate back to next.js app
      await page.goto('/Tools');
      // assert login button is not visible when logged in
      await expect(page.getByRole('link', { name: 'Login' })).not.toBeVisible();

      // get existing cookies on next.js app and make sure the same session cookie exists
      const cookies = await page.context().cookies();
      const sessionCookie = cookies.find((cookie) => cookie.name === 'session');
      expect(sessionCookie).toBeDefined();
      expect(cominorSession!.value).toEqual(sessionCookie!.value);

      await page.getByRole('button', { name: 'Open user menu' }).click();
      await expect(
         page.getByRole('menuitem', { name: 'Log Out' })
      ).toBeVisible();
      await page.getByRole('menuitem', { name: 'Log Out' }).click();

      // get session cookie value after logout and make sure it is different
      const cookiesAfter = await page.context().cookies();
      const sessionCookieAfter = cookiesAfter.find(
         (cookie) => cookie.name === 'session'
      );
      expect(sessionCookieAfter!.value).not.toEqual(sessionCookie!.value);
      expect(sessionCookieAfter!.value).not.toEqual(cominorSession!.value);

      await page.goto('/Tools');
      await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
      await expect(
         page.getByRole('menuitem', { name: 'Log Out' })
      ).not.toBeVisible();
   });
});

export {};

import cookie from 'cookie';
import crypto from 'crypto';
import type { GetServerSidePropsContext } from 'next';

export type WithCSRFProps<T> = T & {
   csrfToken: string;
};

export function generateCSRFToken(): string {
   return crypto.randomBytes(64).toString('hex');
}

type CSRFCookieInput = {
   csrfToken: string;
   origin: string;
};

export function setCSRFCookie(
   context: GetServerSidePropsContext,
   input: CSRFCookieInput
): void {
   const domain = parseCSRFCookieDomain(input.origin);
   context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('csrf', input.csrfToken, {
         sameSite: 'none',
         secure: true,
         domain,
         maxAge: 30 * 60, // 30 minutes
         path: '/',
      })
   );
}

function parseCSRFCookieDomain(origin: string): string {
   const url = new URL(origin);
   return url.hostname.replace('www.', '');
}

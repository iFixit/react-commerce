import cookie from 'cookie';
import crypto from 'crypto';
import type { GetServerSidePropsContext } from 'next';

export type WithCSRFProps<T> = T & {
   csrfToken: string;
};

export function generateCSRFToken(): string {
   return crypto.randomBytes(64).toString('hex');
}

export function setCSRFCookie(
   context: GetServerSidePropsContext,
   csrfToken: string
): void {
   context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('csrf', csrfToken, {
         sameSite: 'none',
         secure: true,
         domain: 'cominor.com',
         maxAge: 30 * 60, // 30 minutes
         path: '/',
      })
   );
}

import cookie from 'cookie';
import crypto from 'crypto';
import type { GetServerSidePropsContext } from 'next';

type CSRFCookieInput = {
   csrfToken: string;
   origin: string;
};

function parseCSRFCookieDomain(origin: string): string {
   const url = new URL(origin);
   return url.hostname.replace('www.', '');
}

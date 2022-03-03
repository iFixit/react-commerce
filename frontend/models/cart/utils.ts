import { IFIXIT_ORIGIN } from '@config/env';

export const cartKeys = {
   cart: ['cart'],
   checkoutUrl: ['cart', 'checkoutUrl'],
};

export async function fetchAPI(api: string, init?: RequestInit) {
   const response = await fetch(`${IFIXIT_ORIGIN}/api/2.0/${api}`, {
      credentials: 'include',
      ...init,
   });
   if (response.ok) {
      return response;
   }
   throw new Error('unexpected error');
}

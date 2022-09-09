import { invariant } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useQuery } from 'react-query';
import { Cart, CartAPIResponse } from '../types';
import { cartKeys } from '../utils';

/**
 * Get the cart from the API.
 */
export function useCart() {
   return null;
}

function isValidCartPayload(data: any): data is CartAPIResponse {
   return data?.cart != null;
}

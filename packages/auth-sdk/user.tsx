import { invariant, isRecord } from '@ifixit/helpers';
import { IFixitAPIClient, useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useLocalPreference } from '@ifixit/ui';
import { useQuery } from '@tanstack/react-query';

export type User = {
   id: number;
   username: string;
   handle: string | null;
   thumbnail: string | null;
   is_pro: boolean;
   discountTier: string | null;
   algoliaApiKeyProducts: string | null | undefined;
};

const userKeys = {
   user: ['user'],
};

const hasLocalStorage = typeof localStorage !== 'undefined';
const userDataLocalKey = 'user.data';

export function useAuthenticatedUser() {
   const apiClient = useIFixitApiClient();
   const [cachedUserData, setCachedUserData] = useLocalPreference<User | null>(
      userDataLocalKey,
      null
   );
   const query = useQuery(
      userKeys.user,
      () => {
         const responsePromise = fetchAuthenticatedUser(apiClient).catch(
            () => null
         );
         responsePromise
            .then((response) => {
               setCachedUserData(response);
            })
            .catch(() => {});
         return responsePromise;
      },
      {
         retryOnMount: false,
         staleTime: Infinity,
         placeholderData: cachedUserData,
      }
   );

   return query;
}

async function fetchAuthenticatedUser(
   apiClient: IFixitAPIClient
): Promise<User | null> {
   const payload = await apiClient.get('user');
   invariant(isRecord(payload), 'unexpected api response');
   invariant(typeof payload.userid === 'number', 'User ID is not a number');
   invariant(
      payload.algoliaApiKeyProducts === null ||
         payload.algoliaApiKeyProducts === undefined ||
         typeof payload.algoliaApiKeyProducts === 'string',
      'algoliaApiKeyProducts should be a string or null'
   );
   invariant(
      typeof payload.username === 'string',
      'User username is not a string'
   );
   let thumbnailUrl: string | null = null;
   if (isRecord(payload.image) && typeof payload.image.thumbnail === 'string') {
      thumbnailUrl = payload.image.thumbnail;
   }

   const unique_username =
      typeof payload.unique_username == 'string'
         ? payload.unique_username
         : null;

   const discountTier =
      typeof payload.discount_tier === 'string' ? payload.discount_tier : null;

   return {
      id: payload.userid,
      username: payload.username,
      handle: unique_username,
      thumbnail: thumbnailUrl,
      is_pro: discountTier != null,
      algoliaApiKeyProducts: payload.algoliaApiKeyProducts,
      discountTier,
   };
}

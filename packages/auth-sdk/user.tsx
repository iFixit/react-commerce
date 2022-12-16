import { IFixitAPIClient, useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useLocalPreference } from '@ifixit/ui';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export type User = {
   id: number;
   username: string;
   handle: string | null;
   thumbnail: string | null;
   is_pro: boolean;
   discountTier: string | null;
   algoliaApiKeyProducts: string | null | undefined;
   isAdmin: boolean;
};

const userKeys = {
   user: ['user'],
};

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

const UserApiResponseSchema = z.object({
   userid: z.number(),
   username: z.string(),
   unique_username: z.string().optional().nullable(),
   image: z
      .object({
         thumbnail: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
   algoliaApiKeyProducts: z.string().optional().nullable(),
   discount_tier: z.string().optional().nullable(),
   privileges: z.array(z.string()),
});

async function fetchAuthenticatedUser(
   apiClient: IFixitAPIClient
): Promise<User | null> {
   const payload = await apiClient.get('user');
   const userSchema = UserApiResponseSchema.parse(payload);
   return {
      id: userSchema.userid,
      username: userSchema.username,
      handle: userSchema.unique_username ?? null,
      thumbnail: userSchema.image?.thumbnail ?? null,
      is_pro: userSchema.discount_tier != null,
      algoliaApiKeyProducts: userSchema.algoliaApiKeyProducts,
      discountTier: userSchema.discount_tier ?? null,
      isAdmin: userSchema.privileges.includes('Admin'),
   };
}

import { IFixitAPIClient, useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useLocalPreference } from '@ifixit/ui';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export type User = z.infer<typeof AuthenticatedUserSchema>;

const userKeys = {
   user: ['user'],
};

const userDataLocalKey = 'user.data.1';

const AuthenticatedUserSchema = z.object({
   id: z.number(),
   username: z.string(),
   handle: z.string().nullable(),
   thumbnail: z.string().nullable(),
   is_pro: z.boolean(),
   algoliaApiKeyProducts: z.string().nullable(),
   discountTier: z.string().nullable(),
   isAdmin: z.boolean(),
   teams: z.array(z.number()),
   links: z.record(z.any()),
   langid: z.string().nullable(),
});

export function useAuthenticatedUser() {
   const apiClient = useIFixitApiClient();
   const [cachedUserData, setCachedUserData] = useLocalPreference<User | null>(
      userDataLocalKey,
      null,
      (data: any) => AuthenticatedUserSchema.parse(data)
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
   teams: z.array(z.number()),
   links: z.record(z.any()),
   langid: z.string().optional().nullable(),
});

async function fetchAuthenticatedUser(
   apiClient: IFixitAPIClient
): Promise<User | null> {
   const payload = await apiClient.get('user', 'user');
   const userSchema = UserApiResponseSchema.parse(payload);
   return {
      id: userSchema.userid,
      username: userSchema.username,
      handle: userSchema.unique_username ?? null,
      thumbnail: userSchema.image?.thumbnail ?? null,
      is_pro: userSchema.discount_tier != null,
      algoliaApiKeyProducts: userSchema.algoliaApiKeyProducts ?? null,
      discountTier: userSchema.discount_tier ?? null,
      isAdmin: userSchema.privileges.includes('Admin'),
      teams: userSchema.teams,
      links: userSchema.links,
      langid: userSchema?.langid ?? null,
   };
}

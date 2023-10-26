import { IFixitAPIClient, useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useLocalPreference } from '@ifixit/ui';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';

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
   langid: z.string().optional().nullable(),
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
            (e) => {
               return null;
            }
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
   if (payload == null) {
      return null;
   }
   const userSchema = UserApiResponseSchema.safeParse(payload);
   if (!userSchema.success) {
      Sentry.captureMessage('User schema parsing failed', {
         level: 'debug',
         extra: {
            schema: userSchema,
            payload: payload,
            error: userSchema.error,
         },
      });
      return null;
   }
   return {
      id: userSchema.data.userid,
      username: userSchema.data.username,
      handle: userSchema.data.unique_username ?? null,
      thumbnail: userSchema.data.image?.thumbnail ?? null,
      is_pro: userSchema.data.discount_tier != null,
      algoliaApiKeyProducts: userSchema.data.algoliaApiKeyProducts ?? null,
      discountTier: userSchema.data.discount_tier ?? null,
      isAdmin: userSchema.data.privileges.includes('Admin'),
      teams: userSchema.data.teams,
      links: userSchema.data.links,
      langid: userSchema.data?.langid ?? null,
   };
}

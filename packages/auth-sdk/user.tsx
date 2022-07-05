import { useAppContext } from '@ifixit/app';
import { invariant, isRecord } from '@ifixit/helpers';
import { useQuery } from 'react-query';

type User = {
   id: number;
   username: string;
   handle: string;
   thumbnail: string | null;
   is_pro: boolean;
   discountTier: string | null;
};

const userKeys = {
   user: ['user'],
};

export function useAuthenticatedUser() {
   const appContext = useAppContext();
   const query = useQuery(userKeys.user, () =>
      fetchAuthenticatedUser(appContext.ifixitOrigin)
   );
   return query;
}

async function fetchAuthenticatedUser(apiOrigin: string): Promise<User | null> {
   const response = await fetch(`${apiOrigin}/api/2.0/user`, {
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (response.ok) {
      const payload = await response.json();
      invariant(isRecord(payload), 'unexpected api response');
      invariant(typeof payload.userid === 'number', 'User ID is not a number');
      invariant(
         typeof payload.username === 'string',
         'User username is not a string'
      );
      invariant(
         typeof payload.unique_username === 'string',
         'User handle is not a string'
      );
      let thumbnailUrl: string | null = null;
      if (
         isRecord(payload.image) &&
         typeof payload.image.thumbnail === 'string'
      ) {
         thumbnailUrl = payload.image.thumbnail;
      }

      const discountTier =
         typeof payload.discount_tier === 'string'
            ? payload.discount_tier
            : null;
      return {
         id: payload.userid,
         username: payload.username,
         handle: payload.unique_username,
         thumbnail: thumbnailUrl,
         is_pro: discountTier != null,
         discountTier,
      };
   }

   if (response.status === 401) {
      return null;
   }
   throw new Error(response.statusText);
}

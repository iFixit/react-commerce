import { IFIXIT_ORIGIN } from '@config/env';
import {
   assertIsNumber,
   assertIsRecord,
   assertIsString,
   isRecord,
} from '@helpers/application-helpers';
import { useQuery } from 'react-query';

export interface User {
   id: number;
   username: string;
   handle: string;
   thumbnail: string | null;
}

const userKeys = {
   user: ['user'],
};

export function useAuthenticatedUser() {
   const query = useQuery(userKeys.user, fetchAuthenticatedUser);
   return query;
}

async function fetchAuthenticatedUser(): Promise<User> {
   const response = await fetch(`${IFIXIT_ORIGIN}/api/2.0/user`, {
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (response.ok) {
      const payload = await response.json();
      assertIsRecord(payload, 'unexpected api response');
      assertIsNumber(payload.userid, 'User ID is not a number');
      assertIsString(payload.username, 'User username is not a string');
      assertIsString(payload.unique_username, 'User handle is not a string');
      let thumbnailUrl: string | null = null;
      if (
         isRecord(payload.image) &&
         typeof payload.image.thumbnail === 'string'
      ) {
         thumbnailUrl = payload.image.thumbnail;
      }

      return {
         id: payload.userid,
         username: payload.username,
         handle: payload.unique_username,
         thumbnail: thumbnailUrl,
      };
   }

   throw new Error(response.statusText);
}

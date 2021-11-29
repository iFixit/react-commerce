import { IFIXIT_API_ORIGIN } from '@config/env';
import { assertIsNumber, assertIsString, isError } from '@lib/utils';
import * as React from 'react';

export interface User {
   id: number;
   username: string;
   handle: string;
   image: unknown;
}

// Fetch logged user data from the API /api/2.0/user
export async function fetchAuthenticatedUser(): Promise<User> {
   const response = await fetch(`${IFIXIT_API_ORIGIN}/api/2.0/user`, {
      headers: {
         'Content-Type': 'application/json',
         'X-Requested-With': 'XMLHttpRequest',
      },
   });

   if (response.ok) {
      const payload = await response.json();
      assertIsNumber(payload.id, 'User ID is not a number');
      assertIsString(payload.username, 'User username is not a string');
      assertIsString(payload.handle, 'User handle is not a string');
      return {
         id: payload.id,
         username: payload.username,
         handle: payload.handle,
         image: payload?.image,
      };
   }

   throw new Error(response.statusText);
}

export function useAuthenticatedUser() {
   const [user, setUser] = React.useState<User | null>(null);
   const [error, setError] = React.useState<string | null>(null);

   React.useEffect(() => {
      fetchAuthenticatedUser()
         .then(setUser)
         .catch((e) => {
            if (isError(e)) {
               setError(e.message);
            } else {
               setError('An error occurred');
            }
         });
   }, []);

   return {
      user,
      error,
   };
}

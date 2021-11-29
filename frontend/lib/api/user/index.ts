import { IFIXIT_API_ORIGIN } from '@config/env';
import {
   assertIsNumber,
   assertIsRecord,
   assertIsString,
   isError,
} from '@lib/utils';
import { current } from 'immer';
import * as React from 'react';

export interface User {
   id: number;
   username: string;
   handle: string;
   image: unknown;
}

export async function fetchAuthenticatedUser(): Promise<User> {
   const response = await fetch(`${IFIXIT_API_ORIGIN}/api/2.0/user`, {
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (response.ok) {
      const payload: unknown = await response.json();
      assertIsRecord(payload, 'unexpected api response');
      assertIsNumber(payload.userid, 'User ID is not a number');
      assertIsString(payload.username, 'User username is not a string');
      assertIsString(payload.unique_username, 'User handle is not a string');
      return {
         id: payload.userid,
         username: payload.username,
         handle: payload.unique_username,
         image: payload?.image,
      };
   }

   throw new Error(response.statusText);
}

export function useAuthenticatedUser() {
   const [state, setState] = React.useState<{
      user: User | null;
      error: string | null;
      isLoading: boolean;
   }>({
      user: null,
      error: null,
      isLoading: true,
   });

   React.useEffect(() => {
      fetchAuthenticatedUser()
         .then((user) => {
            setState({
               user,
               error: null,
               isLoading: false,
            });
         })
         .catch((error) => {
            let errorMessage: string;
            if (isError(error)) {
               errorMessage = error.message;
            } else {
               errorMessage = 'An error occurred';
            }
            setState((current) => ({
               ...current,
               error: errorMessage,
               isLoading: false,
            }));
         });
   }, []);

   return state;
}

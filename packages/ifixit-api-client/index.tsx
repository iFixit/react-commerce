import { useAppContext } from '@ifixit/app';
import { logAsync } from '@ifixit/helpers';
import * as React from 'react';

export interface ClientOptions {
   origin: string;
   version?: string;
}

export class IFixitAPIClient {
   origin: string;
   version: string;

   constructor(readonly options: ClientOptions) {
      this.origin = options.origin;
      this.version = options.version ?? '2.0';
   }

   async get(endpoint: string, init?: RequestInit) {
      return this.fetch(endpoint, {
         ...init,
         method: 'GET',
      });
   }

   async post(endpoint: string, init?: RequestInit) {
      return this.fetch(endpoint, {
         ...init,
         method: 'POST',
      });
   }

   async put(endpoint: string, init?: RequestInit) {
      return this.fetch(endpoint, {
         ...init,
         method: 'PUT',
      });
   }

   async delete(endpoint: string, init?: RequestInit) {
      return this.fetch(endpoint, {
         ...init,
         method: 'DELETE',
      });
   }

   async fetch(endpoint: string, init?: RequestInit) {
      const url = `${this.origin}/api/${this.version}/${endpoint}`;
      const response = await logAsync(
         `iFixit API ${init?.method || 'GET'}:${truncate(endpoint, 70)}`,
         () =>
            fetch(url, {
               credentials: 'include',
               ...init,
            })
      );
      if (!response.ok) {
         throw new Error(response.statusText);
      }
      if (response.headers.get('Content-Type') === 'application/json') {
         return response.json();
      }
      return null;
   }
}

/**
 * Get the iFixit API client.
 */
export function useIFixitApiClient() {
   const appContext = useAppContext();

   const client = React.useMemo(() => {
      return new IFixitAPIClient({
         origin: appContext.ifixitOrigin,
      });
   }, [appContext.ifixitOrigin]);

   return client;
}

function truncate(str: string, length: number) {
   return str.length < length ? str : str.substr(0, length - 3) + '...';
}

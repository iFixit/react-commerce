import { useAppContext } from '@ifixit/app';
import { timeAsync } from '@ifixit/helpers';
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

   async get<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'GET',
      });
   }

   async post<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'POST',
      });
   }

   async put<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'PUT',
      });
   }

   async delete<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'DELETE',
      });
   }

   async fetch(endpoint: string, statName: string, init?: RequestInit) {
      const pskToken = process.env.DEV_API_AUTH_TOKEN;
      const authHeader: { Authorization?: string } = pskToken
         ? { Authorization: `PSK ${pskToken}` }
         : {};
      const url = `${this.origin}/api/${this.version}/${endpoint}`;
      const response = await timeAsync(
         `ifixit-api.${init?.method?.toLowerCase() || 'get'}.${statName}`,
         () =>
            fetch(url, {
               credentials: 'include',
               ...init,
               headers: {
                  ...authHeader,
                  ...init?.headers,
               },
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

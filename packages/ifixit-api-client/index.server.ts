import { timeAsync } from '@ifixit/helpers';

export interface ClientOptions {
   origin: string;
   version?: string;
   headers?: HeadersInit;
}

const BypassHeaderName = 'Nextjs-Bypass-Varnish';
export const VarnishBypassHeader = { [BypassHeaderName]: '1' };

export class IFixitAPIClient {
   origin: string;
   version: string;

   headers: HeadersInit;

   constructor(readonly options: ClientOptions) {
      this.origin = options.origin;
      this.version = options.version ?? '2.0';
      this.headers = options.headers ?? {};
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
      const headers = new Headers({
         ...authHeader,
         ...this.headers,
         ...init?.headers,
      });
      const response = await timeAsync(
         `ifixit-api.${init?.method?.toLowerCase() || 'get'}.${statName}`,
         () =>
            fetch(url, {
               credentials: 'include',
               ...init,
               headers: headers,
            })
      );
      if (!response.ok) {
         throw new Error(response.statusText);
      }

      warnIfNotBypassed(headers, response);

      if (response.headers.get('Content-Type') === 'application/json') {
         return response.json();
      }
      return null;
   }
}

function warnIfNotBypassed(requestHeaders: Headers, response: Response): void {
   const wantsBypass = requestHeaders.has(BypassHeaderName);
   if (!wantsBypass) {
      return;
   }

   const cachedHeaderKey = 'x-debug-cache';

   if (!response.headers.has(cachedHeaderKey)) {
      console.warn(
         'Varnish bypass requested, expected header not found!',
         `Expected header: ${cachedHeaderKey}`
      );
      return;
   }

   const cached = response.headers.get(cachedHeaderKey);
   const responseBypassed = cached === 'MISS';
   if (responseBypassed) {
      return;
   }

   console.warn(
      `Varnish bypass requested, but didn't bypass for ${truncate(
         response.url,
         100
      )}!`,
      `${cachedHeaderKey}: ${cached}`
   );
}

function truncate(str: string, length: number) {
   return str.length < length ? str : str.substr(0, length - 3) + '...';
}

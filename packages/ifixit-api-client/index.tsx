import { timeAsync } from '@ifixit/helpers';
export * from './client';
import { setSentryDetails } from '@ifixit/sentry';

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

   async get(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'GET',
      });
   }

   async getJson<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit,
      processRequest = this.getJsonFromResponse
   ): Promise<Data> {
      return this.get(endpoint, statName, init).then(processRequest);
   }

   async post(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'POST',
      });
   }

   async postJson<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.post(endpoint, statName, init).then(this.getJsonFromResponse);
   }

   async put(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'PUT',
      });
   }

   async putJson<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.put(endpoint, statName, init).then(this.getJsonFromResponse);
   }

   async delete(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'DELETE',
      });
   }

   async deleteJson<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.delete(endpoint, statName, init).then(
         this.getJsonFromResponse
      );
   }

   async fetch(endpoint: string, statName: string, init?: RequestInit) {
      const pskToken = process.env.NEXT_PUBLIC_DEV_API_AUTH_TOKEN;
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

      warnIfNotBypassed(headers, response);
      return response;
   }

   getJsonFromResponse = (response: Response) => {
      const isJson =
         response.headers.get('Content-Type') === 'application/json';

      if (!response.ok) {
         const body = isJson ? await response.json() : await response.text();
         const body_key = isJson ? 'response_json' : 'response_text';
         const message = response.statusText;
         throw new FetchError(message, { response, body, body_key });
      }

      if (isJson) {
         return response.json();
      }

      return null;
   };
}

export class FetchError extends Error {
   constructor(
      message: string,
      readonly responseData: {
         response: Response;
         body: string;
         body_key: string;
      }
   ) {
      super(message);
      setSentryDetails({
         contexts: [
            ['response', this.responseData.response],
            [this.responseData.body_key, this.responseData.body],
         ],
      });
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

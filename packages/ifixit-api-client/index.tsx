import { timeAsync } from '@ifixit/helpers';
export * from './client';
import {
   SentryDetails,
   SentryError,
   iFixitAPIRequestHeaderName,
} from '@ifixit/sentry';

export interface ClientOptions {
   origin: string;
   version?: string;
   headers?: HeadersInit;
}

const BypassHeaderName = 'Nextjs-Bypass-Varnish';
export const VarnishBypassHeader = { [BypassHeaderName]: '1' };

export const iFixitAPIRequestHeader = { [iFixitAPIRequestHeaderName]: '1' };

export class IFixitAPIClient {
   origin: string;
   version: string;

   headers: HeadersInit;

   constructor(readonly options: ClientOptions) {
      this.origin = options.origin;
      this.version = options.version ?? '2.0';
      this.headers = options.headers ?? {};
   }

   async getRaw(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'GET',
      });
   }

   async get<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.getRaw(endpoint, statName, init).then((resp) => {
         return this.getJsonFromResponse(resp, { input: endpoint, init });
      });
   }

   async postRaw(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'POST',
      });
   }

   async post<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.postRaw(endpoint, statName, init).then((resp) => {
         return this.getJsonFromResponse(resp, { input: endpoint, init });
      });
   }

   async putRaw(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'PUT',
      });
   }

   async put<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.putRaw(endpoint, statName, init).then((resp) => {
         return this.getJsonFromResponse(resp, { input: endpoint, init });
      });
   }

   async deleteRaw(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Response> {
      return this.fetch(endpoint, statName, {
         ...init,
         method: 'DELETE',
      });
   }

   async delete<Data = unknown>(
      endpoint: string,
      statName: string,
      init?: RequestInit
   ): Promise<Data> {
      return this.deleteRaw(endpoint, statName, init).then((resp) => {
         return this.getJsonFromResponse(resp, { input: endpoint, init });
      });
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
         ...iFixitAPIRequestHeader,
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

   isJson = (response: Response) => {
      return response.headers.get('Content-Type') === 'application/json';
   };

   getJsonFromResponse = async (
      response: Response,
      request?: {
         input: RequestInfo | URL;
         init?: RequestInit;
      }
   ) => {
      if (!response.ok) {
         await this.throwFetchError(response, request);
      }

      if (this.isJson(response)) {
         return response.json();
      }

      return null;
   };

   throwFetchError = async (
      response: Response,
      request?: {
         input: RequestInfo | URL;
         init?: RequestInit;
      }
   ) => {
      const isJson = this.isJson(response);

      const message = response.statusText;

      let body = null;

      try {
         body = isJson ? await response.json() : await response.text();
      } catch (e) {
         body = response.body;
      }
      const body_key = isJson ? 'response_json' : 'response_text';

      const sentryDetails: SentryDetails = {
         contexts: {
            request: request,
            response: {
               status: response.status,
               statusText: response.statusText,
            },
            [body_key]: body,
         },
         tags: {
            request_url: response.url,
            response_status_code: response.status.toString(),
            response_status_text: response.statusText,
         },
      };

      throw new FetchError(message, sentryDetails, response, request);
   };
}

export class FetchError extends SentryError {
   constructor(
      message: string,
      readonly sentryDetails: SentryDetails,
      readonly response: Response,
      readonly request?: {
         input: RequestInfo | URL;
         init?: RequestInit;
      }
   ) {
      super(message, sentryDetails);
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

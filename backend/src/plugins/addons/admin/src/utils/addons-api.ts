import { auth } from '@strapi/helper-plugin';
import { convertToRelativePath, joinPaths } from './path-helpers';

const BACKEND_URL = process.env.STRAPI_ADMIN_BACKEND_URL ?? '';

type RequestOptions = Pick<RequestInit, 'headers'> & { body?: any };

class AddonsAPI {
   basePath: string;

   constructor(basePath = '/addons') {
      this.basePath = basePath;
   }

   async get<T = any>(api: string, init?: RequestOptions): Promise<T> {
      const path = convertToRelativePath(api);
      return this.fetch(path, init);
   }

   async post<T = any>(api: string, init: RequestOptions = {}): Promise<T> {
      const path = convertToRelativePath(api);
      return this.fetch(path, { method: 'POST', ...init });
   }

   private async fetch(
      api: string,
      { method = 'GET', headers = {}, body, ...other }: RequestInit = {}
   ) {
      const url = joinPaths(BACKEND_URL, this.basePath, api);
      const fetchOptions = {
         method,
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${auth.getToken()}`,
            ...headers,
         },
         ...(body && { body: JSON.stringify(body) }),
         ...other,
      };
      const response = await fetch(url, fetchOptions);
      if (!response.ok)
         throw new Error(`API request failed: ${response.status}`);
      return response.json();
   }
}

export const addonsAPI = new AddonsAPI();

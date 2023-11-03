/**
 * withCache is a function that enables caching the result of any async operation using a stale while revalidate strategy.
 * The function takes a set of options and returns a NextApiHandler that you can use in your API routes to perform
 * background revalidation of the operation that you're caching. The handler also exposes a get function that you can
 * use to get the cached value (or a fresh value on cache misses).
 * Whenever you call the get function and the data is stale, a background revalidation is automatically requested.
 *
 * Usage:
 *
 * 1) Define an operation endpoint in your API routes:
 *    e.g. `export default withCache({ ... })`
 * 2) Import the operation endpoint where you need to get the value:
 *    e.g. `import ProductList from '@pages/api/nextjs/cache/product-list';`
 * 3) Use the get function to get the cached value:
 *   e.g. `const productList = await ProductList.get({ ... })`
 */

import { APP_ORIGIN, VERCEL_HOST } from '@config/env';
import { log as defaultLog, Logger } from '@ifixit/helpers';
import * as http from 'http';
import * as https from 'https';
import type { NextApiHandler } from 'next';
import { z } from 'zod';
import { cache } from './adapters';
import {
   CacheEntry,
   createCacheEntry,
   createCacheKey,
   isStale,
   isValidCacheEntry,
   printError,
   printZodError,
} from './utils';

const { request } = VERCEL_HOST ? https : http;

interface CacheOptions<
   VariablesSchema extends z.ZodTypeAny,
   ValueSchema extends z.ZodTypeAny
> {
   endpoint: string;
   statName: string;
   variablesSchema: VariablesSchema;
   valueSchema: ValueSchema;
   getFreshValue: (
      variables: z.infer<VariablesSchema>
   ) => Promise<z.infer<ValueSchema>>;
   ttl?: number;
   staleWhileRevalidate?: number;
}

type GetOptions = {
   forceMiss?: boolean;
};

type NextApiHandlerWithProps<
   Variables = unknown,
   Value = unknown
> = NextApiHandler & {
   get: (variables: Variables, options: GetOptions) => Promise<Value>;
   revalidate: (variables: Variables) => Promise<void>;
};

export const withCache = <
   VariablesSchema extends z.ZodTypeAny,
   ValueSchema extends z.ZodTypeAny
>({
   endpoint,
   statName,
   variablesSchema,
   valueSchema,
   getFreshValue,
   ttl,
   staleWhileRevalidate,
}: CacheOptions<VariablesSchema, ValueSchema>): NextApiHandlerWithProps<
   z.infer<VariablesSchema>,
   z.infer<ValueSchema>
> => {
   const logger: Logger = defaultLog;

   const requestRevalidation = async (variables: z.infer<VariablesSchema>) => {
      const start = performance.now();
      const p = new Promise<void>((resolve, reject) => {
         // Don't delay the lambda beyond 50ms for revalidation
         const timeout = setTimeout(() => {
            const elapsed = performance.now() - start;
            logger.warning.event(`${statName}.revalidation.timeout`);
            logger.warning.timing(`${statName}.revalidation.timeout`, elapsed);
            resolve();
         }, 50);
         const postData = JSON.stringify(variables);
         const req = request({
            hostname: VERCEL_HOST || new URL(APP_ORIGIN).hostname,
            ...(!VERCEL_HOST && { port: new URL(APP_ORIGIN).port }),
            path: `/${endpoint}`,
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Content-Length': Buffer.byteLength(postData),
            },
         }).on('error', (error) => {
            const elapsed = performance.now() - start;
            logger.error(
               `${endpoint}.error: failed to trigger revalidation\n${printError(
                  error
               )}`
            );
            logger.error.timing(`${statName}.revalidation.error`, elapsed);
            reject();
         });
         req.write(postData);
         req.end(() => {
            const elapsed = performance.now() - start;
            logger.info('revalidation request end', postData);
            logger.success.event(`${statName}.revalidation.request_end`);
            logger.success.timing(
               `${statName}.revalidation.request_end`,
               elapsed
            );
            clearTimeout(timeout);
            resolve();
         });
      });
      let elapsed = performance.now() - start;
      logger.info.event(`${statName}.revalidation.create_promise`);
      logger.info.timing(`${statName}.revalidation.create_promise`, elapsed);
      await p;
      elapsed = performance.now() - start;
      logger.info.event(`${statName}.revalidation.count`);
      logger.info.timing(`${statName}.revalidation.total`, elapsed);
   };

   const get: NextApiHandlerWithProps<
      z.infer<VariablesSchema>,
      ValueSchema
   >['get'] = async (variables, options = {}) => {
      const { forceMiss } = options;
      const key = createCacheKey(endpoint, variables);
      logger.info(`${endpoint}.key: "${key}"`);
      let start = performance.now();
      if (!forceMiss) {
         let cachedEntry: CacheEntry | null = null;
         try {
            cachedEntry = await cache.get(key);
         } catch (error) {
            logger.warning(
               `${endpoint}.error: unable to get entry with key. ${printError(
                  error
               )}`
            );
         }
         if (isValidCacheEntry(cachedEntry)) {
            const valueValidation = valueSchema.safeParse(cachedEntry.value);
            if (valueValidation.success) {
               if (isStale(cachedEntry)) {
                  await requestRevalidation(variables);
                  const elapsed = performance.now() - start;
                  logger.success.event(`${statName}.stale`);
                  logger.success.timing(`${statName}.stale`, elapsed);
               } else {
                  const elapsed = performance.now() - start;
                  logger.success.event(`${statName}.hit`);
                  logger.success.timing(`${statName}.hit`, elapsed);
               }
               return valueValidation.data;
            }
            logger.warning(`${endpoint}.warning: Invalid value. If you've changed the value schema, this error is expected. We'll get a fresh value and update the cache.\n
               ${printZodError(valueValidation.error)}`);
         }
      }
      start = performance.now();
      const value = await getFreshValue(variables);
      let elapsed = performance.now() - start;
      const missType = forceMiss ? 'force_miss' : 'miss';
      logger.warning.event(`${statName}.${missType}`);
      logger.warning.timing(`${statName}.${missType}`, elapsed);
      if (ttl != null && ttl > 0) {
         start = performance.now();
         const cacheEntry = createCacheEntry(value, {
            ttl,
            staleWhileRevalidate,
         });
         try {
            start = performance.now();
            await cache.set(key, cacheEntry);
            elapsed = performance.now() - start;
            logger.info.timing(`${statName}.set`, elapsed);
         } catch (error) {
            logger.warning(
               `${endpoint}.warning: unable to set entry with key. ${printError(
                  error
               )}`
            );
         }
      }
      return value;
   };

   const handler: NextApiHandlerWithProps<
      VariablesSchema,
      ValueSchema
   > = async (req, res) => {
      try {
         const variables = variablesSchema.parse(req.body);
         const value = await getFreshValue(variables);
         const cacheEntry = createCacheEntry(value, {
            ttl,
            staleWhileRevalidate,
         });
         const key = createCacheKey(endpoint, variables);
         await cache.set(key, cacheEntry);
         return res.status(200).json({ success: true });
      } catch (error) {
         logger.error(printError(error));
         return res.status(500).json({ success: false });
      }
   };

   handler.get = get;

   handler.revalidate = requestRevalidation;

   return handler;
};

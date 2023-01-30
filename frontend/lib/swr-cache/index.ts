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

import { APP_ORIGIN } from '@config/env';
import { log as defaultLog, Logger, nullLog } from '@ifixit/helpers/logger';
import type { NextApiHandler } from 'next';
import { z } from 'zod';
import { getCache } from './adapters';
import {
   CacheEntry,
   createCacheEntry,
   createCacheKey,
   isStale,
   isValidCacheEntry,
   printError,
   printZodError,
   sleep,
} from './utils';

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
   log?: boolean;
}

type NextApiHandlerWithProps<
   Variables = unknown,
   Value = unknown
> = NextApiHandler & {
   get: (variables: Variables) => Promise<Value>;
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
   log = false,
}: CacheOptions<VariablesSchema, ValueSchema>): NextApiHandlerWithProps<
   z.infer<VariablesSchema>,
   z.infer<ValueSchema>
> => {
   const logger: Logger = log ? defaultLog : nullLog;
   const cache = getCache();

   const requestRevalidation = async (variables: z.infer<VariablesSchema>) => {
      fetch(`${APP_ORIGIN}/${endpoint}`, {
         method: 'POST',
         body: JSON.stringify(variables),
      }).catch((error) => {
         logger.error(
            `${endpoint}.error: failed to trigger revalidation\n${printError(
               error
            )}`
         );
      });
      // We add a small delay to ensure the revalidation is triggered
      await sleep(50);
   };

   const get: NextApiHandlerWithProps<
      z.infer<VariablesSchema>,
      ValueSchema
   >['get'] = async (variables) => {
      const key = createCacheKey(endpoint, variables);
      logger.info(`${endpoint}.key: "${key}"`);
      let start = performance.now();
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
               logger.event(`${statName}.stale`);
               logger.timing(`${statName}.stale`, elapsed);
            } else {
               const elapsed = performance.now() - start;
               logger.event(`${statName}.hit`);
               logger.timing(`${statName}.hit`, elapsed);
            }
            return valueValidation.data;
         }
         logger.warning(`${endpoint}.warning: Invalid value. If you've changed the value schema, this error is expected. We'll get a fresh value and update the cache.\n
            ${printZodError(valueValidation.error)}`);
      }
      start = performance.now();
      const value = await getFreshValue(variables);
      let elapsed = performance.now() - start;
      logger.event(`${statName}.miss`);
      logger.timing(`${statName}.miss`, elapsed);
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
            logger.timing(`${statName}.set`, elapsed);
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
         const variables = variablesSchema.parse(JSON.parse(req.body));
         const value = await getFreshValue(variables);
         const cacheEntry = createCacheEntry(value, {
            ttl,
            staleWhileRevalidate,
         });
         const key = createCacheKey(endpoint, variables);
         await cache.set(key, cacheEntry);
         return res.status(200).json({ success: true });
      } catch (error) {
         return res.status(500).json({ success: false });
      }
   };

   handler.get = get;

   handler.revalidate = requestRevalidation;

   return handler;
};

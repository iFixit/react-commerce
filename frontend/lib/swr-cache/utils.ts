import isPlainObject from 'lodash/isPlainObject';
import { z } from 'zod';

export interface CacheAdapter {
   name?: string;
   set(key: string, value: CacheEntry): Promise<void>;
   get(key: string): Promise<CacheEntry | null>;
   delete(key: string): Promise<void>;
}

const CacheEntrySchema = z.object({
   metadata: z.object({
      ttl: z.number().positive().optional(),
      staleWhileRevalidate: z.number().optional(),
      createdAt: z.number(),
   }),
   value: z.unknown(),
});

type CacheEntry = z.infer<typeof CacheEntrySchema>;

interface CreateCacheEntryOptions {
   ttl?: number;
   staleWhileRevalidate?: number;
}

export const createCacheEntry = <T = unknown>(
   value: T,
   options: CreateCacheEntryOptions
): CacheEntry => {
   const { ttl, staleWhileRevalidate } = options;
   return {
      metadata: {
         ttl,
         staleWhileRevalidate: ensurePositiveNumber(staleWhileRevalidate),
         createdAt: Date.now(),
      },
      value,
   };
};

export const isValidCacheEntry = (entry: unknown): entry is CacheEntry => {
   const validation = CacheEntrySchema.safeParse(entry);
   if (!validation.success) {
      return false;
   }
   return isFresh(validation.data) || isStale(validation.data);
};

export const isStale = (entry: CacheEntry) => {
   const now = Date.now();
   const {
      ttl = Infinity,
      staleWhileRevalidate = 0,
      createdAt,
   } = entry.metadata;

   return !isFresh(entry) && createdAt + ttl + staleWhileRevalidate > now;
};

export const createCacheKey = (keyPrefix: string, variables: unknown) => {
   return `${keyPrefix}:${stableHash(variables)}`;
};

export const sleep = (ms: number) =>
   new Promise((resolve) => setTimeout(resolve, ms));

export const ensurePositiveNumber = (value: number | null | undefined) => {
   return value == null ? 0 : Math.max(0, value);
};

const isFresh = (entry: CacheEntry) => {
   const now = Date.now();
   const { ttl = Infinity, createdAt } = entry.metadata;
   return createdAt + ttl > now;
};

const stableHash = (variables: unknown): string => {
   return JSON.stringify(variables, (_, val) =>
      isPlainObject(val)
         ? Object.keys(val)
              .sort()
              .reduce((result, key) => {
                 result[key] = val[key];
                 return result;
              }, {} as any)
         : val
   );
};

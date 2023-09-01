import LRU from 'lru-cache';
import { timeAsync } from '@ifixit/helpers';

const cacheStore = new LRU({ max: 100 });

type CacheOptions = {
   ttl: number;
   forceMiss?: boolean;
};

export function cache<T>(
   key: string,
   getValue: () => Promise<T>,
   { ttl, forceMiss = false }: CacheOptions
): Promise<T> {
   if (!forceMiss) {
      const fromCache = cacheStore.get(key) as Promise<T> | undefined;
      if (fromCache !== undefined) {
         return fromCache;
      }
   }
   const result = timeAsync(`Cache miss for '${key}'`, getValue);
   cacheStore.set(key, result, { ttl: ttl * 1000 });
   return result;
}

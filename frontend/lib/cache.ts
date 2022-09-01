import LRU from 'lru-cache';
import { logAsync } from '@ifixit/helpers';

const cacheStore = new LRU({ max: 100 });

export function cache<T>(
   key: string,
   getValue: () => Promise<T>,
   ttl: number
): Promise<T> {
   const fromCache = cacheStore.get(key) as Promise<T> | undefined;
   if (fromCache !== undefined) {
      return fromCache;
   }
   const result = logAsync(`Cache miss for '${key}'`, getValue);
   cacheStore.set(key, result, { ttl: ttl * 1000 });
   return result;
}

export function clearCache(): void {
   cacheStore.clear();
}

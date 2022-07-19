import LRU from 'lru-cache';
const cacheStore = new LRU({ max: 100 });

export function cache<T>(
   key: string,
   fetch: () => Promise<T>,
   ttl: number
): Promise<T> {
   const fromCache = cacheStore.get(key) as Promise<T> | undefined;
   if (fromCache !== undefined) {
      console.log(`Got '${key}' from cache`);
      return fromCache;
   }
   const result = fetch();
   console.log(`Storing '${key}' in cache`);
   cacheStore.set(key, result, { ttl: ttl * 1000 });
   return result;
}

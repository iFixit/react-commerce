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
   const timerName = `Cache miss for '${key}'`;
   console.time(timerName);
   const result = fetch();
   result.finally(() => console.timeEnd(timerName));
   cacheStore.set(key, result, { ttl: ttl * 1000 });
   return result;
}

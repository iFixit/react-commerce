import { Redis as RedisClient } from 'ioredis';
import { CacheAdapter, ensurePositiveNumber } from '../utils';

export function redisAdapter(redisClient: RedisClient): CacheAdapter {
   return {
      name: redisClient.options.name || 'Redis',
      async set(key, entry) {
         const ttl = ensurePositiveNumber(entry.metadata.ttl);
         const staleWhileRevalidate = ensurePositiveNumber(
            entry.metadata.staleWhileRevalidate
         );
         const redisTtl = ttl + staleWhileRevalidate;
         if (redisTtl > 0 && redisTtl < Infinity) {
            await redisClient.set(key, JSON.stringify(entry), 'PX', redisTtl);
         } else {
            await redisClient.set(key, JSON.stringify(entry));
         }
      },
      async get(key) {
         const entry = await redisClient.get(key);
         if (!entry) {
            return null;
         }
         return JSON.parse(entry);
      },
      async delete(key) {
         await redisClient.del(key);
      },
   };
}

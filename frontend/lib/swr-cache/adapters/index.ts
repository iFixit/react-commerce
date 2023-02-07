import { redisAdapter } from './redis-adapter';
import Redis from 'ioredis';
import { REDIS_URL } from '@config/env';
import { nullAdapter } from './null-adapter';

export const getCache = () => {
   const nullCacheAdapter = nullAdapter();
   if (REDIS_URL) {
      const redisClient = getRedisClient(REDIS_URL);
      const redisCacheAdapter = redisAdapter(redisClient);
      return () => redisClient.status == "ready" ? redisCacheAdapter : nullCacheAdapter;
   } else {
      return () => nullCacheAdapter;
   }
};

function getRedisClient(redisUrl: string) {
   return new Redis(redisUrl, {
      connectTimeout: 10000,
      // Retry, connect every once in a while as cache misses / failures are OK
      retryStrategy: (times) => Math.min(times * 5000, 10 * 60 * 1000),
      maxRetriesPerRequest: 0,
      // Always try re-connecting since one instance is shared across the whole
      // process
      reconnectOnError: (err) => 1,
      // When not connected to redis, return error, don't add operations to a
      // queue
      enableOfflineQueue: false,
   });
}

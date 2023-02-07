import { redisAdapter } from './redis-adapter';
import Redis from 'ioredis';
import { REDIS_URL } from '@config/env';
import { nullAdapter } from './null-adapter';

export const getCache = () => {
   if (REDIS_URL === undefined) {
      return nullAdapter();
   }

   const client = new Redis(REDIS_URL, {
      connectTimeout: 500,
      // Retry, connect every once in a while as cache misses / failures are OK
      retryStrategy: (times) => {
         times = Math.min(20, times);
         return Math.min((50 + 2) ** (times + 3), 10 * 60 * 1000);
      },
      maxRetriesPerRequest: 0,
      // Always try re-connecting since one instance is shared across the whole
      // process
      reconnectOnError: (err) => 1,
      // When not connected to redis, return error, don't add operations to a
      // queue
      enableOfflineQueue: false,
   });
   return redisAdapter(client);
};

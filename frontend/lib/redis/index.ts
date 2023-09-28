import { REDIS_URL } from '@config/env';
import Redis from 'ioredis';

function getClient() {
   if (typeof REDIS_URL !== 'string') {
      return undefined;
   }
   return new Redis(REDIS_URL, {
      connectTimeout: 500,
      // Retry, connect every once in a while as cache misses / failures are OK
      retryStrategy: (times) => Math.min(50 + 2 ** (times + 3), 2 * 60 * 1000),
      maxRetriesPerRequest: 0,
      // Always try re-connecting since one instance is shared across the whole
      // process
      reconnectOnError: (_err) => 1,
      // When not connected to redis, return error, don't add operations to a
      // queue
      enableOfflineQueue: false,
      commandTimeout: 500,
   });
}

export const client = getClient();

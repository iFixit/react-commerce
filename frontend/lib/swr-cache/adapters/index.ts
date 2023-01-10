import { redisAdapter } from './redis-adapter';
import Redis from 'ioredis';
import { REDIS_URL } from '@config/env';
import { nullAdapter } from './null-adapter';

export const getCache = () => {
   if (REDIS_URL === undefined) {
      return nullAdapter();
   }
   const client = new Redis(REDIS_URL);
   return redisAdapter(client);
};

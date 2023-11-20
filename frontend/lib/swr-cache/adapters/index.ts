import { getClient as getRedisClient, ClientOptions } from '@lib/redis';
import { nullAdapter } from './null-adapter';
import { redisAdapter } from './redis-adapter';

export const getCache = (options: ClientOptions) => {
   const client = getRedisClient(options);
   if (client == null) {
      return nullAdapter();
   }

   return redisAdapter(client);
};

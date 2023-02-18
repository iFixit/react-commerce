import { client } from '@lib/redis';
import { nullAdapter } from './null-adapter';
import { redisAdapter } from './redis-adapter';

const getCache = () => {
   if (client == null) {
      return nullAdapter();
   }

   return redisAdapter(client);
};

export const cache = getCache();

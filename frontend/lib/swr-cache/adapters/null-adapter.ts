/**
 *  This is a null adapter that does nothing. It is used in development mode.
 */
import { CacheAdapter } from '../utils';

export function nullAdapter(): CacheAdapter {
   return {
      name: 'Null',
      async set() {},
      async get() {
         return null;
      },
      async delete() {},
   };
}

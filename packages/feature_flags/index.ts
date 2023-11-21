import * as raw_flags from './flags.json';
import type { FlagList as FormalFlagList } from './flag_schema';

import { useSafeLocalStorage } from '@ifixit/local-storage';

export const flags: FormalFlagList = raw_flags;
export type FlagKey = keyof typeof raw_flags;

export function checkFlag(flagName: FlagKey) {
   const flagValue = flags[flagName];

   if (flagValue === true) {
      return true;
   }

   const enableFlag = 'enable-' + flagName;

   const safeLocalStorage = useSafeLocalStorage();

   if (typeof flagValue === 'object') {
      if (safeLocalStorage?.getItem(enableFlag) === 'true') {
         return true;
      }
   }

   // Check if there's a hash enabling the flag
   if (getHashBoolean(enableFlag)) {
      return true;
   }

   return false;
}

function getHashBoolean(param: string): boolean {
   if (typeof window === 'undefined') {
      return false;
   }

   const hash = window?.location?.hash;
   if (!hash) {
      return false;
   }
   return hash.indexOf(param) !== -1;
}

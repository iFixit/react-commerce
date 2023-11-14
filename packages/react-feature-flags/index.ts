import { FlagKey, checkFlag } from '@ifixit/feature_flags';
import { useEffect, useState } from 'react';

export function useFlag(flagName: FlagKey) {
   const [flag, setFlag] = useState(false);
   useEffect(() => {
      setFlag(checkFlag(flagName));
   });
   return flag;
}

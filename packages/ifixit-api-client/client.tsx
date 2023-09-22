'use client';

import { useAppContext } from '@ifixit/app';
import * as React from 'react';
import { IFixitAPIClient } from '.';

/**
 * Get the iFixit API client.
 */
export function useIFixitApiClient() {
   const appContext = useAppContext();

   const client = React.useMemo(() => {
      return new IFixitAPIClient({
         origin: appContext.ifixitOrigin,
      });
   }, [appContext.ifixitOrigin]);

   return client;
}

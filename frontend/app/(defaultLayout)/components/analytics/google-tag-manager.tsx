import { GA_DEBUG } from '@config/env';
import { setupMinimumGA4, useGACustomDimensions } from '@ifixit/analytics';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import * as React from 'react';

interface GoogleTagManagerProps {
   gtmId: string;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
   const dimensions = useGACustomDimensions();
   const debugMode = useDebugMode();

   React.useEffect(() => {
      setupMinimumGA4(gtmId, debugMode, dimensions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dimensions]);

   return (
      <Script
         strategy="afterInteractive"
         src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
      />
   );
}

function useDebugMode() {
   const params = useSearchParams();
   return GA_DEBUG || params?.get('ga4_debug') === 'true';
}

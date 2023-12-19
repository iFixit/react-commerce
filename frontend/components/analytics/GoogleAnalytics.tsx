import { GTAG_ID, GA_DEBUG } from '@config/env';
import * as React from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useGACustomDimensions, setupMinimumGA4 } from '@ifixit/analytics';

// NOTE: GA4 is setup in _document.tsx
export function GoogleAnalytics() {
   const wantsGA4 = GTAG_ID;
   return wantsGA4 ? <GA4 /> : null;
}

function GA4() {
   const router = useRouter();
   const { query } = router;
   const dimensions = useGACustomDimensions();

   const debugMode = GA_DEBUG || query.ga4_debug === 'true';
   React.useEffect(() => {
      setupMinimumGA4(GTAG_ID, debugMode, dimensions);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dimensions]);
   return (
      <Script
         strategy="afterInteractive"
         src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
      ></Script>
   );
}

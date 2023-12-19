import { GTAG_ID } from '@config/env';
import Script from 'next/script';
import * as React from 'react';

export function GoogleAnalytics() {
   const wantsGA4 = Boolean(GTAG_ID);

   return wantsGA4 ? <GA4 /> : null;
}

function GA4() {
   return (
      <>
         <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
         ></Script>
      </>
   );
}

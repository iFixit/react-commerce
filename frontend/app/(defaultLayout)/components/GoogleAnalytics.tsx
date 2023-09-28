import { GA_DEBUG, GA_KEY, GA_URL, GTAG_ID } from '@config/env';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import * as React from 'react';

declare const ga: (command: string, hitType: string, url?: string) => void;

const handleRouteChange = (url: string) => {
   if (typeof ga !== 'undefined') {
      ga('ifixit.set', 'page', url);
      ga('ifixit.send', 'pageview');
   }
};

export function GoogleAnalytics() {
   const pathname = usePathname();
   const searchParams = useSearchParams();

   React.useEffect(() => {
      const url = `${pathname}?${searchParams}`;
      handleRouteChange(url);
   }, [pathname, searchParams]);

   const wantsUA = GA_URL && GA_KEY;
   const wantsGA4 = Boolean(GTAG_ID);

   return (
      <>
         {wantsUA && <UA />}
         {wantsGA4 && <GA4 />}
      </>
   );
}

function GA4() {
   const params = useSearchParams();

   const debugMode = GA_DEBUG || params?.get('ga4_debug') === 'true';
   return (
      <>
         <Script id="gtag-ga4">
            {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${GTAG_ID}', ${debugMode} ? '{ debug_mode: true }' : '{}');
            `}
         </Script>
         <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
         ></Script>
      </>
   );
}

function UA() {
   return (
      <>
         <Script id="google-analytics" strategy="afterInteractive">
            {`
         window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

         if (${GA_DEBUG} === true) {
            window.ga_debug = {trace: true};
         }

         ga('create', '${GA_KEY}', 'auto', 'ifixit', {'legacyCookieDomain': 'ifixit.com'});
         ga('ifixit.set', 'anonymizeIp', true);

         // Do not lazy load.
         ga('ifixit.set', 'dimension2', '0');

         // Load the enhanced ecommerce plug-in.
         ga('ifixit.require', 'ec');

         // Enable Remarketing and Advertising Reporting Features in GA
         ga('ifixit.require', 'displayfeatures');

         ga('ifixit.set', 'page', window.location.pathname);
         ga('ifixit.send', 'pageview');
      `}
         </Script>
         <Script src={GA_URL} strategy="afterInteractive" />
      </>
   );
}

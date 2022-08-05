import { GA_URL, GA_KEY, GA_DEBUG } from '@config/env';
import Script from 'next/script';

export function GoogleAnalytics() {
   return GA_URL ? (
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

               ga('ifixit.send', 'pageview');
            `}
         </Script>
         <Script src={`${GA_URL}`} strategy="afterInteractive" />
      </>
   ) : null;
}

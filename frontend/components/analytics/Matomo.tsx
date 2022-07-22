import { MATOMO_URL } from '@config/env';
import Script from 'next/script';

export function Matomo() {
   return MATOMO_URL ? (
      <Script
         id="matomo-analytics"
         onError={(e) => {
            console.error('Failed to load Matomo analytics script', e);
         }}
      >
         {`
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
               var u='${MATOMO_URL}';
               _paq.push(['setTrackerUrl', u+'/js/tracker.php']);
               _paq.push(['setSiteId', '1']);
               var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
               g.async=true; g.src=u+'/js/tracker.php'; s.parentNode.insertBefore(g,s);
            })();
         `}
      </Script>
   ) : null;
}

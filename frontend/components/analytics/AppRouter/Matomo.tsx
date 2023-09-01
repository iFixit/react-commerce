import { MATOMO_URL } from '@config/env';
import * as React from 'react';
import Script from 'next/script';
import { trackMatomoPageView } from '@ifixit/analytics';
import { usePathname, useSearchParams } from 'next/navigation';

export function Matomo() {
   const pathname = usePathname();
   const searchParams = useSearchParams();

   React.useEffect(() => {
      const url = `${pathname}?${searchParams}`;
      trackMatomoPageView(url);
   }, [pathname, searchParams]);

   return MATOMO_URL ? (
      <Script id="matomo-analytics" strategy="afterInteractive">
         {`
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
               var u='${MATOMO_URL}';
               _paq.push(['setTrackerUrl', u+'/minerva.php']);
               _paq.push(['setSiteId', '1']);
               var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
               g.async=true; g.src=u+'/minerva.php'; s.parentNode.insertBefore(g,s);
            })();
         `}
      </Script>
   ) : null;
}

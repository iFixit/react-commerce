import { MATOMO_URL } from '@config/env';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

declare const _paq: string[][] | undefined;

export function Matomo() {
   const router = useRouter();
   React.useEffect(() => {
      const handleRouteChange = (url: string) => {
         if (typeof window !== 'undefined' && _paq) {
            _paq.push(['setCustomUrl', url]);
            _paq.push(['setDocumentTitle', document.title]);
            _paq.push(['trackPageView']);
         }
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      router.events.on('hashChangeComplete', handleRouteChange);
      return () => {
         router.events.off('routeChangeComplete', handleRouteChange);
         router.events.off('hashChangeComplete', handleRouteChange);
      };
   }, [router?.events]);

   return MATOMO_URL ? (
      <Head>
         <script
            key="matomo-analytics"
            dangerouslySetInnerHTML={{
               __html: `
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
               `,
            }}
         />
      </Head>
   ) : null;
}

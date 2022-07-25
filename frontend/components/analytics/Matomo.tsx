import { MATOMO_URL } from '@config/env';
import Head from 'next/head';

export function Matomo() {
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

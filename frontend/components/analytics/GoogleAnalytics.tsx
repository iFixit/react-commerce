import { GA_URL, GA_KEY, GA_DEBUG } from '@config/env';
import Head from 'next/head';

export function GoogleAnalytics() {
   return GA_URL ? (
      <Head>
         <script
            dangerouslySetInnerHTML={{
               __html: `
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
               `,
            }}
         />
         <script async src={`${GA_URL}`}></script>
      </Head>
   ) : null;
}

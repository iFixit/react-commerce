import { GA_URL, GA_KEY, GA_DEBUG } from '@config/env';
import Head from 'next/head';

export function GoogleAnalytics() {
   return GA_URL ? (
      <Head>
         <script
            dangerouslySetInnerHTML={{
               __html: `
                  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script', '${GA_URL}','ga');

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
               `,
            }}
         />
      </Head>
   ) : null;
}

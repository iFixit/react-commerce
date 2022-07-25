import { GA_URL, GA_KEY } from '@config/env';
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

                  // If not on live site:
                  // window.ga_debug = {trace: true};

                  let createOptions = {'legacyCookieDomain': 'ifixit.com'};

                  // Logged in?
                  // createOptions.userId = '<userid>';

                  ga('create', '${GA_KEY}', 'auto', 'ifixit', createOptions);
                  ga('ifixit.set', 'anonymizeIp', true);

                  // Logged in? One of '0', '1'
                  // ga('ifixit.set', 'dimension1', 'LOGGED_IN');

                  // Do not lazy load.
                  ga('ifixit.set', 'dimension2', '0');

                  // Customer type? One of: 'regular', 'pro', 'wholesale'
                  // ga('ifixit.set', 'dimension4', 'CUSTOMER_TYPE');

                  // Userid? Ex: '418937'
                  ga('ifixit.set', 'dimension5', 'USER_ID');

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

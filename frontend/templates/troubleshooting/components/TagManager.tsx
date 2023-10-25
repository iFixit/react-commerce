import { SentryError } from '@ifixit/sentry';
import Head from 'next/head';
import React from 'react';

// This is public so no need to hide.
const API_KEY = '59NVBFN';
const GET_PARAM = 'matomoTagManager';
const DEFAULT_ENV = 'Live';

function GoogleScript() {
   const scriptTag = `
    (function(w,d,s,l,i) {
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-${API_KEY}');
  `;

   return <script dangerouslySetInnerHTML={{ __html: scriptTag }} />;
}

export function GoogleNoScript() {
   return (
      <noscript>
         <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-${API_KEY}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
         />
      </noscript>
   );
}

function MatomoScript() {
   const params = new URLSearchParams();
   const environment = params.get(GET_PARAM) || DEFAULT_ENV;

   const configUrl = (function () {
      switch (environment) {
         case 'Live':
            return process.env
               .NEXT_PUBLIC_MATOMO_TAG_MANAGER_CONTAINER_URL_LIVE;
         case 'Staging':
            return process.env
               .NEXT_PUBLIC_MATOMO_TAG_MANAGER_CONTAINER_URL_STAGING;
         case 'Dev':
            return process.env.NEXT_PUBLIC_MATOMO_TAG_MANAGER_CONTAINER_URL_DEV;
         default:
            throw new SentryError(
               `Unknown environment: ${environment}\nPick from: Live, Staging, Dev`
            );
      }
   })();

   if (!configUrl) {
      return null;
   }

   const scriptTag = `
        var c = "${configUrl}";

        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});

        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=c; s.parentNode.insertBefore(g,s);
    `;

   return <script dangerouslySetInnerHTML={{ __html: scriptTag }} />;
}

export function TagManager() {
   return (
      <Head>
         <GoogleScript key="GoogleScript" />
         <MatomoScript key="MatomoScript" />
      </Head>
   );
}

import Head from 'next/head';
import React from 'react';

// This is public so no need to hide.
const GET_PARAM = 'matomoTagManager';
const DEFAULT_ENV = 'Live';

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
            throw new Error(
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
         <MatomoScript key="MatomoScript" />
      </Head>
   );
}

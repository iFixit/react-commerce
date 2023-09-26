import * as React from 'react';
import Head from 'next/head';

const API_KEY = '59NVBFN';

export function GoogleTagManger() {
   return (
      <Head>
         <script
            dangerouslySetInnerHTML={{
               __html: `
            (function(w,d,s,l,i) {
               w[l]=w[l]||[];
               w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
               var f=d.getElementsByTagName(s)[0],
               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
               j.async=true;
               j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
               f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-${API_KEY}');`,
            }}
         />
      </Head>
   );
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

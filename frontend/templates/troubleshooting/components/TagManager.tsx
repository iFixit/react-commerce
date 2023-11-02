import Head from 'next/head';
import React from 'react';

// This is public so no need to hide.
const API_KEY = '59NVBFN';

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

export function TagManager() {
   return (
      <Head>
         <GoogleScript key="GoogleScript" />
      </Head>
   );
}

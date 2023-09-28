import { IFIXIT_ORIGIN, POLYFILL_DOMAIN } from '@config/env';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Metadata } from 'next';
config.autoAddCss = false;

const polyfillDomain = POLYFILL_DOMAIN ?? 'https://polyfill.io';

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <head>
            <link
               rel="apple-touch-icon"
               sizes="57x57"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-57x57.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="60x60"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-60x60.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="72x72"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-72x72.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="76x76"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-76x76.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="114x114"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-114x114.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="120x120"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-120x120.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="144x144"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-144x144.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="152x152"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-152x152.png"
            />
            <link
               rel="apple-touch-icon"
               sizes="180x180"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-180x180.png"
            />
            <link
               rel="icon"
               type="image/png"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-32x32.png"
               sizes="32x32"
            />
            <link
               rel="icon"
               type="image/png"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/android-chrome-192x192.png"
               sizes="192x192"
            />
            <link
               rel="icon"
               type="image/png"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-96x96.png"
               sizes="96x96"
            />
            <link
               rel="icon"
               type="image/png"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-16x16.png"
               sizes="16x16"
            />
            <link
               rel="manifest"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/manifest.json"
            />
            <link
               rel="mask-icon"
               href="https://assets.cdn.ifixit.com/static/icons/ifixit/safari-pinned-tab.svg"
               color="#5bbad5"
            />
            <link
               rel="prefetch"
               href={`${IFIXIT_ORIGIN}/api/2.0/user`}
               as="fetch"
            />
            {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
            <Script
               src={`${polyfillDomain}/v3/polyfill.min.js?features=default,Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en,Object.fromEntries,ResizeObserver`}
               strategy="beforeInteractive"
            />
         </head>
         <body>
            {children}
            <Analytics />
         </body>
      </html>
   );
}

export const metadata: Metadata = {
   // TODO: enrich this default data
   title: 'iFixit',
   openGraph: {
      type: 'website',
      title: 'iFixit',
   },
};

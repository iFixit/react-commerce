import { IFIXIT_ORIGIN, POLYFILL_DOMAIN } from '@config/env';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const polyfillDomain = POLYFILL_DOMAIN ?? 'https://polyfill.io';
class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <style
                  dangerouslySetInnerHTML={{
                     __html: `:root {
                        --chakra-colors-chakra-border-color: #e5e7eb;
                     }`,
                  }}
               />
               <link
                  rel="prefetch"
                  href={`${IFIXIT_ORIGIN}/api/2.0/user`}
                  as="fetch"
               />
               <Script
                  src={`${polyfillDomain}/v3/polyfill.min.js?features=default,Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en,Object.fromEntries,ResizeObserver`}
                  strategy="beforeInteractive"
               />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;

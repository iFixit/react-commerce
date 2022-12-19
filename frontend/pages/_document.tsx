import { IFIXIT_ORIGIN } from '@config/env';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin="anonymous"
               />
               <link
                  href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Lato:wght@400;700&display=swap"
                  rel="stylesheet"
               />
               <link
                  rel="prefetch"
                  href={`${IFIXIT_ORIGIN}/api/2.0/user`}
                  as="fetch"
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

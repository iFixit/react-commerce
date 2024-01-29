import { IFIXIT_ORIGIN } from '@config/env';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
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

import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import React from 'react';
import { useAppContext } from '@ifixit/app';

const Wiki: NextPageWithLayout<{ layoutProps: DefaultLayoutProps }> = () => {
   const appContext = useAppContext();
   const client = new IFixitAPIClient({ origin: appContext.ifixitOrigin });

   const { wikiname } = useRouter().query;
   const [wikiData, setWikiData] = React.useState(null);
   React.useEffect(() => {
      client
         .get(`wikis/WIKI/${wikiname}`, {
            credentials: 'include',
         })
         .then((res: any) => {
            setWikiData(res);
         });
   }, [wikiname]);
   if (!wikiData) {
      return <p>waiting</p>
   }
   return (
      <div>
         <Head>
            <meta name="robots" content="noindex" />
         </Head>
         <h1>Wiki {wikiname}</h1>
         <p dangerouslySetInnerHTML={{ __html: wikiData.contents_rendered }} />
      </div>
   );
};

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;

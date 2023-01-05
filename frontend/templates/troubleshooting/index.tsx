import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';
import Head from 'next/head';

const Wiki: NextPageWithLayout<{ layoutProps: DefaultLayoutProps }> = () => {
   const { wikiname } = useRouter().query;
   return (
      <div>
         <Head>
            <meta name="robots" content="noindex" />
         </Head>
         Wiki {wikiname}
      </div>
   );
};

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;

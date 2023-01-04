import { useRouter } from 'next/router';
import { DefaultLayout } from '@layouts/default';
import { DefaultLayoutProps } from '@layouts/default/server';

const Wiki: NextPageWithLayout<{ layoutProps: DefaultLayoutProps }> = () => {
   const { wikiname } = useRouter().query;
   return <div>Wiki {wikiname}</div>;
};

Wiki.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default Wiki;

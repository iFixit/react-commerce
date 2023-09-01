import { DefaultLayout } from '@layouts/default';
import * as React from 'react';
import { ViewCartTemplateProps } from './useViewCartProps';
import { ShoppingCart } from '@ifixit/ui';

const ViewCartTemplate: NextPageWithLayout<ViewCartTemplateProps> = () => {
   return <ShoppingCart />;
};

ViewCartTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ViewCartTemplate;

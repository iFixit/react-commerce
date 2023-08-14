// import { Box, Flex } from '@chakra-ui/react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { DefaultLayout } from '@layouts/default';
import * as React from 'react';
import { useCart } from '@ifixit/cart-sdk';
import { ViewCartTemplateProps, useViewCartProps } from './useViewCartProps';
import { Box } from '@chakra-ui/react';
// import { CartLineItem } from '@ifixit/cart-sdk';
import { Wrapper } from '@ifixit/ui';
import { ShoppingCart } from '@ifixit/ui';

const ViewCartTemplate: NextPageWithLayout<ViewCartTemplateProps> = () => {
   return <ShoppingCart />;
};

ViewCartTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ViewCartTemplate;

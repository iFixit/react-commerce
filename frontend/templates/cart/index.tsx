// import { Box, Flex } from '@chakra-ui/react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { DefaultLayout } from '@layouts/default';
import * as React from 'react';
import { useCart } from '@ifixit/cart-sdk';
import { ViewCartTemplateProps, useViewCartProps } from './useViewCartProps';

const ViewCartTemplate: NextPageWithLayout<ViewCartTemplateProps> = () => {
   const { cart } = useCart();

   return <React.Fragment>Empty Cart</React.Fragment>;
};

ViewCartTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ViewCartTemplate;

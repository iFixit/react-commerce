// import { Box, Flex } from '@chakra-ui/react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { DefaultLayout } from '@layouts/default';
import * as React from 'react';
import { useCart } from '@ifixit/cart-sdk';
import { ViewCartTemplateProps, useViewCartProps } from './useViewCartProps';
import { Heading, Box } from '@chakra-ui/react';
import { CartLineItem } from '@ifixit/cart-sdk';
import { Wrapper } from '@ifixit/ui';

const ViewCartTemplate: NextPageWithLayout<ViewCartTemplateProps> = () => {
   return (
      <Wrapper>
         <Heading>Shopping Cart</Heading>
         <CartContents />
      </Wrapper>
   );
};

function CartContents() {
   const cart = useCart();
   if (!cart.isLoading && !cart.data) {
      return <EmptyCart />;
   }
   return (
      <Box>
         {cart.data?.lineItems.map((item) => (
            <LineItem key={item.itemcode} lineItem={item} />
         ))}
      </Box>
   );
}

function EmptyCart() {
   return <Box>Your cart is empty</Box>;
}

function LineItem({ lineItem: CartLineItem }) {
   return <Box>{CartLineItem.itemcode}</Box>;
}

ViewCartTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ViewCartTemplate;

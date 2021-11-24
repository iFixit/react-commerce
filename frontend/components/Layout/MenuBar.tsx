import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import * as React from 'react';

export const MenuBar = forwardRef<FlexProps, 'ul'>((props, ref) => {
   return <Flex ref={ref} as="ul" role="menubar" {...props} />;
});

export const Submenu = forwardRef<FlexProps, 'ul'>((props, ref) => {
   return <Flex ref={ref} as="ul" role="menu" {...props} />;
});

export const MenuItem = forwardRef<FlexProps, 'li'>((props, ref) => {
   return <Flex ref={ref} as="li" role="none" {...props} />;
});

export const SubmenuButton = forwardRef<FlexProps, 'button'>((props, ref) => {
   return (
      <Flex ref={ref} as="ul" role="menuitem" aria-haspopup="true" {...props} />
   );
});

export const MenuLink = forwardRef<FlexProps, 'a'>((props, ref) => {
   return <Flex ref={ref} as="a" role="menuitem" {...props} />;
});

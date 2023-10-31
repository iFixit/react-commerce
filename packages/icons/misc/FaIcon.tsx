import type * as React from 'react';
import { ChakraComponent, ChakraProps, chakra } from '@chakra-ui/react';
import {
   FontAwesomeIcon,
   FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export const FaIcon = chakra(FontAwesomeIcon, {
   baseStyle: {
      display: 'flex',
      alignItems: 'center',
   },
});

export type FaIconProps = React.ComponentProps<typeof FaIcon>;

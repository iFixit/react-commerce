import { ChakraComponent, ChakraProps, chakra } from '@chakra-ui/react';
import {
   FontAwesomeIcon,
   FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export type FaIconProps = ChakraProps & FontAwesomeIconProps;

export const FaIcon = chakra(FontAwesomeIcon, {
   baseStyle: {
      display: 'flex',
      alignItems: 'center',
   },
}) as ChakraComponent<typeof FontAwesomeIcon, FontAwesomeIconProps>;

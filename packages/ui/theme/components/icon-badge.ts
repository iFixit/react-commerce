import { ComponentStyleConfig } from '@chakra-ui/react';

const IconBadge: ComponentStyleConfig = {
   parts: ['container', 'icon', 'label'],
   baseStyle: {
      container: {
         px: '1.5',
         borderWidth: '1px',
         borderRadius: 'base',
         maxW: 'full',
         flexShrink: '0',
         display: 'flex',
         alignItems: 'center',
         fontWeight: 'semibold',
         wordBreak: 'break-all',
      },
      icon: {
         display: 'block',
         h: '4',
         mr: '1',
      },
      label: {
         noOfLines: '1',
      },
   },
   sizes: {
      tiny: {
         container: {
            py: '0.5',
            fontSize: '2xs',
            lineHeight: '14px',
         },
      },
      small: {
         container: {
            py: '3px',
            fontSize: '13px',
            lineHeight: '4',
         },
      },
      base: {
         container: {
            py: '3px',
            fontSize: 'sm',
            lineHeight: '5',
         },
      },
   },
};

export default IconBadge;

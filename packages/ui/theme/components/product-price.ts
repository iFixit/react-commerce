import { ComponentStyleConfig } from '@chakra-ui/react';

const ProductPrice: ComponentStyleConfig = {
   parts: [
      'container',
      'price',
      'compareAtPrice',
      'proBadgeHorizontal',
      'proBadgeVertical',
   ],
   baseStyle: {
      container: {
         display: 'flex',
         alignSelf: 'flex-start',
      },
      price: {
         fontWeight: 'semibold',
         display: 'flex',
         alignItems: 'center',
      },
      proBadgeVertical: {
         h: '4',
         mr: '1.5',
         display: 'inline-block',
      },
      compareAtPrice: {
         color: 'gray.500',
         textDecor: 'line-through',
      },
   },
   sizes: {
      'extra-small': {
         price: {
            fontSize: 'xs',
         },
         compareAtPrice: {
            fontSize: 'xs',
         },
         proBadgeHorizontal: {
            py: '3px',
            fontSize: '10px',
            lineHeight: '4',
         },
         proBadgeVertical: {
            h: 4,
         },
      },
      small: {
         price: {
            fontSize: 'sm',
         },
         compareAtPrice: {
            fontSize: 'sm',
         },
         proBadgeHorizontal: {
            py: '3px',
            fontSize: '13px',
            lineHeight: '4',
         },
         proBadgeVertical: {
            h: 4,
         },
      },
      medium: {
         price: {
            fontSize: 'md',
         },
         compareAtPrice: {
            fontSize: 'sm',
         },
         proBadgeHorizontal: {
            py: '3px',
            fontSize: '13px',
            lineHeight: '4',
         },
         proBadgeVertical: {
            h: 4,
         },
      },
      large: {
         price: {
            fontSize: 'xl',
         },
         compareAtPrice: {
            fontSize: 'md',
         },
         proBadgeHorizontal: {
            py: '3px',
            fontSize: 'sm',
            lineHeight: '5',
         },
         proBadgeVertical: {
            h: 5,
         },
      },
   },
};

export default ProductPrice;

import { ComponentStyleConfig } from '@chakra-ui/react';

type AccessibleColor = {
   bg?: string;
   color?: string;
   hoverBg?: string;
   activeBg?: string;
};

const accessibleColorMap: { [key: string]: AccessibleColor } = {
   yellow: {
      bg: 'yellow.400',
      color: 'black',
      hoverBg: 'yellow.500',
      activeBg: 'yellow.600',
   },
   cyan: {
      bg: 'cyan.400',
      color: 'black',
      hoverBg: 'cyan.500',
      activeBg: 'cyan.600',
   },
};

const Pagination: ComponentStyleConfig = {
   parts: ['container', 'item', 'button', 'pageButton', 'link', 'pageLink'],
   baseStyle: (props) => ({
      button: button(),
      pageButton: pageButton(props),
      link: button(),
      pageLink: pageButton(props),
   }),
   sizes: {
      sm: {
         button: {
            h: 8,
            minW: 8,
            fontSize: 'sm',
            px: 1,
         },
         pageButton: {
            h: 8,
            minW: 8,
            fontSize: 'sm',
            px: 1,
         },
         link: {
            h: 8,
            minW: 8,
            fontSize: 'sm',
            px: 1,
         },
         pageLink: {
            h: 8,
            minW: 8,
            fontSize: 'sm',
            px: 1,
         },
      },
      md: {
         button: {
            h: 9,
            minW: 9,
            fontSize: 'md',
            px: 2,
         },
         pageButton: {
            h: 9,
            minW: 9,
            fontSize: 'md',
            px: 2,
         },
         link: {
            h: 9,
            minW: 9,
            fontSize: 'md',
            px: 2,
         },
         pageLink: {
            h: 9,
            minW: 9,
            fontSize: 'md',
            px: 2,
         },
      },
   },
   defaultProps: {
      size: 'md',
      colorScheme: 'blue',
   },
};

function button(): Record<string, any> {
   return {
      borderRadius: 'md',
      borderWidth: '1px',
      borderColor: 'gray.200',
      color: 'gray.500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'semibold',
      lineHeight: '1.2',
      outline: 'none',
      p: '0',
      _focus: {
         boxShadow: 'outline',
      },
      _disabled: {
         opacity: 0.5,
         cursor: 'not-allowed',
         boxShadow: 'none',
      },
      _hover: {
         bg: 'gray.50',
         _disabled: {
            bg: 'initial',
         },
      },
      _active: {
         bg: 'gray.100',
      },
   };
}

function pageButton({ colorScheme }: any): Record<string, any> {
   const { bg = `${colorScheme}.500`, color = 'white' } =
      accessibleColorMap[colorScheme!] || {};

   return {
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '1.2',
      borderRadius: 'md',
      fontWeight: 'semibold',
      _focus: {
         boxShadow: 'outline',
      },
      _disabled: {
         opacity: 0.4,
         cursor: 'not-allowed',
         boxShadow: 'none',
      },
      _hover: {
         bg: `${colorScheme}.50`,
         _disabled: {
            bg: 'initial',
         },
      },
      _active: {
         bg: `${colorScheme}.100`,
      },
      _activeLink: {
         bg,
         color,
         cursor: 'default',
      },
   };
}

export default Pagination;

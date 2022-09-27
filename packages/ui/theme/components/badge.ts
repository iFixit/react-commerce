import { ComponentStyleConfig } from '@chakra-ui/react';

const Badge: ComponentStyleConfig = {
   baseStyle: {
      px: 1.5,
      py: 1,
      fontWeight: 'semibold',
      fontSize: 'sm',
      lineHeight: '1em',
      borderRadius: 'md',
      textTransform: 'none',
   },
   variants: {
      outline: (props) => {
         const schemeColors = props.theme.colors[props.colorScheme];
         return {
            bg: schemeColors[100],
            color: schemeColors[700],
            boxShadow: `inset 0 0 0px 1px ${schemeColors[300]}`,
         };
      },
   },
   defaultProps: {
      variant: 'outline',
   },
};

export default Badge;

import { ComponentStyleConfig } from '@chakra-ui/react';

const Alert: ComponentStyleConfig = {
   baseStyle: {},
   variants: {
      subtle: (props) => {
         console.log('hey subtle');
         const schemeColors = props.theme.colors[props.colorScheme];
         return {
            container: {
               borderWidth: '1px',
               borderColor: schemeColors[300],
               borderRadius: 'base',
            },
         };
      },
   },
};

export default Alert;

import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
   createMultiStyleConfigHelpers(parts.keys);

const STATUSES: Record<string, string> = {
   default: 'gray',
   info: 'brand',
   warning: 'amber',
   success: 'green',
   error: 'red',
   loading: 'blue',
};

const subtle = definePartsStyle((props) => {
   const status: string = props.status ?? 'default';
   const colorScheme: string = STATUSES[status];

   return {
      container: {
         bgColor: status === 'default' ? `${colorScheme}.100` : 'transparent',
         border: '1px',
         borderColor: `${colorScheme}.300`,
         borderRadius: 'base',
         _light: {
            bgColor: `${colorScheme}.50`,
         },
      },
   };
});

const variants = {
   subtle,
};

const Alert = defineMultiStyleConfig({
   variants,
});

export default Alert;

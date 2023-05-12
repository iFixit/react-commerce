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

const BACKGROUNDS: Record<string, string> = {
   default: '100',
   info: '100',
   warning: '50',
   success: '50',
   error: '50',
   loading: '100',
};

const FOREGROUNDS: Record<string, string> = {
   default: '300',
   info: '300',
   warning: '300',
   success: '200',
   error: '300',
   loading: '300',
};

const subtle = definePartsStyle((props) => {
   const status: string = props.status ?? 'default';
   const colorScheme: string = STATUSES[status];
   const backgroundScheme: string = BACKGROUNDS[status];
   const foregroundScheme: string = FOREGROUNDS[status];

   return {
      container: {
         background: `${colorScheme}.${backgroundScheme}`,
         borderWidth: '1px',
         borderColor: `${colorScheme}.${foregroundScheme}`,
         borderRadius: 'base',
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

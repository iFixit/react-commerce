import { FormLabel, FormLabelProps } from '@chakra-ui/react';
import * as React from 'react';

export function ScreenOnlyLabel({ ...otherProps }: FormLabelProps) {
   return (
      <FormLabel
         position="absolute"
         w="1px"
         h="1px"
         p="0"
         m="-1px"
         overflow="hidden"
         sx={{
            clip: 'rect(0,0,0,0)',
         }}
         whiteSpace="nowrap"
         borderWidth="0"
         {...otherProps}
      />
   );
}

import {
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverContent,
   PopoverTrigger,
} from '@chakra-ui/react';
import React from 'react';

export interface TooltipProps {
   trigger: React.ReactNode;
   content: React.ReactNode;
}

export function Tooltip({ trigger, content }: TooltipProps) {
   return (
      <Popover trigger="hover">
         <PopoverTrigger>{trigger}</PopoverTrigger>
         <PopoverContent>
            <PopoverArrow backgroundColor="gray.800" />
            <PopoverBody
               borderRadius="md"
               backgroundColor="gray.800"
               color="white"
               fontSize="13px"
               sx={{
                  '& a': {
                     color: 'white',
                     fontWeight: 'semibold',
                     textDecoration: 'underline',
                  },
               }}
            >
               {content}
            </PopoverBody>
         </PopoverContent>
      </Popover>
   );
}

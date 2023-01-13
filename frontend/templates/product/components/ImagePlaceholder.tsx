import { Box, BoxProps, Circle, forwardRef } from '@chakra-ui/react';
import { faImage } from '@fortawesome/pro-duotone-svg-icons/faImage';
import { FaIcon } from '@ifixit/icons';

export const ImagePlaceholder = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box ref={ref} bgColor="gray.100" borderRadius="md" {...otherProps}>
            <Circle bgColor="gray.200" size="72px">
               <FaIcon
                  icon={faImage}
                  h="8"
                  color="gray.500"
                  transition="color 300ms"
               />
            </Circle>
         </Box>
      );
   }
);

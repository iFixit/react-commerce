import { Box, BoxProps, Circle, forwardRef, useTheme } from '@chakra-ui/react';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ImagePlaceholder = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      const theme = useTheme();
      return (
         <Box ref={ref} bgColor="gray.100" borderRadius="md" {...otherProps}>
            <Circle bgColor="gray.200" size="72px">
               <FontAwesomeIcon
                  icon={faImage}
                  color={theme.colors.gray[500]}
                  style={{
                     width: '32px',
                     height: '32px',
                     transition: 'color 300ms',
                  }}
               />
            </Circle>
         </Box>
      );
   }
);

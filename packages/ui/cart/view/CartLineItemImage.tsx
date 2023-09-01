import { Box, Center } from '@chakra-ui/react';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { ResponsiveImage } from '../../misc';

interface CartLineItemImageProps {
   src?: string | null;
   alt?: string;
}

export function CartLineItemImage({ src, alt }: CartLineItemImageProps) {
   return (
      <Box
         boxSize="74px"
         position="relative"
         borderColor="gray.300"
         borderWidth="1px"
         borderRadius="md"
         overflow="hidden"
         flexShrink={0}
      >
         {src ? (
            <ResponsiveImage
               src={src}
               alt={alt || ''}
               priority
               height={72}
               width={72}
               style={{
                  objectFit: 'cover',
               }}
            />
         ) : (
            <Center bgColor="gray.100" h="full">
               <FaIcon
                  icon={faImage}
                  color="gray.500"
                  h="6"
                  transition="color 300ms"
               />
            </Center>
         )}
      </Box>
   );
}

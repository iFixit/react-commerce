import { Circle, Flex } from '@chakra-ui/react';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { ResponsiveImage } from '@ifixit/ui';
import type { Image } from '@models/components/image';

interface ThumbnailProps {
   variant?: 'small' | 'medium';
   image: Image | null;
   alt?: string;
}

export function Thumbnail({ variant, image, alt = '' }: ThumbnailProps) {
   const size = variant === 'small' ? 48 : 80;

   const url = image?.thumbnailUrl ?? image?.url;

   return (
      <Flex
         w={size / 4}
         h={size / 4}
         position="relative"
         borderWidth="1px"
         borderColor="borderColor"
         borderRadius="base"
         borderStyle="solid"
         boxSizing="content-box"
         alignItems="center"
         justify="center"
         bgColor={url ? 'white' : 'gray.100'}
         mr="2"
         flexShrink={0}
         overflow="hidden"
      >
         {url ? (
            <ResponsiveImage
               src={url}
               alt={alt}
               style={{ objectFit: 'contain' }}
               priority
               height={size}
               width={size}
            />
         ) : (
            <Circle bgColor="gray.200" size={size / 6}>
               <FaIcon
                  icon={faImage}
                  color="gray.500"
                  h="5"
                  transition="color 300ms"
               />
            </Circle>
         )}
      </Flex>
   );
}

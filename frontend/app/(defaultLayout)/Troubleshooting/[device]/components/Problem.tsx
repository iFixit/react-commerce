import * as React from 'react';
import {
   Box,
   Flex,
   HStack,
   Image,
   LinkBox,
   LinkOverlay,
   Stack,
   Text,
} from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FaIcon } from '@ifixit/icons';

export function Problem({
   problemTitle,
   problemUrl,
   deviceTitle,
   description,
   imageSrcStandard,
   imageSrcThumbnail,
   problemTypeIcon,
   altText,
   badges,
}: any) {
   return (
      <LinkBox
         display="flex"
         flexDirection="column"
         bgColor="white"
         border="1px solid"
         borderColor="gray.300"
         borderRadius="md"
         overflow="hidden"
         transition="border-color 0.2s"
         _hover={{
            borderColor: 'brand.500',
         }}
      >
         <Stack direction="row" spacing={3} alignSelf="stretch" p={4} flex="1">
            {imageSrcStandard ? (
               <Image src={imageSrcStandard} alt={altText} {...lgImageStyles} />
            ) : (
               <Flex {...imagePlaceholderStyles}>
                  <FaIcon
                     icon={problemTypeIcon as IconProp}
                     size="3x"
                     color="brand.400"
                     m="auto"
                  />
               </Flex>
            )}
            <Stack className="content" spacing={3} flex="auto">
               <Stack className="title" spacing={1} flex="1">
                  <LinkOverlay href={problemUrl}>
                     <Text fontWeight="semibold" noOfLines={3}>
                        {problemTitle}
                     </Text>
                  </LinkOverlay>
                  <Text color="gray.500" fontSize="sm" noOfLines={3}>
                     {description}
                  </Text>
               </Stack>
               {badges && <HStack className="badges" spacing={1.5}></HStack>}
            </Stack>
         </Stack>
         <HStack
            className="device"
            spacing={1.5}
            alignItems="center"
            bgColor="blueGray.100"
            borderTop="1px solid"
            borderColor="gray.200"
            py={1.5}
            px={4}
         >
            <Image
               src={imageSrcThumbnail}
               alt={altText}
               {...thumbImageStyles}
            />
            <Box fontSize="sm" fontWeight="semibold" noOfLines={2}>
               {deviceTitle}
            </Box>
         </HStack>
      </LinkBox>
   );
}

const imageStyles = {
   border: '1px solid',
   borderColor: 'gray.300',
   borderRadius: 'md',
   aspectRatio: '4 / 3',
};

const thumbImageStyles = {
   ...imageStyles,
   width: '32px',
   height: '32px',
};

const lgImageStyles = {
   ...imageStyles,
   width: '96px',
   height: '72px',
};

const imagePlaceholderStyles = {
   ...lgImageStyles,
   width: '100%',
   bgColor: 'brand.100',
};

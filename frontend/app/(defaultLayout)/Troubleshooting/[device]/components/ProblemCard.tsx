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

export function ProblemCard({
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
            cursor: 'pointer',
         }}
      >
         <Stack
            direction="row"
            spacing={{ base: 3, sm: 4 }}
            alignSelf="stretch"
            p={{ base: 4, sm: 5 }}
            flex="1"
            color="gray.900"
         >
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
            <Stack className="content" spacing={4} flex="auto">
               <Stack className="title" spacing={1.5} flex="1">
                  <LinkOverlay href={problemUrl}>
                     <Text fontWeight="semibold" noOfLines={3}>
                        {problemTitle}
                     </Text>
                  </LinkOverlay>
                  <Text color="gray.600" fontSize="sm" noOfLines={3}>
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
            py={2}
            px={{ base: 4, sm: 5 }}
         >
            <Image
               src={imageSrcThumbnail}
               alt={altText}
               {...thumbImageStyles}
            />
            <Box fontSize="sm" fontWeight="semibold" noOfLines={1}>
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
   width: '48px',
   height: '36px',
};

const lgImageStyles = {
   ...imageStyles,
   width: { base: '72px', sm: '96px' },
   height: { base: '54px', sm: '72px' },
};

const imagePlaceholderStyles = {
   ...lgImageStyles,
   width: '100%',
   bgColor: 'brand.100',
};

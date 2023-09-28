import {
   Flex,
   Stack,
   Image,
   LinkBox,
   LinkOverlay,
   Text,
} from '@chakra-ui/react';
import { Problem } from './hooks/useTroubleshootingProps';

export default function ProblemCard({ problem }: { problem: Problem }) {
   const { title, deviceTitle, imageUrl, url } = problem;
   return (
      <LinkBox
         flex="1"
         overflow="hidden"
         borderColor="gray.300"
         borderWidth="1px"
         borderRadius="md"
         backgroundColor="white"
         transition={`border-color var(--chakra-transition-duration-normal)`}
         _hover={{ borderColor: 'brand.500' }}
      >
         <Flex padding={3} alignSelf="stretch">
            <Image
               boxSize="48px"
               htmlWidth={48}
               htmlHeight={48}
               objectFit="cover"
               src={imageUrl}
               alt={deviceTitle}
               outline="1px solid"
               outlineColor="gray.300"
               borderRadius="md"
               loading="lazy"
               mr={2}
            />
            <Stack spacing="0" fontWeight="semibold" fontSize="sm">
               <Text color="gray.900">{deviceTitle}</Text>
               <LinkOverlay href={url} color="brand.500" alignSelf="stretch">
                  {title}
               </LinkOverlay>
            </Stack>
         </Flex>
      </LinkBox>
   );
}

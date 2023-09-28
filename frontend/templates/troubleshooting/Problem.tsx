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
         padding={3}
         fontWeight="semibold"
      >
         <Flex align="center">
            <Image
               boxSize="32px"
               htmlWidth={32}
               htmlHeight={32}
               objectFit="cover"
               src={imageUrl}
               alt={deviceTitle}
               outline="1px solid"
               outlineColor="gray.300"
               borderRadius="md"
               mr={2}
            />
            <Text>{deviceTitle}</Text>
         </Flex>
         <Stack spacing={2} mt={2}>
            <LinkOverlay href={url} color="brand.500">
               {title}
            </LinkOverlay>
         </Stack>
      </LinkBox>
   );
}

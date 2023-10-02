import {
   Grid,
   GridItem,
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
         <Grid
            templateAreas={{
               base: `
                  "image title"
                  "image link"
               `,
               md: `
                  "image title"
                  "image title"
                  "link link"
               `,
            }}
            gridTemplateColumns={{ base: 'auto auto 1fr', md: 'auto 1fr' }}
         >
            <GridItem
               area="image"
               outline="1px solid"
               outlineColor="gray.300"
               borderRadius="md"
               boxSize={{ base: '56px', md: '32px' }}
               mr={2}
            >
               <Image
                  htmlWidth={56}
                  htmlHeight={56}
                  objectFit="cover"
                  src={imageUrl}
                  alt={deviceTitle}
               />
            </GridItem>
            <GridItem area="title" display={{ base: 'initial', md: 'flex' }}>
               <Text my="auto">{deviceTitle}</Text>
            </GridItem>
            <GridItem area="link" lineHeight="initial" mt={{ base: 0, md: 2 }}>
               <LinkOverlay href={url} color="brand.500" my="auto">
                  {title}
               </LinkOverlay>
            </GridItem>
         </Grid>
      </LinkBox>
   );
}

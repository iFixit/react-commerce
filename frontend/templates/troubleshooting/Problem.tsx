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
               lg: `
                  "image title"
                  "image title"
                  "link link"
               `,
            }}
            gridTemplateColumns="auto 1fr"
            gridTemplateRows="auto 1fr"
         >
            <GridItem
               area="image"
               outline="1px solid"
               outlineColor="gray.300"
               borderRadius="md"
               width={{ base: '75px', lg: '43px' }}
               height={{ base: '56px', lg: '32px' }}
               mr={2}
               aspectRatio="4 / 3"
               overflow="hidden"
            >
               <Image
                  height="100%"
                  htmlWidth={75}
                  htmlHeight={56}
                  objectFit="cover"
                  src={imageUrl}
                  alt={deviceTitle}
               />
            </GridItem>
            <GridItem area="title" display={{ base: 'initial', lg: 'flex' }}>
               <Text>{deviceTitle}</Text>
            </GridItem>
            <GridItem
               area="link"
               lineHeight="initial"
               mt={{ base: 1.5, lg: 2 }}
            >
               <LinkOverlay href={url} color="brand.500">
                  {title}
               </LinkOverlay>
            </GridItem>
         </Grid>
      </LinkBox>
   );
}

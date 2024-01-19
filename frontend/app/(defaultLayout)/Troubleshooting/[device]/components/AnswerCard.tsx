import {
   Grid,
   GridItem,
   Image,
   LinkBox,
   LinkOverlay,
   Text,
} from '@chakra-ui/react';
import {
   Answers,
   TroubleshootingProblemsApiData,
} from '../hooks/useTroubleshootingProblemsProps';

export function AnswerCard({
   answer,
}: {
   answer: Answers & TroubleshootingProblemsApiData;
}) {
   const { title, url, imageUrl, deviceTitle } = answer;

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
            templateAreas={`
                  "image link"
                  "image title"
               `}
            gridTemplateColumns="auto 1fr"
            gridTemplateRows="auto 1fr"
            gap={1.5}
         >
            <GridItem
               area="image"
               outline="1px solid"
               outlineColor="gray.300"
               borderRadius="md"
               width={{ lg: '64px' }}
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
            <GridItem area="link" lineHeight="initial">
               <LinkOverlay href={url} color="brand.500">
                  {title}
               </LinkOverlay>
            </GridItem>
         </Grid>
      </LinkBox>
   );
}

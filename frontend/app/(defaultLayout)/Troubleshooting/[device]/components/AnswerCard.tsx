import {
   Grid,
   GridItem,
   Image,
   LinkBox,
   LinkOverlay,
   Stack,
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
         overflow="hidden"
         borderColor="gray.300"
         borderWidth="1px"
         borderRadius="md"
         backgroundColor="white"
         transition={`border-color var(--chakra-transition-duration-normal)`}
         _hover={{ borderColor: 'brand.500' }}
         padding={{ base: 2, sm: 3 }}
         fontWeight="semibold"
      >
         <Grid
            templateAreas={`
                  "image text"
               `}
            gridTemplateColumns="75px 1fr"
            gap={2}
         >
            <GridItem
               area="image"
               outline="1px solid"
               outlineColor="gray.300"
               borderRadius="md"
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
            <GridItem area="text" display="flex" fontSize="sm">
               <Stack spacing={1.5} justifyContent="center" lineHeight="normal">
                  <LinkOverlay href={url} color="brand.500">
                     <Text noOfLines={5}>{title}</Text>
                  </LinkOverlay>
                  <Text>{deviceTitle}</Text>
               </Stack>
            </GridItem>
         </Grid>
      </LinkBox>
   );
}

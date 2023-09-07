import {
   Box,
   Stack,
   Text,
   Badge,
   Square,
   Flex,
   BoxProps,
   VStack,
} from '@chakra-ui/react';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import {
   SectionGuide,
   SectionProduct,
   SolutionSection,
} from './hooks/useTroubleshootingProps';
import { PrerenderedHTML } from '@components/common';
import { GuideResource, ProductResource } from './Resource';
import { HeadingSelfLink } from './components/HeadingSelfLink';
import { LinkToTOC } from './tocContext';

const SolutionHeader = ({
   index,
   title,
   id,
   popularity,
}: {
   index: number;
   title: string;
   id: string;
   popularity?: number;
}) => (
   <Stack
      direction="row"
      justify="flex-start"
      align="flex-start"
      alignContent="center"
      spacing="16px"
   >
      <Stack direction="row" justify="flex-start" align="center" spacing="10px">
         <Square
            borderRadius="4px"
            borderColor="brand.700"
            borderWidth="1px"
            size="40px"
            bg="brand.500"
            fontWeight="semibold"
            fontSize="18px"
            color="white"
         >
            {index}
         </Square>
      </Stack>
      <HeadingSelfLink
         fontWeight="medium"
         fontSize="24px"
         color="brand.500"
         alignSelf="center"
         id={id}
      >
         {title}
      </HeadingSelfLink>
      {popularity !== undefined && (
         <Stack direction="row" justify="flex-start" align="flex-start">
            <Badge
               title={`${popularity}%`}
               w="fit-content"
               color="Gray"
               size="Base"
            >
               <FaIcon icon={faCircleCheck} />
               <Stack justify="center" align="flex-start" spacing="10px">
                  <Text fontWeight="semibold" fontSize="14px" color="gray.700">
                     {popularity}%
                  </Text>
               </Stack>
            </Badge>
         </Stack>
      )}
   </Stack>
);

const SolutionTexts = ({ body }: { body: string }) => (
   <>
      <PrerenderedHTML html={body} template="troubleshooting" />
   </>
);

export default function SolutionCard({
   index,
   solution,
}: {
   index: number;
   solution: SolutionSection;
}) {
   const { ref } = LinkToTOC<HTMLDivElement>(solution.heading);
   return (
      <Box
         id={solution.id}
         background="white"
         borderRadius="md"
         borderColor="gray.300"
         borderStyle="solid"
         borderWidth="1px"
         padding={{ base: 4, sm: 6 }}
         ref={ref}
      >
         <Flex direction="column" flexGrow={1}>
            <SolutionHeader
               id={solution.id}
               index={index}
               title={solution.heading}
            />
            <SolutionTexts body={solution.body} />
            {(solution.guides.length > 0 || solution.products.length > 0) && (
               <LinkCards
                  guides={solution.guides}
                  products={solution.products}
               />
            )}
         </Flex>
      </Box>
   );
}

function LinkCards({
   guides,
   products,
   ...props
}: { guides: SectionGuide[]; products: SectionProduct[] } & BoxProps) {
   const uniqueGuides = guides.filter(
      (guide, index) =>
         guides.findIndex((g) => g.guideid === guide.guideid) === index
   );
   return (
      <VStack spacing="6px" {...props}>
         {uniqueGuides.map((guide: SectionGuide) => (
            <GuideResource key={guide.guideid} guide={guide} />
         ))}
         {products.map((product: SectionProduct, index) => (
            <ProductResource key={index} product={product} />
         ))}
      </VStack>
   );
}

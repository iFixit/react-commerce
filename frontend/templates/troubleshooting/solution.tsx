import {
   Box,
   Stack,
   Text,
   Avatar,
   Button,
   Badge,
   Square,
   Flex,
   BoxProps,
   VStack,
} from '@chakra-ui/react';
import {
   faCircleCheck,
   faEllipsis,
   faPenToSquare,
   faSquareArrowUp,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { SolutionSection } from './hooks/useTroubleshootingProps';
import Prerendered from './prerendered';
import { GuideResource, ProductResource } from './Resource';
import { Guide } from './hooks/GuideModel';
import { Product } from '@models/product';
import { HeadingSelfLink } from './components/HeadingSelfLink';
import { solutionHeadingToId } from './utils/solutionHeadingToId';

const _SolutionFooter = () => (
   <Stack
      justify="flex-start"
      align="flex-start"
      spacing="4px"
      width="800px"
      maxWidth="100%"
   >
      <Stack
         paddingTop="12px"
         paddingBottom="8px"
         direction="row"
         justify="flex-start"
         align="center"
         spacing="4px"
         borderColor="gray.300"
         borderTopWidth="1px"
         alignSelf="stretch"
      >
         <Text fontSize="14px" color="gray.900" textAlign="center">
            This solution was suggested by
         </Text>
         <Avatar size="24x24">
            <Box width="24px" height="24px" />
         </Avatar>
         <Text
            fontWeight="semibold"
            fontSize="14px"
            color="brand.500"
            textAlign="center"
         >
            <span>Kyle Wiens</span>
            <Box as="span" color="gray.900">
               {' '}
               in{' '}
            </Box>
            <Box as="span">Pixel will not turn on</Box>
         </Text>
      </Stack>
      <Stack
         paddingTop="12px"
         paddingBottom="8px"
         direction="row"
         justify="flex-start"
         align="center"
         spacing="6px"
         borderColor="gray.300"
         borderTopWidth="1px"
         alignSelf="stretch"
      >
         <Button variant="outline" size="sm" bgColor="white" textColor="gray">
            <FaIcon icon={faSquareArrowUp} />
            <Text
               lineHeight="1.29"
               fontWeight="semibold"
               fontSize="14px"
               color="gray.600"
               textAlign="center"
            >
               82
            </Text>
         </Button>
         <Stack
            flex="1"
            alignSelf="stretch"
            justify="flex-start"
            align="flex-end"
            spacing="3px"
         >
            <Stack
               direction="row"
               justify="flex-start"
               align="flex-start"
               spacing="4px"
            >
               <Button
                  variant="outline"
                  size="sm"
                  bgColor="white"
                  textColor="gray"
               >
                  <FaIcon icon={faPenToSquare} />
                  <Text
                     lineHeight="1.29"
                     fontWeight="semibold"
                     fontSize="14px"
                     color="gray.600"
                     textAlign="center"
                  >
                     Edit
                  </Text>
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  bgColor="white"
                  textColor="gray"
               >
                  <FaIcon icon={faEllipsis} />
               </Button>
            </Stack>
         </Stack>
      </Stack>
   </Stack>
);

const SolutionHeader = ({
   index,
   title,
   popularity,
}: {
   index: number;
   title: string;
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
      <Prerendered html={body} />
   </>
);

export default function SolutionCard({
   index,
   solution,
}: {
   index: number;
   solution: SolutionSection;
}) {
   return (
      <Box
         id={solutionHeadingToId(solution.heading)}
         background="white"
         borderRadius="4px"
         borderColor="gray.300"
         borderStyle="solid"
         borderWidth="1px"
         padding="24px 24px 12px 24px"
      >
         <Flex gap="24px" direction="column" flexGrow={1}>
            <SolutionHeader index={index} title={solution.heading} />
            <SolutionTexts body={solution.body} />
            <LinkCards guides={solution.guides} products={solution.products} />
         </Flex>
      </Box>
   );
}

function LinkCards({
   guides,
   products,
   ...props
}: { guides: Guide[]; products: Product[] } & BoxProps) {
   return (
      <VStack spacing="6px" {...props}>
         {guides.map((guide: Guide) => (
            <GuideResource key={guide.guideid} guide={guide} />
         ))}
         {products.map((product: Product) => (
            <ProductResource key={product.id} product={product} />
         ))}
      </VStack>
   );
}

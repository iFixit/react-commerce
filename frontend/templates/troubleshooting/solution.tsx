import {
   Box,
   Heading,
   Stack,
   Text,
   Avatar,
   Button,
   Icon,
   Badge,
   Square,
   Flex,
} from '@chakra-ui/react';
import {
   faCircleCheck,
   faEllipsis,
   faPenToSquare,
   faSquareArrowUp,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { Section } from './hooks/useTroubleshootingProps';
import Prerendered from './prerendered';

const SolutionFooter = () => (
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
         <Text
            fontWeight="regular"
            fontSize="14px"
            color="gray.900"
            textAlign="center"
         >
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
            <Box as="span" fontWeight="regular" color="gray.900">
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
   popularity,
}: {
   index: number;
   popularity?: number;
}) => (
   <Stack
      direction="row"
      justify="flex-start"
      align="flex-start"
      alignContent="center"
      spacing="16px"
   >
      <Stack
         direction="row"
         justify="flex-start"
         align="center"
         spacing="10px"
         height="28px"
      >
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

const SolutionTexts = ({ title, body }: { title: string; body: string }) => (
   <Stack justify="flex-start" align="flex-start">
      <Heading
         fontWeight="medium"
         fontSize="24px"
         color="gray.900"
         alignSelf="stretch"
      >
         {title}
      </Heading>
      <Prerendered html={body} />
   </Stack>
);

export default function SolutionCard({
   index,
   solution,
}: {
   index: number;
   solution: Section;
}) {
   return (
      <Flex
         id={`solution-${index}`}
         background="white"
         borderRadius="4px"
         borderColor="gray.300"
         borderStyle="solid"
         borderWidth="1px"
         padding="24px 24px 12px 24px"
      >
         <Flex gap="24px" direction="column">
            <SolutionHeader index={index} />
            <SolutionTexts title={solution.heading} body={solution.body} />
         </Flex>
      </Flex>
   );
}

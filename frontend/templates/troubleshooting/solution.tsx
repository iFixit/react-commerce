import {
   Box,
   Heading,
   Stack,
   Text,
   Avatar,
   Button,
   Icon,
   Badge,
} from '@chakra-ui/react';
import { Problem } from './hooks/useTroubleshootingProps';
import Prerendered from './prerendered';

const SolutionFooter = () => (
   <Stack
      justify="flex-start"
      align="flex-start"
      spacing="4px"
      width="798.74px"
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
            fontFamily="SF Pro"
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
            fontFamily="SF Pro"
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
            <Icon /**iconName="square-arrow-up"*/ padding="square" scale="1x">
               <Text
                  fontFamily="Font Awesome 6 Pro"
                  fontWeight="solid"
                  fontSize="16px"
                  color="gray.500"
                  width="16px"
                  textAlign="center"
               >
                  square-arrow-up
               </Text>
            </Icon>
            <Text
               fontFamily="SF Pro"
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
                  <Icon
                     /*iconName="pen-to-square"*/ padding="square"
                     scale="1x"
                  >
                     <Text
                        fontFamily="Font Awesome 6 Pro"
                        fontWeight="solid"
                        fontSize="16px"
                        color="gray.500"
                        width="16px"
                        textAlign="center"
                     >
                        pen-to-square
                     </Text>
                  </Icon>
                  <Text
                     fontFamily="SF Pro"
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
                  <Icon /*iconName="ellipsis"*/ padding="square" scale="1x">
                     <Text
                        fontFamily="Font Awesome 6 Pro"
                        fontWeight="solid"
                        fontSize="16px"
                        color="gray.500"
                        width="16px"
                        textAlign="center"
                     >
                        ellipsis
                     </Text>
                  </Icon>
               </Button>
            </Stack>
         </Stack>
      </Stack>
   </Stack>
);

const SolutionHeader = () => (
   <Stack
      direction="row"
      justify="flex-start"
      align="flex-start"
      spacing="16px"
   >
      <Stack
         direction="row"
         justify="flex-start"
         align="center"
         spacing="10px"
         height="28px"
      >
         <Stack
            paddingX="6px"
            paddingY="4px"
            borderRadius="4px"
            direction="row"
            justify="center"
            align="center"
            spacing="3px"
            borderColor="brand.700"
            borderStartWidth="1px"
            borderEndWidth="1px"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            width="40px"
            height="40px"
            background="brand.500"
         >
            <Text
               fontFamily="SF Pro"
               fontWeight="semibold"
               fontSize="18px"
               color="white"
            >
               1
            </Text>
         </Stack>
      </Stack>
      <Stack direction="row" justify="flex-start" align="flex-start">
         <Badge title="11.5%" color="Gray" size="Base">
            <Icon /*iconName="circle-check"*/ padding="square" scale="1x">
               <Text
                  fontFamily="Font Awesome 6 Pro"
                  fontWeight="solid"
                  fontSize="16px"
                  color="gray.500"
                  width="16px"
                  textAlign="center"
               >
                  circle-check
               </Text>
            </Icon>
            <Stack justify="center" align="flex-start" spacing="10px">
               <Text
                  fontFamily="SF Pro"
                  fontWeight="semibold"
                  fontSize="14px"
                  color="gray.700"
               >
                  11.5%
               </Text>
            </Stack>
         </Badge>
      </Stack>
   </Stack>
);

const SolutionTexts = ({ title, body }: { title: string; body: string }) => (
   <Stack
      justify="flex-start"
      align="flex-start"
      width="798.74px"
      maxWidth="100%"
   >
      <Heading
         fontFamily="SF Pro"
         fontWeight="medium"
         fontSize="24px"
         color="gray.900"
         alignSelf="stretch"
      >
         {title}
      </Heading>
      <Prerendered html={body} />
      <Text
         fontFamily="SF Pro"
         lineHeight="1.38"
         fontWeight="regular"
         fontSize="16px"
         color="gray.700"
         alignSelf="stretch"
      ></Text>
   </Stack>
);

export default function SolutionCard({ solution }: { solution: Problem }) {
   return (
      <Box background="white">
         <SolutionHeader />
         <SolutionTexts title={solution.heading} body={solution.body} />
      </Box>
   );
}

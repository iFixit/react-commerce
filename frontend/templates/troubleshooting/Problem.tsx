import { Stack, Image, Box, Text, Badge, Icon } from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faPowerOff } from '@fortawesome/pro-solid-svg-icons';
import { Problem } from './hooks/useTroubleshootingProps';

export default function ProblemCard({ problem }: { problem: Problem }) {
   const { title, deviceTitle, imageUrl, url } = problem;
   return (
      <a href={url}>
         <Stack
            flex="1"
            justify="flex-start"
            align="flex-start"
            spacing="0px"
            overflow="hidden"
            borderColor="gray.300"
            borderWidth="1px"
            borderRadius="4px"
            backgroundColor="white"
         >
            <Stack
               padding="12px"
               direction="row"
               justify="flex-start"
               align="center"
               alignSelf="stretch"
            >
               <Image
                  boxSize="48px"
                  objectFit="cover"
                  src={imageUrl}
                  alt=""
                  borderRadius="4px"
                  borderColor="gray.300"
                  borderWidth="1px"
                  borderStyle="solid"
               />
               <Stack
                  justify="center"
                  align="flex-start"
                  spacing="6px"
                  flex="1"
               >
                  <Text fontWeight="semibold" fontSize="14px" color="gray.900">
                     {deviceTitle}
                  </Text>
                  <Text
                     fontFamily="SF Pro"
                     fontWeight="semibold"
                     fontSize="14px"
                     color="brand.500"
                     alignSelf="stretch"
                  >
                     {title}
                  </Text>
                  {/* <Stack
                     direction="row"
                     justify="flex-start"
                     align="flex-start"
                     spacing="6px"
                  >
                     <Stack
                        direction="row"
                        justify="flex-start"
                        align="flex-start"
                        spacing="0px"
                     >
                        <Badge>
                           <FaIcon icon={faPowerOff} />
                           <Stack
                              justify="center"
                              align="flex-start"
                              spacing="10px"
                              height="16px"
                           >
                              <Text
                                 fontFamily="SF Pro"
                                 fontWeight="semibold"
                                 fontSize="13px"
                                 color="amber.700"
                              >
                                 Won't Turn On
                              </Text>
                           </Stack>
                        </Badge>
                     </Stack>
                  </Stack> */}
               </Stack>
            </Stack>
         </Stack>
      </a>
   );
}

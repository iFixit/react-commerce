import { Stack, Image, Box, Text, Badge, Icon } from '@chakra-ui/react';

export function GuideResource({ guideid }: { guideid: number }) {
   return <Resource title={guideid} />;
}

function Resource({ title }: { title: string }) {
   return (
      <Stack
         showReference={false}
         showDate
         guide
         showLanguages={false}
         device
         size="md"
         alignSelf="stretch"
         justify="flex-start"
         align="flex-start"
         spacing="0px"
         overflow="hidden"
         borderColor="gray.400"
         borderStartWidth="1px"
         borderEndWidth="1px"
         borderTopWidth="1px"
         borderBottomWidth="1px"
      >
         <Stack
            padding="12px"
            direction="row"
            justify="flex-start"
            align="center"
            alignSelf="stretch"
         >
            <Stack
               justify="flex-start"
               align="flex-start"
               spacing="10px"
               alignSelf="stretch"
            >
               <Image
                  type="Default"
                  size="48x48"
                  height="64px"
                  width="100%"
                  objectFit="cover"
               />
            </Stack>
            <Stack justify="center" align="flex-start" spacing="6px" flex="1">
               <Stack
                  justify="flex-start"
                  align="flex-start"
                  spacing="2px"
                  alignSelf="stretch"
               >
                  <Text
                     fontFamily="SF Pro"
                     lineHeight="1.07"
                     fontWeight="semibold"
                     fontSize="14px"
                     color="gray.900"
                     alignSelf="stretch"
                  >
                     {title}
                  </Text>
                  <Stack
                     direction="row"
                     justify="flex-start"
                     align="flex-start"
                     spacing="10px"
                     alignSelf="stretch"
                  >
                     <Text
                        fontFamily="SF Pro"
                        lineHeight="1.36"
                        fontWeight="regular"
                        fontSize="12px"
                        color="gray.600"
                        flex="1"
                     >
                        This guide shows how to remove and replace the battery
                        in a Samsung Galaxy S10.
                     </Text>
                  </Stack>
               </Stack>
               <Stack
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="4px"
                  alignSelf="stretch"
               >
                  <Stack
                     size="Small"
                     direction="row"
                     justify="flex-start"
                     align="flex-start"
                     spacing="0px"
                  >
                     <Badge>
                        <Icon iconName="clock" padding="square" scale="0.75x" />
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
                              color="gray.700"
                           >
                              1 h - 2 h
                           </Text>
                        </Stack>
                     </Badge>
                  </Stack>
                  <Stack
                     state="Moderate"
                     size="Small"
                     direction="row"
                     justify="flex-start"
                     align="flex-start"
                     spacing="0px"
                  >
                     <Badge>
                        <Icon iconName="gauge" padding="square" scale="0.75x">
                           <Text
                              fontFamily="Font Awesome 6 Pro"
                              fontWeight="solid"
                              fontSize="12px"
                              color="amber.500"
                              width="16px"
                              textAlign="center"
                           >
                              gauge
                           </Text>
                        </Icon>
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
                              Moderate
                           </Text>
                        </Stack>
                     </Badge>
                  </Stack>
               </Stack>
            </Stack>
         </Stack>
      </Stack>
   );
}

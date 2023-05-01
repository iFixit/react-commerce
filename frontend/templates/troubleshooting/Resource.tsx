import { Stack, Image, Text, Badge } from '@chakra-ui/react';
import { Guide } from './hooks/GuideModel';
import { FaIcon } from '@ifixit/icons';
import { faGauge, faClock } from '@fortawesome/pro-solid-svg-icons';

export function GuideResource({ guide }: { guide: Guide }) {
   return <Resource title={guide.title} />;
}

function ResourceBox({ children, ...props }: React.PropsWithChildren<StackProps>) {
   return (
      <Stack
         alignSelf="stretch"
         justify="flex-start"
         align="flex-start"
         spacing="0px"
         overflow="hidden"
         borderColor="gray.400"
         borderWidth="1px"
         borderRadius="4px"
         minHeight="88px"
         {...props}
      >
         {children}
      </Stack>
   );
}

function Resource({ title }: { title: string }) {
   return (
      <ResourceBox>
         <Stack
            padding="12px"
            direction="row"
            justify="flex-start"
            align="center"
            alignSelf="stretch"
            spacing="8px"
         >
            <Image boxSize="48px" height="64px" objectFit="cover" alt="" />
            <Stack justify="center" align="flex-start" spacing="6px" flex="1">
               <Stack
                  justify="flex-start"
                  align="flex-start"
                  spacing="2px"
                  alignSelf="stretch"
               >
                  <Text
                     lineHeight="1.07"
                     fontWeight="semibold"
                     fontSize="14px"
                     color="gray.900"
                  >
                     {title}
                  </Text>
                  <Text
                     lineHeight="1.36"
                     fontWeight="regular"
                     fontSize="12px"
                     color="gray.600"
                  >
                     This guide shows how to remove and replace the battery in a
                     Samsung Galaxy S10.
                  </Text>
               </Stack>
               <Stack
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="4px"
                  alignSelf="stretch"
               >
                  <Badge display="flex">
                     <FaIcon icon={faClock} mr="2px" />
                     1h–2h
                  </Badge>
                  <Badge display="flex" colorScheme="amber">
                     <FaIcon icon={faGauge} mr="2px" />
                     Moderate
                  </Badge>
               </Stack>
            </Stack>
         </Stack>
      </ResourceBox>
   );
}

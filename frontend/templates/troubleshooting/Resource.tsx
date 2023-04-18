import { Stack, Image, Text, Badge } from '@chakra-ui/react';
import { Guide } from './hooks/GuideModel';
import { FaIcon } from '@ifixit/icons';
import { faGauge, faClock } from '@fortawesome/pro-solid-svg-icons';
import Prerendered from './prerendered';

export function GuideResource({ guide }: { guide: Guide }) {
   return (
      <Resource
         title={guide.title}
         imageUrl={guide.image.thumbnail}
         introduction={guide.introduction_rendered}
         timeRequired={guide.time_required}
         difficulty={guide.difficulty}
      />
   );
}

function ResourceBox({ children }: React.PropsWithChildren<{}>) {
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
      >
         {children}
      </Stack>
   );
}

function Resource({
   title,
   imageUrl,
   introduction,
   timeRequired,
   difficulty,
}: {
   title: string;
   imageUrl: string;
   introduction: string;
   timeRequired: string;
   difficulty: string;
}) {
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
            <Image
               boxSize="48px"
               height="64px"
               objectFit="cover"
               alt=""
               src={imageUrl}
            />
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
                  <Prerendered
                     lineHeight="1.36"
                     fontWeight="regular"
                     fontSize="12px"
                     color="gray.600"
                     html={introduction}
                  />
               </Stack>
               <Stack
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="4px"
                  alignSelf="stretch"
               >
                  <Badge display="flex" gap="2px">
                     <FaIcon icon={faClock} />
                     {timeRequired}
                  </Badge>
                  <Badge display="flex" gap="2px" colorScheme="amber">
                     <FaIcon icon={faGauge} />
                     {difficulty}
                  </Badge>
               </Stack>
            </Stack>
         </Stack>
      </ResourceBox>
   );
}
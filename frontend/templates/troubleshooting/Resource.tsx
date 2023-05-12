import { Stack, Image, Text, Badge, StackProps, Link } from '@chakra-ui/react';
import { Guide } from './hooks/GuideModel';
import { FaIcon } from '@ifixit/icons';
import { faGauge, faClock } from '@fortawesome/pro-solid-svg-icons';
import Prerendered from './prerendered';

export function GuideResource({ guide }: { guide: Guide }) {
   return (
      <Resource
         href={guide.url}
         title={guide.title}
         imageUrl={guide.image.thumbnail}
         introduction={guide.introduction_rendered}
         timeRequired={guide.time_required}
         difficulty={guide.difficulty}
      />
   );
}

function ResourceBox({
   children,
   ...props
}: React.PropsWithChildren<StackProps>) {
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

function Resource({
   title,
   imageUrl,
   introduction,
   timeRequired,
   difficulty,
   href,
}: {
   title: string;
   imageUrl: string;
   introduction: string;
   timeRequired: string;
   difficulty: string;
   href: string;
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
            <Link href={href}>
               <Image
                  boxSize="64px"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="4px"
                  objectFit="cover"
                  alt={title}
                  src={imageUrl}
               />
            </Link>
            <Stack justify="center" align="flex-start" spacing="6px" flex="1">
               <Stack
                  justify="flex-start"
                  align="flex-start"
                  spacing="6px"
                  alignSelf="stretch"
               >
                  <Link
                     href={href}
                     lineHeight="1.07"
                     fontWeight="semibold"
                     fontSize="14px"
                     color="gray.900"
                  >
                     {title}
                  </Link>
                  {introduction && (
                     <Prerendered
                        lineHeight="1.36"
                        fontWeight="regular"
                        fontSize="12px"
                        color="gray.600"
                        overflow="hidden"
                        height="16px"
                        noOfLines={1}
                        html={introduction}
                     />
                  )}
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
                     {timeRequired}
                  </Badge>
                  <Badge display="flex" colorScheme="amber">
                     <FaIcon icon={faGauge} mr="2px" />
                     {difficulty}
                  </Badge>
               </Stack>
            </Stack>
         </Stack>
      </ResourceBox>
   );
}

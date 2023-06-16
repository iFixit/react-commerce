import {
   Box,
   Center,
   Flex,
   Heading,
   Link,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import {
   borderRadius,
   color,
   fontSize,
   fontWeight,
   shadow,
   space,
} from '@core-ds/primitives';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import Image from 'next/image';
import * as React from 'react';

export interface Activity {
   text: string;
   author: string;
   user_url: string;
   user_image: string;
   url: string;
   image_url: string;
   type: string;
}

function ActivityCard({ data }: { data: Activity }) {
   return (
      <Flex
         borderRadius={`${borderRadius.lg}`}
         overflow="hidden"
         boxShadow={`${shadow[4]}`}
         position="relative"
         direction="column"
         _hover={{
            cursor: 'pointer',
         }}
      >
         <Link
            href={'https://www.ifixit.com' + data.url}
            position="relative"
            height="200px"
            transition="0.5s"
            _hover={{
               opacity: '50%',
            }}
         >
            <Image
               src={data.image_url}
               alt=""
               fill
               style={{
                  objectFit: 'cover',
               }}
            />
         </Link>
         <Flex
            padding={`${space[3]}`}
            height={`${space[9]}`}
            sx={{
               '&:hover a': {
                  textDecoration: 'underline',
               },
            }}
         >
            <Box
               transition="0.5s"
               borderRadius="50%"
               overflow="hidden"
               minWidth={`${space[7]}`}
               _hover={{
                  opacity: '50%',
               }}
            >
               <Image
                  src={data.user_image}
                  alt=""
                  width={40}
                  height={40}
                  style={{
                     maxWidth: '100%',
                     height: 'auto',
                  }}
               />
            </Box>
            <Flex
               direction="column"
               marginLeft={`${space[4]}`}
               overflow="hidden"
            >
               <Link
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  wordBreak="break-all"
                  href={data.user_url}
                  margin="0"
                  color={`${color.gray[900]}`}
                  fontSize={`${fontSize.md}`}
                  fontWeight={`${fontWeight.bold}`}
               >
                  {data.author}
               </Link>
               <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  wordBreak="break-all"
                  color={`${color.gray[500]}`}
                  fontSize={`${fontSize.md}`}
                  margin="0"
               >
                  {data.text}
               </Text>
            </Flex>
         </Flex>
      </Flex>
   );
}

export default function ActivityDisplay({ data }: { data: Activity[] }) {
   return (
      <React.Fragment>
         <Heading
            as="h3"
            fontSize={`${fontSize['3xl']}`}
            color={`${color.gray[900]}`}
            margin={{
               base: `${space[7]} 0 ${space[5]}`,
               md: `${space[10]} 0 ${space[7]}`,
            }}
         >
            Latest Community Activity
         </Heading>
         {data ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
               {data.map((activity, idx) => (
                  <ActivityCard key={idx} data={activity} />
               ))}
            </SimpleGrid>
         ) : (
            <Center>
               <Flex
                  direction="column"
                  align="center"
                  textAlign="center"
                  padding="50px 0"
               >
                  <FaIcon icon={faCircleExclamation} h="7" color="red.500" />
                  <Heading
                     as="h3"
                     fontSize={`${fontSize.xl}`}
                     fontWeight={`${fontWeight.normal}`}
                  >
                     {"We're having trouble loading this right now."}
                  </Heading>
               </Flex>
            </Center>
         )}
      </React.Fragment>
   );
}

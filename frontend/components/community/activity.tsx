import { Box, Center, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import * as React from 'react';
import { Link } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

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
         borderRadius="var(--border-radius-lg)"
         overflow="hidden"
         boxShadow="var(--shadow-3)"
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
            <Image src={data.image_url} alt="" layout="fill" objectFit="cover" />
         </Link>
         <Flex
            padding="12px"
            height="64px"
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
               minWidth="40px"
               _hover={{
                  opacity: '50%',
               }}
            >
               <Image src={data.user_image} alt="" width={40} height={40} />
            </Box>
            <Flex direction="column" marginLeft="16px" overflow="hidden">
               <Link
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  wordBreak="break-all"
                  href={data.user_url}
                  margin="0"
                  fontSize={14}
                  fontWeight="bold"
               >
                  {data.author}
               </Link>
               <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  wordBreak="break-all"
                  color="var(--color-gray-5)"
                  fontSize={14}
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
            fontSize="var(--font-size-5)"
            margin={{
               base: 'var(--space-7) 0 var(--space-5)',
               md: 'var(--space-10) 0 var(--space-7)',
            }}
         >
            Latest Community Activity
         </Heading>
         {data ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={7}>
               {data.map((activity, i) => (
                  <ActivityCard key={i} data={activity} />
               ))}
            </SimpleGrid>
         ) : (
            <Center>
               <Flex direction="column" align="center" textAlign="center" padding="50px 0">
                  <WarningIcon w={7} h={7} color="#e23715" />
                  <Heading as="h3" fontSize="18px" fontWeight="normal">
                     {"We're having trouble loading this right now."}
                  </Heading>
               </Flex>
            </Center>
         )}
      </React.Fragment>
   );
}

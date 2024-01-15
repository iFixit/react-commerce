'use client';

import * as React from 'react';
import {
   Box,
   Flex,
   Heading,
   HStack,
   Image,
   SimpleGrid,
   Stack,
   Text,
} from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FaIcon } from '@ifixit/icons';
import { NavBar } from './NavBar';

import type { TroubleshootingProblemsApiData } from '../hooks/useTroubleshootingProblemsProps';

export default function TroubleshootingProblems(
   TroubleshootingProblems: TroubleshootingProblemsApiData
) {
   const {
      title,
      editUrl,
      historyUrl,
      deviceGuideUrl,
      devicePartsUrl,
      breadcrumbs,
   } = TroubleshootingProblems;

   return (
      <>
         <NavBar
            editUrl={editUrl}
            historyUrl={historyUrl}
            deviceGuideUrl={deviceGuideUrl}
            devicePartsUrl={devicePartsUrl}
            breadcrumbs={breadcrumbs}
         />
         <Box className="wrapper" maxWidth="1280px" mt={8} mx="auto" px={8}>
            <Stack as="main" spacing={3}>
               <Box className="header">
                  <Heading color="gray.800" fontSize="30px" fontWeight="medium">
                     Most Common {title} Troubleshooting Problems
                  </Heading>
                  <Text mt={2}>
                     When your {title} runs into issues, it can be a source of
                     frustration and inconvenience. Never fear &mdash;
                     we&apos;ve compiled a comprehensive guide to diagnose and
                     fix the most common problems that can plague your {title}.
                  </Text>
               </Box>
               <SimpleGrid
                  className="list"
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={6}
                  py={3}
               >
                  {TroubleshootingProblems.problems.map(
                     (problem: any, index: number) => (
                        <Problem
                           key={index}
                           imageSrcStandard={problem.imageSrcStandard}
                           imageSrcThumbnail={problem.imageSrcThumbnail}
                           problemTypeIcon={problem.problemTypeIcon}
                           problemTitle={problem.problemTitle}
                           deviceTitle={problem.deviceTitle}
                           description={problem.description}
                           altText={problem.altText}
                        />
                     )
                  )}
               </SimpleGrid>
            </Stack>
         </Box>
      </>
   );
}

function Problem({
   problemTitle,
   deviceTitle,
   description,
   imageSrcStandard,
   imageSrcThumbnail,
   problemTypeIcon,
   altText,
   badges,
}: any) {
   return (
      <Flex
         flexDirection="column"
         alignSelf="stretch"
         bgColor="white"
         border="1px solid"
         borderColor="gray.300"
         borderRadius="md"
         overflow="hidden"
      >
         {imageSrcStandard ? (
            <Image src={imageSrcStandard} alt={altText} {...lgImageStyles} />
         ) : (
            <Flex {...imagePlaceholderStyles}>
               <FaIcon
                  icon={problemTypeIcon as IconProp}
                  size="3x"
                  color="brand.400"
                  m="auto"
               />
            </Flex>
         )}
         <Stack className="content" spacing={3} p={4} flex="auto">
            <Stack className="title" spacing={1} flex="1">
               <Text color="brand.500" fontWeight="semibold" noOfLines={4}>
                  {problemTitle}
               </Text>
               <Text fontSize="sm" noOfLines={4}>
                  {description}
               </Text>
            </Stack>
            {badges && <HStack className="badges" spacing={1.5}></HStack>}
            <HStack className="device" spacing={1.5} alignItems="center">
               <Image
                  src={imageSrcThumbnail}
                  alt={altText}
                  {...thumbImageStyles}
               />
               <Box fontSize="sm" fontWeight="semibold" noOfLines={2}>
                  {deviceTitle}
               </Box>
            </HStack>
         </Stack>
      </Flex>
   );
}

const lgImageStyles = {
   borderBottom: '1px solid',
   borderColor: 'gray.300',
   aspectRatio: '4 / 3',
};

const imagePlaceholderStyles = {
   ...lgImageStyles,
   width: '100%',
   bgColor: 'brand.100',
};

const thumbImageStyles = {
   border: '1px solid',
   borderColor: 'gray.300',
   borderRadius: 'md',
   width: '32px',
   height: '32px',
};

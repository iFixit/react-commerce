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
import { Answers } from './Answers';

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
      answers,
      allAnswersUrl,
      allAnswersCount,
   } = TroubleshootingProblems;
   const ProblemsData = TroubleshootingProblems.problems.slice(0, 10); // Design calls for 10

   return (
      <>
         <NavBar
            editUrl={editUrl}
            historyUrl={historyUrl}
            deviceGuideUrl={deviceGuideUrl}
            devicePartsUrl={devicePartsUrl}
            breadcrumbs={breadcrumbs}
         />
         <Box
            className="wrapper"
            maxWidth="1280px"
            mx="auto"
            px={{ base: 4, md: 8 }}
            py={{ md: 8 }}
         >
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
                  columns={{ base: 1, sm: 2 }}
                  spacing={{ base: 4, md: 6 }}
                  py={3}
               >
                  {ProblemsData.map((problem: any, index: number) => (
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
                  ))}
               </SimpleGrid>
               <Answers
                  answers={answers}
                  allAnswersUrl={allAnswersUrl}
                  allAnswersCount={allAnswersCount}
               />
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
         bgColor="white"
         border="1px solid"
         borderColor="gray.300"
         borderRadius="md"
         overflow="hidden"
      >
         <Stack direction="row" spacing={3} alignSelf="stretch" p={4} flex="1">
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
            <Stack className="content" spacing={3} flex="auto">
               <Stack className="title" spacing={1} flex="1">
                  <Text fontWeight="semibold" noOfLines={3}>
                     {problemTitle}
                  </Text>
                  <Text color="gray.500" fontSize="sm" noOfLines={3}>
                     {description}
                  </Text>
               </Stack>
               {badges && <HStack className="badges" spacing={1.5}></HStack>}
            </Stack>
         </Stack>
         <HStack
            className="device"
            spacing={1.5}
            alignItems="center"
            bgColor="blueGray.100"
            borderTop="1px solid"
            borderColor="gray.200"
            py={1.5}
            px={4}
         >
            <Image
               src={imageSrcThumbnail}
               alt={altText}
               {...thumbImageStyles}
            />
            <Box fontSize="sm" fontWeight="semibold" noOfLines={2}>
               {deviceTitle}
            </Box>
         </HStack>
      </Flex>
   );
}

const imageStyles = {
   border: '1px solid',
   borderColor: 'gray.300',
   borderRadius: 'md',
   aspectRatio: '4 / 3',
};

const thumbImageStyles = {
   ...imageStyles,
   width: '32px',
   height: '32px',
};

const lgImageStyles = {
   ...imageStyles,
   width: '96px',
   height: '72px',
};

const imagePlaceholderStyles = {
   ...lgImageStyles,
   width: '100%',
   bgColor: 'brand.100',
};

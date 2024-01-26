'use client';

import * as React from 'react';
import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Answers } from './Answers';
import { ProblemCard } from './ProblemCard';

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
            pt={{ md: 8 }}
            pb={8}
         >
            <Stack as="main" spacing={6}>
               <Box className="header">
                  <Heading
                     color="gray.800"
                     fontSize={{ base: '24px', sm: '30px' }}
                     fontWeight="medium"
                     lineHeight="115%"
                  >
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
                  className="problem-list"
                  columns={{ base: 1, md: 2 }}
                  spacing={{ base: 4, md: 6 }}
               >
                  {ProblemsData.map((problem: any, index: number) => (
                     <ProblemCard
                        key={index}
                        imageSrcStandard={problem.imageSrcStandard}
                        imageSrcThumbnail={problem.imageSrcThumbnail}
                        problemTypeIcon={problem.problemTypeIcon}
                        problemTitle={problem.problemTitle}
                        problemUrl={problem.problemUrl}
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

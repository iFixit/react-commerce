'use client';

import * as React from 'react';
import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Answers } from './Answers';
import { ProblemCard } from './ProblemCard';

import type {
   TroubleshootingProblemsApiData,
   Problems,
} from '../hooks/useTroubleshootingProblemsProps';
import groupBy from 'lodash/groupBy';

export default function TroubleshootingProblems({
   editUrl,
   historyUrl,
   deviceUrls,
   breadcrumbs,
   answers,
   allAnswersUrl,
   allAnswersCount,
   problems,
}: TroubleshootingProblemsApiData) {
   const problemsData = problems.slice(0, 10); // Design calls for 10
   const hasProblems = problemsData.length > 0;
   const problemsDataGroups: Record<string, Problems[]> = groupBy(
      problemsData,
      'deviceTitle'
   );

   return (
      <>
         <NavBar
            editUrl={editUrl}
            historyUrl={historyUrl}
            deviceUrls={deviceUrls}
            breadcrumbs={breadcrumbs}
         />
         <Box
            className="wrapper"
            maxWidth="1280px"
            mx="auto"
            px={{ base: 4, sm: 8 }}
            pt={{ sm: 8 }}
            pb={8}
         >
            <Stack as="main" spacing={6}>
               {Object.entries(problemsDataGroups).map(
                  ([deviceName, problems]) => {
                     const title = deviceName;
                     return (
                        <>
                           <Stack className="header" spacing={2}>
                              <Heading
                                 as="h2"
                                 color="gray.800"
                                 fontSize={{ base: '24px', sm: '30px' }}
                                 fontWeight="medium"
                                 lineHeight="115%"
                              >
                                 Most Common{' '}
                                 <Box as="span" fontWeight="bold">
                                    {title}
                                 </Box>{' '}
                                 Troubleshooting Problems
                              </Heading>
                              <Text>
                                 When your {title} runs into issues, it can be a
                                 source of frustration and inconvenience. Never
                                 fear &mdash; we&apos;ve compiled a
                                 comprehensive guide to diagnose and fix the
                                 most common problems that can plague your{' '}
                                 {title}
                              </Text>
                           </Stack>
                           <SimpleGrid
                              className="problem-ancestor-list"
                              columns={{ base: 1, md: 2 }}
                              spacing={{ base: 4, md: 6 }}
                           >
                              {problems.map(
                                 (problem: Problems, index: number) => (
                                    <ProblemCard
                                       key={index}
                                       imageSrcStandard={
                                          problem.imageSrcStandard
                                       }
                                       imageSrcThumbnail={
                                          problem.imageSrcThumbnail
                                       }
                                       problemTypeIcon={problem.problemTypeIcon}
                                       problemTitle={problem.problemTitle}
                                       problemUrl={problem.problemUrl}
                                       deviceTitle={problem.deviceTitle}
                                       description={problem.description}
                                       altText={problem.altText}
                                    />
                                 )
                              )}
                           </SimpleGrid>
                        </>
                     );
                  }
               )}
               {answers.length > 0 && (
                  <Answers
                     answers={answers}
                     allAnswersUrl={allAnswersUrl}
                     allAnswersCount={allAnswersCount}
                     hasProblems={hasProblems}
                  />
               )}
            </Stack>
         </Box>
      </>
   );
}

import { Box, Heading, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { TroubleshootingAnswersData } from '../hooks/useTroubleshootingProblemsProps';
import { AnswerCard } from './AnswerCard';

export function Answers({
   answers,
   allAnswersUrl,
   allAnswersCount,
   hasProblems,
}: TroubleshootingAnswersData & { hasProblems: boolean }) {
   const answersData = answers.slice(0, 8); // design calls for 8

   return (
      <>
         <Stack className="answers" spacing={4}>
            <Stack spacing={2} pt={6}>
               <Heading
                  as={hasProblems ? 'h4' : 'h3'}
                  color="gray.800"
                  fontSize={{ base: '20px', mdPlus: '24px' }}
                  fontWeight="medium"
                  lineHeight="115%"
               >
                  Didn&apos;t see your problem? Try one of these answers.
               </Heading>
               <Text>
                  Browse the most common questions asked by users to see if
                  someone already has an answer. If you can&apos;t find a
                  solution to your problem, you can always ask.
               </Text>
            </Stack>
            <SimpleGrid
               className="answers-list"
               columns={{ base: 1, md: 2 }}
               spacing={3}
               autoRows="min-content"
            >
               {answersData.map((answer: any) => (
                  <AnswerCard answer={answer} key={answer.title} />
               ))}
            </SimpleGrid>
            <Link
               href={allAnswersUrl}
               color="brand.500"
               fontSize="sm"
               width="fit-content"
            >
               See all{' '}
               <Box as="span" fontWeight="semibold">
                  {allAnswersCount}
               </Box>{' '}
               questions
            </Link>
         </Stack>
      </>
   );
}

import { Box, Heading, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { TroubleshootingAnswersData } from '../hooks/useTroubleshootingProblemsProps';
import { AnswerCard } from './AnswerCard';

export function Answers({
   answers,
   allAnswersUrl,
   allAnswersCount,
}: TroubleshootingAnswersData) {
   const answersData = answers.slice(0, 8); // design calls for 8

   return (
      <>
         <Stack className="answers" spacing={4}>
            <Stack spacing={2} pt={6}>
               <Heading
                  as="h3"
                  fontSize={{ base: '20px', mdPlus: '24px' }}
                  fontWeight="medium"
                  lineHeight="normal"
               >
                  Didn&apos;t find your problem?
               </Heading>
               <Text>
                  Browse the most common questions asked by users and try to see
                  if someone has already answered your problem. If you
                  can&apos;t find a resolution to your problem, you can always
                  ask.
               </Text>
            </Stack>
            <SimpleGrid
               className="list"
               columns={{ base: 1, md: 2 }}
               spacing={3}
            >
               {answersData.map((answer: any) => (
                  <AnswerCard answer={answer} key={answer.title} />
               ))}
            </SimpleGrid>
         </Stack>
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
      </>
   );
}

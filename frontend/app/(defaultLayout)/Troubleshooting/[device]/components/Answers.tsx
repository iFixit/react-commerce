import { Box, Heading, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { TroubleshootingProblemsApiData } from '../hooks/useTroubleshootingProblemsProps';
import { AnswerCard } from './AnswerCard';

export function Answers({
   title,
   answers,
   allAnswersUrl,
}: {
   title: TroubleshootingProblemsApiData['title'];
   answers: TroubleshootingProblemsApiData['answers'];
   allAnswersUrl: TroubleshootingProblemsApiData['allAnswersUrl'];
}) {
   return (
      <>
         <Stack spacing={2} py={3}>
            <Heading
               as="h3"
               fontSize={{ base: '20px', mdPlus: '24px' }}
               fontWeight="medium"
               lineHeight="normal"
            >
               Didn&apos;t find your problem?
            </Heading>
            <Text>
               Browse the most common questions asked by users and try to see if
               someone has already answered your problem. If you can&apos;t find
               a resolution to your problem, you can always ask.
            </Text>
         </Stack>
         <Stack spacing={3}>
            <SimpleGrid className="list" columns={2} spacing={3}>
               {answers.map((answer: any) => (
                  <AnswerCard answer={answer} key={answer.title} />
               ))}
            </SimpleGrid>
         </Stack>
         <Link
            href={allAnswersUrl}
            color="brand.500"
            fontSize="sm"
            width="fit-content"
            py={3}
         >
            See all{' '}
            <Box as="span" fontWeight="semibold">
               {title}
            </Box>{' '}
            questions
         </Link>
      </>
   );
}

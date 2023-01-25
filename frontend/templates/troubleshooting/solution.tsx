import { Box, Heading } from '@chakra-ui/react';
import { Problem } from './hooks/useTroubleshootingProps';
import Prerendered from './prerendered';

export default function SolutionCard({ solution }: { solution: Problem }) {
   return (
      <Box>
         <Heading>{solution.heading}</Heading>
         <Prerendered html={solution.body} />
      </Box>
   );
}

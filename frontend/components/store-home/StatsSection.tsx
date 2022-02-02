import {
   Box,
   SimpleGrid,
   Stat,
   StatHelpText,
   StatNumber,
} from '@chakra-ui/react';
import { PageContentWrapper } from './PageContentWrapper';

export function StatsSection() {
   return (
      <Box
         as="section"
         position="relative"
         w="full"
         bg="blue.50"
         borderWidth={1}
         borderColor="blue.100"
      >
         <PageContentWrapper>
            <SimpleGrid
               columns={{
                  base: 1,
                  sm: 2,
                  lg: 4,
               }}
               spacing="10"
               py="10"
            >
               <Stats number="76.834" helpText="Free manuals" />
               <Stats number="181.097" helpText="Solutions" />
               <Stats number="34.672" helpText="Devices" />
               <Stats number="2M+" helpText="Product sale/Year" />
            </SimpleGrid>
         </PageContentWrapper>
      </Box>
   );
}

interface StatsProps {
   number: string;
   helpText: string;
}

function Stats({ number, helpText }: StatsProps) {
   return (
      <Stat
         sx={{
            dl: {
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            },
         }}
      >
         <StatNumber color="blue.500" fontSize="3xl">
            {number}
         </StatNumber>
         <StatHelpText>{helpText}</StatHelpText>
      </Stat>
   );
}

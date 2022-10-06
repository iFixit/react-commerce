import React from 'react';
import {
   Box,
   SimpleGrid,
   Stat,
   StatHelpText,
   StatNumber,
} from '@chakra-ui/react';
import { PageContentWrapper } from '../components/PageContentWrapper';

interface Stat {
   value: string;
   label: string;
}

export interface StatsSectionProps {
   data: SectionData;
}

export interface SectionData {
   type: 'Stats';
   id: string;
   stats: Stat[];
}

export function StatsSection({ data: { stats } }: StatsSectionProps) {
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
               {stats.map((stat, index) => (
                  <Stats
                     key={index}
                     number={stat.value}
                     helpText={stat.label}
                  />
               ))}
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
         <StatNumber color="blue.500" fontSize="4xl" m="0">
            {number}
         </StatNumber>
         <StatHelpText fontSize="md" m="0">
            {helpText}
         </StatHelpText>
      </Stat>
   );
}

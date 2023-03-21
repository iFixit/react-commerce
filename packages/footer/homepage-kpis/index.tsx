import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

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
         mb={-10}
      >
         <Box
            maxW="80rem"
            mx="auto"
            px={{
               base: 4,
               md: 6,
               lg: 8,
            }}
         >
            <SimpleGrid
               columns={{
                  base: 1,
                  sm: 2,
                  lg: 4,
               }}
               spacing={{ base: '2', lg: '10' }}
               py={{ base: '2', sm: '4', lg: '10' }}
            >
               {stats.map((stat, index) => (
                  <Stats
                     key={index}
                     number={stat.value}
                     helpText={stat.label}
                  />
               ))}
            </SimpleGrid>
         </Box>
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
               flexDirection: 'column-reverse',
               alignItems: 'center',
            },
         }}
      >
         <StatLabel fontSize="md" m="0">
            {helpText}
         </StatLabel>
         <StatNumber color="blue.500" fontSize="4xl" m="0">
            {number}
         </StatNumber>
      </Stat>
   );
}

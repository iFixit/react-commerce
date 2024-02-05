'use client';

import {
   Box,
   SimpleGrid,
   Stat,
   StatHelpText,
   StatNumber,
} from '@chakra-ui/react';
import { Wrapper } from '@ifixit/ui';
import type { IFixitStatsSection } from '@models/sections/ifixit-stats-section';

export interface IFixitStatsSectionProps {
   data: IFixitStatsSection;
}

export function IFixitStatsSection({
   data: { stats },
}: IFixitStatsSectionProps) {
   return (
      <Box
         as="section"
         position="relative"
         w="full"
         bg="brand.100"
         borderWidth={1}
         borderColor="brand.200"
      >
         <Wrapper>
            <SimpleGrid
               minChildWidth="200px"
               spacing={{ base: 9, lg: 10 }}
               py="12"
            >
               {stats.map((stat, index) => (
                  <Stats key={index} value={stat.value} label={stat.label} />
               ))}
            </SimpleGrid>
         </Wrapper>
      </Box>
   );
}

interface StatsProps {
   value: string;
   label: string;
}

function Stats({ value, label }: StatsProps) {
   const formattedValue = isNumber(value)
      ? formatNumber(parseFloat(value))
      : value;
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
         <StatNumber color="brand.500" fontSize="4xl" m="0">
            {formattedValue}
         </StatNumber>
         <StatHelpText color="brand.400" fontSize="md" m="0">
            {label}
         </StatHelpText>
      </Stat>
   );
}

function isNumber(value: string) {
   return /^\d+$/.test(value);
}

function formatNumber(value: number) {
   return new Intl.NumberFormat().format(value);
}

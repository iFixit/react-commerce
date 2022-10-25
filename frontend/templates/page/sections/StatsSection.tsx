import {
   Box,
   SimpleGrid,
   Stat,
   StatHelpText,
   StatNumber,
} from '@chakra-ui/react';
import { PageContentWrapper } from '@ifixit/ui';
import { GetSection } from '@models/page';

export interface StatsSectionProps {
   data: GetSection<'ComponentPageStats'>;
}

export function StatsSection({ data: { stats } }: StatsSectionProps) {
   return (
      <Box
         as="section"
         position="relative"
         w="full"
         bg="brand.100"
         borderWidth={1}
         borderColor="brand.200"
         mb={-10}
      >
         <PageContentWrapper isResponsive>
            <SimpleGrid
               minChildWidth="200px"
               spacing={{ base: 9, lg: 10 }}
               py="12"
            >
               {stats.map((stat, index) => (
                  <Stats key={index} value={stat.value} label={stat.label} />
               ))}
            </SimpleGrid>
         </PageContentWrapper>
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

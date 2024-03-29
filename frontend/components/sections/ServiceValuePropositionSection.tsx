import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import {
   faBoxCircleCheck as faBoxCircleCheckDuo,
   faRocket as faRocketDuo,
   faShieldCheck as faShieldCheckDuo,
} from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon, FaIconProps } from '@ifixit/icons';
import React from 'react';

export interface ServiceValuePropositionSectionProps {
   id: string;
}

export function ServiceValuePropositionSection({
   id,
}: ServiceValuePropositionSectionProps) {
   return (
      <Box as="section" id={id}>
         <Heading as="h2" srOnly>
            Service value proposition
         </Heading>
         <Stack
            direction={{
               base: 'column',
               md: 'row',
            }}
            bg="blue.50"
            align={{
               base: 'center',
               md: 'flex-start',
            }}
            justify="center"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderColor="blue.100"
            spacing={{
               base: 8,
               md: 20,
            }}
            py="16"
            px={{ base: 5, sm: 6 }}
         >
            <ValueProposition>
               <ValuePropositionIcon icon={faBoxCircleCheckDuo} />
               <Text fontWeight="semibold">Purchase with purpose</Text>
               <Text>
                  Repair makes a global impact, reduces e-waste, and saves you
                  money.
               </Text>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon icon={faShieldCheckDuo} />
               <Text fontWeight="semibold">Repair with confidence</Text>
               <Text>
                  All our products meet rigorous quality standards and are
                  backed by industry-leading guarantees.
               </Text>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon icon={faRocketDuo} />
               <Text fontWeight="semibold">Fast shipping</Text>
               <Text>Same day shipping if ordered by 1PM Pacific.</Text>
            </ValueProposition>
         </Stack>
      </Box>
   );
}

function ValueProposition({ children }: React.PropsWithChildren<{}>) {
   return (
      <VStack
         direction="column"
         textAlign="center"
         spacing="2"
         w={{ base: 'unset', md: '200px' }}
      >
         {children}
      </VStack>
   );
}

const ValuePropositionIcon = ({ icon, ...props }: FaIconProps) => {
   return <FaIcon icon={icon} h="8" color="brand.500" {...props} />;
};

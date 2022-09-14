import { Heading, Stack, Text, useTheme, VStack } from '@chakra-ui/react';
import React from 'react';
import {
   FontAwesomeIcon,
   FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
   faBoxCircleCheck,
   faRocket,
   faShieldCheck,
} from '@fortawesome/pro-duotone-svg-icons';

export type ServiceValuePropositionSectionProps = {};

export function ServiceValuePropositionSection() {
   return (
      <>
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
            mt="16"
            py="16"
            px="6"
         >
            <ValueProposition>
               <ValuePropositionIcon icon={faBoxCircleCheck} />
               <Text fontWeight="bold">Satified or 100% refunded</Text>
               <Text>
                  Our parts quality consistently sets the industry standard.
               </Text>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon icon={faShieldCheck} />
               <Text fontWeight="bold">Secure payment</Text>
               <Text>Encrypted checkout through Shopify.</Text>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon icon={faRocket} />
               <Text fontWeight="bold">Express shipping</Text>
               <Text>Shipped same-day if you order before 5PM.</Text>
            </ValueProposition>
         </Stack>
      </>
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

const ValuePropositionIcon = ({ icon, ...props }: FontAwesomeIconProps) => {
   const theme = useTheme();
   return (
      <FontAwesomeIcon
         icon={icon}
         color={theme.colors.brand[500]}
         style={{ height: '32px' }}
         {...props}
      />
   );
};

import {
   Box,
   forwardRef,
   Heading,
   Icon,
   IconProps,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaBox, FaShieldAlt, FaTruck } from 'react-icons/fa';

export type ServiceValuePropositionSectionProps = {};

export function ServiceValuePropositionSection() {
   return (
      <Box>
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
            mb="16"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderColor="blue.100"
            fontSize="xs"
            spacing="12"
            py="16"
         >
            <ValueProposition>
               <ValuePropositionIcon as={FaBox} />
               <Title>Satified or 100% refunded</Title>
               <Description>
                  Our parts quality consistently sets the industry standard.
               </Description>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon as={FaShieldAlt} />
               <Title>Secure payment</Title>
               <Description>Encrypted checkout through Shopify.</Description>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon as={FaTruck} />
               <Title>Express shipping</Title>
               <Description>
                  Shipped same-day if you order before 5PM.
               </Description>
            </ValueProposition>
         </Stack>
      </Box>
   );
}

const ValuePropositionIcon = forwardRef<IconProps, 'svg'>((props, ref) => (
   <Icon ref={ref} boxSize="9" color="brand.500" {...props} />
));

function ValueProposition({ children }: React.PropsWithChildren<{}>) {
   return (
      <VStack direction="column" justify="center" spacing="2" w="200px">
         {children}
      </VStack>
   );
}

function Title({ children }: React.PropsWithChildren<{}>) {
   return (
      <Text color="brand.500" fontWeight="bold">
         {children}
      </Text>
   );
}

function Description({ children }: React.PropsWithChildren<{}>) {
   return <Text>{children}</Text>;
}

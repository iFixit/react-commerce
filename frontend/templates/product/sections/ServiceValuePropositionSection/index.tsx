import {
   Box,
   forwardRef,
   Heading,
   Icon,
   IconProps,
   Stack,
   Text,
   useTheme,
   VStack,
} from '@chakra-ui/react';
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
            fontSize="xs"
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
               <Title>Satified or 100% refunded</Title>
               <Description>
                  Our parts quality consistently sets the industry standard.
               </Description>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon icon={faShieldCheck} />
               <Title>Secure payment</Title>
               <Description>Encrypted checkout through Shopify.</Description>
            </ValueProposition>
            <ValueProposition>
               <ValuePropositionIcon icon={faRocket} />
               <Title>Express shipping</Title>
               <Description>
                  Shipped same-day if you order before 5PM.
               </Description>
            </ValueProposition>
         </Stack>
      </>
   );
}

const ValuePropositionIcon = ({ icon, ...props }: FontAwesomeIconProps) => {
   const theme = useTheme();
   return (
      <FontAwesomeIcon
         icon={icon}
         color={theme.colors.brand[500]}
         style={{ width: '32px', height: '32px' }}
         {...props}
      />
   );
};

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

function Title({ children }: React.PropsWithChildren<{}>) {
   return (
      <Text fontWeight="bold" fontSize="md">
         {children}
      </Text>
   );
}

function Description({ children }: React.PropsWithChildren<{}>) {
   return <Text fontSize="md">{children}</Text>;
}

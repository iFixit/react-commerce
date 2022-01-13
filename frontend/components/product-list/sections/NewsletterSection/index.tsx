import {
   Button,
   chakra,
   FormControl,
   FormErrorMessage,
   HStack,
   Icon,
   Input,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { RiCheckFill } from 'react-icons/ri';
import newsletterIcon from './newsletter-icon.png';
import Image from 'next/image';
import {
   SubscriptionStatus,
   useSubscribeToNewsletter,
} from '@models/newsletter';

export interface NewsletterSectionProps {
   className?: string;
   title: string;
   description: string;
   emailPlaceholder?: string;
   subscribeLabel: string;
}

export const NewsletterSection = chakra(
   ({
      className,
      title,
      description,
      emailPlaceholder,
      subscribeLabel,
   }: NewsletterSectionProps) => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const [subscription, subscribe] = useSubscribeToNewsletter();

      const onSubscribe = React.useCallback(
         async (event: React.FormEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (inputRef.current) {
               const email = inputRef.current.value;
               subscribe(email);
            }
         },
         [subscribe]
      );

      return (
         <Stack
            direction={{
               base: 'column',
               lg: 'row',
            }}
            className={className}
            bg="brand.500"
            px={{
               base: '6',
               md: '10',
            }}
            py={{
               base: '10',
               sm: '6',
               md: '10',
            }}
            borderRadius={{
               base: 'none',
               sm: 'lg',
            }}
            color="white"
            justify="space-between"
            spacing={{
               base: '6',
               lg: '24',
            }}
            boxShadow="md"
            align={{
               lg: 'center',
            }}
         >
            <HStack spacing="8">
               <Image width="95px" height="95px" src={newsletterIcon} alt="" />
               <VStack align="left" spacing="1">
                  <Text fontSize="xl" fontWeight="bold">
                     {title}
                  </Text>
                  <Text color="brand.200">{description}</Text>
               </VStack>
            </HStack>
            <Stack
               as="form"
               spacing={{
                  base: '3',
                  md: '6',
               }}
               direction={{
                  base: 'column',
                  sm: 'row',
               }}
               flex="1"
               onSubmit={onSubscribe}
            >
               <FormControl isInvalid={subscription.error != null}>
                  <Input
                     ref={inputRef}
                     type="email"
                     disabled={subscription.status !== SubscriptionStatus.Idle}
                     placeholder={emailPlaceholder}
                     _placeholder={{
                        color: 'brand.100',
                     }}
                     color="white"
                     variant="filled"
                     bg="brand.400"
                     boxShadow="base"
                     flex={{
                        base: 'none',
                        sm: '1',
                     }}
                     flexShrink={0}
                     height="10"
                     px="4"
                     _hover={{
                        bg: 'brand.400',
                        boxShadow: 'md',
                     }}
                     _focus={{
                        bg: 'brand.400',
                        borderColor: 'brand.300',
                     }}
                     errorBorderColor="yellow.500"
                  />
                  <FormErrorMessage color="yellow.500" fontWeight="semibold">
                     {subscription.error}
                  </FormErrorMessage>
               </FormControl>
               <Button
                  type="submit"
                  isLoading={
                     subscription.status === SubscriptionStatus.Subscribing
                  }
                  loadingText="Subscribing"
                  disabled={subscription.status !== SubscriptionStatus.Idle}
                  leftIcon={
                     subscription.status === SubscriptionStatus.Subscribed ? (
                        <Icon as={RiCheckFill} boxSize="5" mb="-2px" />
                     ) : undefined
                  }
                  bg="white"
                  color="brand.500"
                  px="4"
                  borderRadius="md"
                  height="10"
                  fontWeight="bold"
                  boxShadow="base"
                  boxSizing="border-box"
                  borderColor="transparent"
                  borderWidth="2px"
                  transition="all 300ms"
                  _hover={{
                     boxShadow: 'md',
                     bg: 'brand.100',
                  }}
                  _active={{
                     boxShadow: 'sm',
                     bg: 'brand.100',
                  }}
                  _focus={{
                     borderColor: 'brand.300',
                     borderWidth: '2px',
                  }}
                  minW={{
                     base: '200px',
                     sm: 'unset',
                     md: '200px',
                     lg: 'unset',
                  }}
               >
                  {subscription.status === SubscriptionStatus.Idle
                     ? subscribeLabel
                     : 'Subscribed!'}
               </Button>
            </Stack>
         </Stack>
      );
   }
);

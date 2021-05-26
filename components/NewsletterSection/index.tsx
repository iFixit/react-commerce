import {
   Button,
   chakra,
   FormControl,
   FormErrorMessage,
   HStack,
   Icon,
   Image,
   Input,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { IFIXIT_API_ORIGIN } from '@config/env';
import * as React from 'react';
import { RiCheckFill } from 'react-icons/ri';

export interface NewsletterSectionProps {
   className?: string;
}

enum FormState {
   Idle = 'idle',
   Subscribing = 'subscribing',
   Subscribed = 'subscribed',
}

/**
 * A regex to validate email against simple mistakes
 */
const EMAIL_VALIDATION_REGEX = /^\S+@\S+\.\S+$/;

export const NewsletterSection = chakra(
   ({ className }: NewsletterSectionProps) => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const [error, setError] = React.useState<string | undefined>();
      const [state, setState] = React.useState(FormState.Idle);

      const onSubscribe = React.useCallback(async () => {
         if (inputRef.current) {
            const email = inputRef.current.value;
            if (EMAIL_VALIDATION_REGEX.test(email)) {
               setState(FormState.Subscribing);
               try {
                  await subscribeToNewsletter(email);
                  setState(FormState.Subscribed);
                  if (error) {
                     setError(undefined);
                  }
               } catch (error) {
                  setError(error.message || 'server error');
                  setState(FormState.Idle);
               }
            } else {
               setError('Please insert a valid email');
            }
         }
      }, [error]);

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
               <Image
                  boxSize="95px"
                  // objectFit="cover"
                  src="/images/newsletter-icon.png"
                  alt=""
               />
               <VStack align="left" spacing="1">
                  <Text fontSize="xl" fontWeight="bold">
                     Stay in the loop
                  </Text>
                  <Text color="brand.200">Learn something new every month</Text>
               </VStack>
            </HStack>
            <Stack
               spacing={{
                  base: '3',
                  md: '6',
               }}
               direction={{
                  base: 'column',
                  sm: 'row',
               }}
               flex="1"
            >
               <FormControl isInvalid={error != null}>
                  <Input
                     ref={inputRef}
                     type="email"
                     disabled={state !== FormState.Idle}
                     placeholder="Enter your email"
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
                     {error}
                  </FormErrorMessage>
               </FormControl>
               <Button
                  isLoading={state === FormState.Subscribing}
                  loadingText="Subscribing"
                  disabled={state !== FormState.Idle}
                  leftIcon={
                     state === FormState.Subscribed ? (
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
                  onClick={onSubscribe}
               >
                  {state === FormState.Idle ? 'Subscribe' : 'Subscribed!'}
               </Button>
            </Stack>
         </Stack>
      );
   }
);

async function subscribeToNewsletter(email: string): Promise<void> {
   const response = await fetch(
      `${IFIXIT_API_ORIGIN}/api/2.0/cart/newsletter/subscribe`,
      {
         method: 'POST',
         body: JSON.stringify({
            email,
         }),
      }
   );
   if (response.status >= 200 && response.status < 300) {
      const result = await response.json();
      console.log('RESULT', result);
   } else {
      console.log(response);
      const error = await response.text();
      console.log('ERROR', error);
      throw new Error('Error trying to subscribe to newsletter.');
   }
}

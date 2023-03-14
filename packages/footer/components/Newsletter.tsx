import {
   Box,
   Button,
   FormControl,
   FormErrorMessage,
   HStack,
   Input,
   Stack,
   Text,
   Flex,
   Link,
} from '@chakra-ui/react';
import { faCircleCheck, faEye } from '@fortawesome/pro-solid-svg-icons';
import type { Subscription } from '@ifixit/newsletter-sdk';
import {
   SubscriptionStatus,
   useSubscribeToNewsletter,
} from '@ifixit/newsletter-sdk';
import React from 'react';
import { FaIcon } from '@ifixit/icons';

export type NewsletterFormProps = {
   title: string;
   subtitle: string;
   inputPlaceholder: string;
   callToActionButtonTitle: string;
};

const NewsletterInput = ({
   inputRef,
   placeholder,
   subscription,
}: {
   inputRef: React.RefObject<HTMLInputElement>;
   placeholder: string;
   subscription: Subscription;
}) => {
   return (
      <FormControl w="full" isInvalid={subscription.error != null}>
         <Input
            ref={inputRef}
            type="email"
            disabled={subscription.status !== SubscriptionStatus.Idle}
            data-testid="newsletter-email-input"
            variant="filled"
            bg="white"
            color="gray.900"
            fontSize="14px"
            _focus={{
               bg: 'white',
               boxShadow: 'outline',
            }}
            placeholder={placeholder}
         />
         <FormErrorMessage>{subscription.error}</FormErrorMessage>
      </FormControl>
   );
};

const NewsletterHeader = ({
   title,
   subtitle,
}: {
   title: string;
   subtitle: string;
}) => {
   return (
      <Box textAlign="left">
         <Text fontWeight="bold" fontSize="16px" color="white" my={2}>
            {title}
         </Text>
         <Text color="gray.300" fontSize="14px" fontWeight="normal" mt={3}>
            {subtitle}
         </Text>
      </Box>
   );
};

const NewsletterForm = ({
   placeholder,
   buttonText,
   isSubscribed,
   subscription,
   subscribe,
}: {
   placeholder: string;
   buttonText: string;
   isSubscribed: boolean;
   subscription: Subscription;
   subscribe: (email: string) => void;
}) => {
   if (isSubscribed) {
      return null;
   }

   const inputRef = React.useRef<HTMLInputElement>(null);

   const onSubscribe = React.useCallback(
      (event: React.FormEvent<HTMLElement>) => {
         event.preventDefault();
         if (inputRef.current) {
            const email = inputRef.current.value;
            subscribe(email);
         }
      },
      [subscribe]
   );

   return (
      <HStack
         as="form"
         onSubmit={onSubscribe}
         data-testid="footer-newsletter-form"
         spacing="3"
         w={{
            base: 'full',
            xl: 'auto',
         }}
         justify={{
            base: 'center',
            md: 'flex-end',
         }}
         align="flex-start"
      >
         <NewsletterInput
            inputRef={inputRef}
            placeholder={placeholder}
            subscription={subscription}
         />
         <Button
            type="submit"
            data-testid="footer-newsletter-subscribe-button"
            isLoading={subscription.status === SubscriptionStatus.Subscribing}
            disabled={subscription.status !== SubscriptionStatus.Idle}
            bg="blue.ifixit"
            color="white"
            border="none"
            fontWeight="bold"
            fontSize="14px"
            _hover={{ bg: 'blue.ifixit', boxShadow: '0 0 5px gray' }}
         >
            {buttonText}
         </Button>
      </HStack>
   );
};

const NewsletterSubscribed = ({ isSubscribed }: { isSubscribed: boolean }) => {
   if (!isSubscribed) {
      return null;
   }
   return (
      <Flex
         height="42px"
         flexDirection="row"
         alignItems="center"
         padding="3"
         gap="2"
         w="100%"
         backgroundColor="brand.100"
         border="1px"
         borderColor="brand.300"
         borderStyle="solid"
         borderRadius="4px"
         mt="6px !important"
      >
         <FaIcon icon={faCircleCheck} color="brand.500" />
         <Text color="gray.900" m={0} fontSize="16px">
            Subscribed!
         </Text>
      </Flex>
   );
};

const NewsletterLink = ({ isSubscribed }: { isSubscribed: boolean }) => {
   const message = isSubscribed ? 'Let me read it!' : 'Let me read it first!';
   return (
      <Link
         href="/Newsletter"
         color="gray.300"
         marginTop={2}
         textDecoration="underline"
         fontSize="14px"
         width="fit-content"
         _hover={{ color: 'white' }}
         _visited={{ color: 'gray.300' }}
      >
         <FaIcon icon={faEye} display="inline" mr={1} verticalAlign="-3px" />
         {message}
      </Link>
   );
};

export function NewsletterComponent({
   newsletterForm,
}: {
   newsletterForm: NewsletterFormProps;
}) {
   const ref = React.useRef(null);
   const [subscription, subscribe] = useSubscribeToNewsletter();

   const isSubscribed = subscription.status === SubscriptionStatus.Subscribed;

   return (
      <Stack
         ref={ref}
         direction="column"
         ml={{
            base: 0,
         }}
         pr={0}
         mt={{
            base: 4,
            md: 0,
         }}
         gridColumnEnd={{
            sm: 'span 3',
            lg: 'auto',
         }}
         justify="flex-start"
         w="auto"
         flexGrow={1}
      >
         <NewsletterHeader
            title={newsletterForm.title}
            subtitle={newsletterForm.subtitle}
         />
         <NewsletterForm
            placeholder={newsletterForm.inputPlaceholder}
            buttonText={newsletterForm.callToActionButtonTitle}
            isSubscribed={isSubscribed}
            subscription={subscription}
            subscribe={subscribe}
         />
         <NewsletterSubscribed isSubscribed={isSubscribed} />
         <NewsletterLink isSubscribed={isSubscribed} />
      </Stack>
   );
}

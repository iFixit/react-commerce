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
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { faEye } from '@fortawesome/pro-solid-svg-icons/faEye';
import {
   Subscription,
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
            fontSize="sm"
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
         <Text fontWeight="bold" fontSize="lg" color="white" my={2}>
            {title}
         </Text>
         <Text color="gray.300" fontSize="md" fontWeight="normal" mt={3}>
            {subtitle}
         </Text>
      </Box>
   );
};

const NewsletterForm = ({
   inputRef,
   placeholder,
   buttonText,
   isSubscribed,
   subscription,
   onSubmit,
}: {
   inputRef: React.RefObject<HTMLInputElement>;
   placeholder: string;
   buttonText: string;
   isSubscribed: boolean;
   subscription: Subscription;
   onSubmit: (event: React.FormEvent<HTMLElement>) => Promise<void>;
}) => {
   if (isSubscribed) {
      return null;
   }
   return (
      <HStack
         as="form"
         onSubmit={onSubmit}
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
         padding="12px"
         gap="8px"
         w="100%"
         backgroundColor="#EDF6FF"
         border="1px"
         borderColor="#77B5FF"
         borderStyle="solid"
         borderRadius="4px"
         mt="0px !important"
      >
         <FaIcon icon={faCircleCheck} color="#1975F1" />
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
         _hover={{ color: 'white' }}
         _visited={{ color: 'gray.300' }}
      >
         <FaIcon icon={faEye} display="inline" mr={1} verticalAlign="-3px" />
         {message}
      </Link>
   );
};

//Alex testing gpg signing
export function NewsletterComponent({
   newsletterForm,
}: {
   newsletterForm: NewsletterFormProps;
}) {
   const ref = React.useRef(null);
   const inputRef = React.useRef<HTMLInputElement>(null);
   const [subscription, subscribe] = useSubscribeToNewsletter();

   const onSubscribe = React.useCallback(
      async (event: React.FormEvent<HTMLElement>) => {
         event.preventDefault();
         if (inputRef.current) {
            const email = inputRef.current.value;
            subscribe(email);
         }
      },
      [subscribe]
   );

   const isSubscribed = subscription.status === SubscriptionStatus.Subscribed;

   return (
      <Stack
         ref={ref}
         direction="column"
         ml={{
            base: 0,
            // since the legal column is skinny, let's scoot the newsletter over
            lg: -20,
         }}
         pr={0}
         mt={{
            base: 0,
            sm: 10,
            lg: 3,
         }}
         gridColumnEnd={{
            sm: 'span 3',
            lg: 'auto',
         }}
         justify="flex-start"
         w="auto"
      >
         <NewsletterHeader
            title={newsletterForm.title}
            subtitle={newsletterForm.subtitle}
         />
         <NewsletterForm
            inputRef={inputRef}
            placeholder={newsletterForm.inputPlaceholder}
            buttonText={newsletterForm.callToActionButtonTitle}
            isSubscribed={isSubscribed}
            subscription={subscription}
            onSubmit={onSubscribe}
         />
         <NewsletterSubscribed isSubscribed={isSubscribed} />
         <NewsletterLink isSubscribed={isSubscribed} />
      </Stack>
   );
}

import {
   Box,
   Button,
   FormControl,
   FormErrorMessage,
   Stack,
   Input,
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
            bg="white"
            color="gray.900"
            fontSize="sm"
            placeholder={placeholder}
            borderRadius="base"
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
         <Text fontSize="sm" fontWeight="semibold" color="white">
            {title}
         </Text>
         <Text color="gray.300" fontSize="sm" fontWeight="normal" mt={1.5}>
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

   if (isSubscribed) {
      return null;
   }

   return (
      <Stack
         as="form"
         direction={{ base: 'row', md: 'column', lg: 'row' }}
         onSubmit={onSubscribe}
         data-testid="footer-newsletter-form"
         spacing="3"
         mt="3"
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
            isDisabled={subscription.status !== SubscriptionStatus.Idle}
            colorScheme="brand"
            color="white"
            border="none"
            fontWeight="semibold"
            fontSize="sm"
            flexShrink={0}
            w={{ base: 'unset', md: 'full', lg: 'unset' }}
         >
            {buttonText}
         </Button>
      </Stack>
   );
};

const NewsletterSubscribed = ({ isSubscribed }: { isSubscribed: boolean }) => {
   if (!isSubscribed) {
      return null;
   }
   return (
      <Flex
         h="10"
         flexDirection="row"
         alignItems="center"
         padding="3"
         w="100%"
         mt="3"
         bg="brand.100"
         border="1px"
         borderColor="brand.300"
         borderStyle="solid"
         borderRadius="base"
      >
         <FaIcon icon={faCircleCheck} color="brand.500" />
         <Text color="gray.900" ml="2">
            Subscribed!
         </Text>
      </Flex>
   );
};

const NewsletterLink = ({ isSubscribed }: { isSubscribed: boolean }) => {
   const message = isSubscribed ? 'Let me read it!' : 'Let me read it first!';
   return (
      <Link
         mt="3"
         href="/Newsletter"
         color="gray.300"
         marginTop={2}
         textDecoration="underline"
         fontSize="sm"
         width="fit-content"
         _hover={{ color: 'white' }}
         _visited={{ color: 'gray.300' }}
      >
         <FaIcon icon={faEye} display="inline" mr={1} />
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
      <Flex
         ref={ref}
         direction="column"
         mt={{
            base: 4,
            md: 0,
         }}
         w={{ base: 'full', md: '64', lg: '96' }}
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
      </Flex>
   );
}

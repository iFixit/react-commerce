'use client';

import {
   Button,
   FormControl,
   FormErrorMessage,
   Input,
   Stack,
} from '@chakra-ui/react';
import { faCircleCheck, faEye } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   Subscription,
   SubscriptionStatus,
   useSubscribeToNewsletter,
} from '@ifixit/newsletter-sdk';
import React from 'react';

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
            disabled={subscription.status !== SubscriptionStatus.Idle}
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
      <div
         className={`flex h-10 flex-row items-center p-3 w-full mt-3 border-brand-300 bg-brand-100 border-solid border rounded`}
      >
         <FontAwesomeIcon className="text-brand-500" icon={faCircleCheck} />
         <span className="text-gray-900 ml-2">Subscribed!</span>
      </div>
   );
};

const NewsletterLink = ({ isSubscribed }: { isSubscribed: boolean }) => {
   const message = isSubscribed ? 'Let me read it!' : 'Let me read it first!';
   return (
      <a className=" text-gray-300 mt-2 underline text-sm w-fit hover:text-white visited:text-gray-300">
         <FontAwesomeIcon className="inline mr-1 h-3.5" icon={faEye} />
         {message}
      </a>
   );
};

export function NewsletterComponent({
   newsletterForm,
   NewsletterHeader,
}: {
   newsletterForm: NewsletterFormProps;
   NewsletterHeader: JSX.Element;
}) {
   const [subscription, subscribe] = useSubscribeToNewsletter();

   const isSubscribed = subscription.status === SubscriptionStatus.Subscribed;

   return (
      <div className="flex flex-col mt-4 md:mt-0 w-full md:w-64 lg:w-96">
         {NewsletterHeader}
         <NewsletterForm
            placeholder={newsletterForm.inputPlaceholder}
            buttonText={newsletterForm.callToActionButtonTitle}
            isSubscribed={isSubscribed}
            subscription={subscription}
            subscribe={subscribe}
         />
         <NewsletterSubscribed isSubscribed={isSubscribed} />
         <NewsletterLink isSubscribed={isSubscribed} />
      </div>
   );
}

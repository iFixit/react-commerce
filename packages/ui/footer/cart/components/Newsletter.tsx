import {
   Box,
   BoxProps,
   Button,
   FormControl,
   FormControlProps,
   FormErrorMessage,
   FormLabel,
   FormLabelProps,
   forwardRef,
   HStack,
   Input,
   InputProps,
   Stack,
   StackProps,
   Text,
   TextProps,
} from '@chakra-ui/react';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import {
   SubscriptionStatus,
   useSubscribeToNewsletter,
} from '@ifixit/newsletter-sdk';
import React from 'react';
import { FaIcon } from '@ifixit/icons';

const FooterNewsletter = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <Stack
         ref={ref}
         direction={{
            base: 'column',
            xl: 'row',
         }}
         spacing={{
            base: 6,
            xl: 8,
         }}
         align="center"
         justify={{
            base: 'center',
            md: 'flex-end',
         }}
         w={{
            base: 'full',
            md: 'auto',
         }}
         px={{
            base: 5,
            sm: 0,
         }}
         {...props}
      />
   );
});

const FooterNewsletterCopy = forwardRef<BoxProps, 'div'>((props, ref) => {
   return (
      <Box
         ref={ref}
         textAlign={{
            base: 'center',
            xl: 'left',
         }}
         {...props}
      />
   );
});

const FooterNewsletterTitle = forwardRef<TextProps, 'div'>((props, ref) => {
   return <Text ref={ref} fontSize="sm" fontWeight="semibold" {...props} />;
});

const FooterNewsletterDescription = forwardRef<TextProps, 'div'>(
   (props, ref) => {
      return <Text ref={ref} fontSize="sm" color="gray.200" {...props} />;
   }
);

const FooterNewsletterForm = forwardRef<StackProps, 'form'>((props, ref) => {
   return (
      <HStack
         ref={ref}
         as="form"
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
         {...props}
      />
   );
});

const FooterNewsletterFormControl = forwardRef<FormControlProps, 'div'>(
   (props, ref) => {
      return (
         <FormControl
            ref={ref}
            w={{
               base: 'full',
               sm: 96,
            }}
            maxW={{
               base: 'full',
               sm: 96,
               xl: 64,
            }}
            {...props}
         />
      );
   }
);

const FooterNewsletterEmailLabel = forwardRef<FormLabelProps, 'label'>(
   (props, ref) => {
      return (
         <FormLabel
            ref={ref}
            htmlFor="newsletter-email-input"
            srOnly
            {...props}
         />
      );
   }
);

const FooterNewsletterEmailInput = forwardRef<InputProps, 'input'>(
   (props, ref) => {
      return (
         <Input
            ref={ref}
            id="newsletter-email-input"
            type="email"
            variant="filled"
            bg="white"
            color="gray.900"
            fontSize="sm"
            _focus={{
               bg: 'white',
               boxShadow: 'outline',
            }}
            {...props}
         />
      );
   }
);

interface NewsletterFormProps {
   title: string;
   description: string;
   emailPlaceholder?: string;
   subscribeLabel: string;
}

export function NewsletterForm({
   title,
   description,
   emailPlaceholder,
   subscribeLabel,
}: NewsletterFormProps) {
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

   const isSubscribed = subscription.status === SubscriptionStatus.Subscribed;

   return (
      <FooterNewsletter>
         <FooterNewsletterCopy>
            <FooterNewsletterTitle>{title}</FooterNewsletterTitle>
            <FooterNewsletterDescription>
               {description}
            </FooterNewsletterDescription>
         </FooterNewsletterCopy>
         <FooterNewsletterForm onSubmit={onSubscribe} position="relative">
            <FooterNewsletterFormControl isInvalid={subscription.error != null}>
               <FooterNewsletterEmailLabel>
                  Enter your email
               </FooterNewsletterEmailLabel>
               <FooterNewsletterEmailInput
                  ref={inputRef}
                  disabled={subscription.status !== SubscriptionStatus.Idle}
                  placeholder={emailPlaceholder}
                  visibility={isSubscribed ? 'hidden' : 'visible'}
               />
               <FormErrorMessage>{subscription.error}</FormErrorMessage>
            </FooterNewsletterFormControl>
            <Button
               type="submit"
               data-testid="footer-newsletter-subscribe-button"
               isLoading={
                  subscription.status === SubscriptionStatus.Subscribing
               }
               disabled={subscription.status !== SubscriptionStatus.Idle}
               colorScheme="brand"
               visibility={isSubscribed ? 'hidden' : undefined}
            >
               {subscribeLabel}
            </Button>
            {isSubscribed && (
               <Text
                  align="center"
                  position={'absolute'}
                  top="0"
                  left="0"
                  right="5"
                  bottom="0"
                  lineHeight="10"
               >
                  <FaIcon icon={faCircleCheck} h="4" mr="1.5" color="white" />
                  Subscribed!
               </Text>
            )}
         </FooterNewsletterForm>
      </FooterNewsletter>
   );
}

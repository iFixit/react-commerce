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
   Icon,
   Input,
   InputProps,
   Stack,
   StackProps,
   Text,
   TextProps,
} from '@chakra-ui/react';
import {
   SubscriptionStatus,
   useSubscribeToNewsletter,
} from '@ifixit/newsletter-sdk';
import { RiCheckFill } from 'react-icons/ri';
import React from 'react';

const FooterNewsletter = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <Stack
         ref={ref}
         direction="column"
         ml={{
            base: 0,
            // since the legal column is skinny, let's scoot the newsletter over
            lg: -24,
         }}
         mt={{
            base: 0,
            sm: 10,
            lg: 0,
         }}
         gridColumnEnd={{
            sm: 'span 3',
            lg: 'auto',
         }}
         spacing={3}
         justify="flex-start"
         w={{
            base: 'full',
            md: 'auto',
         }}
         {...props}
      />
   );
});

type NewsletterCopyProps = BoxProps & {
   title: string;
   description: string;
};

const FooterNewsletterCopy = forwardRef<NewsletterCopyProps, 'div'>(
   ({ title, description, ...props }, ref) => {
      return (
         <Box ref={ref} textAlign="left" {...props}>
            <FooterNewsletterTitle>{title}</FooterNewsletterTitle>
            <FooterNewsletterDescription>
               {description}
            </FooterNewsletterDescription>
         </Box>
      );
   }
);

const FooterNewsletterTitle = forwardRef<TextProps, 'div'>((props, ref) => {
   return (
      <Text
         ref={ref}
         fontSize="md"
         fontWeight="bold"
         color="white"
         {...props}
      />
   );
});

const FooterNewsletterDescription = forwardRef<TextProps, 'div'>(
   (props, ref) => {
      return <Text ref={ref} fontSize="sm" color="gray.300" {...props} />;
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
      return <FormControl ref={ref} w="full" {...props} />;
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
         <FooterNewsletterCopy title={title} description={description} />
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
                  <Icon
                     as={RiCheckFill}
                     boxSize="5"
                     mb="-5px"
                     mr="6px"
                     ml="12px"
                  />
                  Subscribed!
               </Text>
            )}
         </FooterNewsletterForm>
      </FooterNewsletter>
   );
}

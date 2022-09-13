import {
   Alert,
   Box,
   Button,
   Flex,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Text,
   useTheme,
} from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   parseProductCode,
   parseProductOptionId,
} from '@helpers/product-helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import * as React from 'react';

enum NotifyMeStatus {
   Idle = 'idle',
   Submitting = 'submitting',
   Submitted = 'submitted',
   Error = 'error',
}

export type NotifyMeFormProps = {
   sku: string;
   salesChannelID: number;
};

export function NotifyMeForm({ sku, salesChannelID }: NotifyMeFormProps) {
   const theme = useTheme();
   const [status, setStatus] = React.useState<NotifyMeStatus>(
      NotifyMeStatus.Idle
   );

   const ifixitAPI = useIFixitApiClient();

   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus(NotifyMeStatus.Submitting);
      try {
         const formData = new FormData(event.currentTarget);
         const email = formData.get('email');
         if (typeof email != 'string') {
            throw new Error('email is required');
         }
         await ifixitAPI.post('cart/product/notifyWhenInStock', {
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               productcode: parseProductCode(sku),
               optionid: parseProductOptionId(sku),
               email,
               sales_channelid: salesChannelID,
            }),
         });
         setStatus(NotifyMeStatus.Submitted);
      } catch (error) {
         setStatus(NotifyMeStatus.Error);
      }
   };

   if (status === NotifyMeStatus.Submitted) {
      return (
         <Alert status="success">
            <FontAwesomeIcon
               icon={faCheckCircle}
               color={theme.colors['green'][700]}
               style={{
                  display: 'block',
                  width: '20px',
                  height: '20px',
                  marginRight: '8px',
               }}
            />
            You will be notified when this product is back in stock.
         </Alert>
      );
   }

   return (
      <Box
         bg="brand.100"
         borderWidth="1px"
         borderColor="brand.200"
         borderRadius="md"
         w="full"
         px="3"
         py="4"
      >
         <form onSubmit={handleFormSubmit}>
            <Text color="brand.500">
               This item is currently <strong>Out of Stock</strong>
            </Text>
            <Flex mt="2.5" align="flex-start">
               <FormControl isInvalid={status === NotifyMeStatus.Error}>
                  <FormLabel htmlFor="notify-me-email" srOnly>
                     Email address
                  </FormLabel>
                  <Input
                     id="notify-me-email"
                     type="email"
                     name="email"
                     required
                     isDisabled={status === NotifyMeStatus.Submitting}
                     placeholder="Email"
                     variant="filled"
                     bg="white"
                     borderColor="gray.300"
                     borderWidth={1}
                     flex="1"
                     _hover={{ bg: 'gray.100' }}
                     _focus={{ bg: 'white', boxShadow: 'outline' }}
                  />
                  {status === NotifyMeStatus.Error && (
                     <FormErrorMessage>Request failed</FormErrorMessage>
                  )}
               </FormControl>
               <Button
                  type="submit"
                  isLoading={status === NotifyMeStatus.Submitting}
                  isDisabled={status === NotifyMeStatus.Submitting}
                  colorScheme="brand"
                  ml="2.5"
                  px="4"
                  flexShrink={0}
                  lineHeight="1em"
               >
                  Notify me
               </Button>
            </Flex>
         </form>
      </Box>
   );
}

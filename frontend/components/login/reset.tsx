import {
   Button,
   Flex,
   FormControl,
   FormHelperText,
   FormLabel,
   Heading,
   Input,
   Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { color, space, fontSize } from '@core-ds/primitives';

export function ResetHeader({ goToLogin }: { goToLogin: () => void }) {
   return (
      <Flex direction="column" align="center">
         <Heading mt={`${space[2]}`}>Forgot Password</Heading>
         <Flex mt={`${space[3]}`} align="baseline">
            <Text
               m={`0 ${space[1]} 0 0`}
               fontWeight="normal"
               fontSize={`${fontSize.md}`}
               color={`${color.gray6}`}
            >
               Remember your password now?
            </Text>
            <Button
               variant="link"
               fontSize={`${fontSize.md}`}
               color={`${color.blue}`}
               onClick={goToLogin}
            >
               Log in
            </Button>
         </Flex>
      </Flex>
   );
}

export function ResetForm() {
   const [email, setEmail] = useState('');
   const toast = useToast();
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
   };

   function showToast(response: number) {
      switch (response) {
         case 403:
            toast({
               title: "You've requested too many new password emails.",
               position: 'top',
               status: 'error',
               duration: 2000,
            });
            break;
         case 200:
            toast({
               title: "We've emailed you a new password link.",
               position: 'top',
               status: 'success',
               duration: 2000,
            });
            break;
         default:
            toast({
               title: 'There is no account associated with this email.',
               position: 'top',
               status: 'error',
               duration: 2000,
            });
      }
   }

   async function resetPassword() {
      await fetch('https://www.ifixit.com/api/2.0/users/reset_password', {
         method: 'POST',
         body: JSON.stringify({ email: email }),
      }).then((response) => showToast(response.status));
   }

   return (
      <form
         onSubmit={(event) => {
            event.preventDefault();
            resetPassword();
         }}
      >
         <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
               onChange={handleChange}
               type="email"
               placeholder="Enter email"
            />
            <FormHelperText>
               {
                  "You'll receive an email containing a link to log in and set a new password."
               }
            </FormHelperText>
         </FormControl>
         <Flex justify="center">
            <Button
               mt={`${space[5]}`}
               bgColor={`${color.blue}`}
               color="white"
               _hover={{ bgColor: `${color.blue}` }}
               _active={{ bgColor: `${color.blue}` }}
               type="submit"
            >
               Send me an Email
            </Button>
         </Flex>
      </form>
   );
}

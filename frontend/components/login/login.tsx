import {
   Button,
   Flex,
   FormControl,
   FormLabel,
   Heading,
   Input,
   Text,
   useToast,
} from '@chakra-ui/react';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import PasswordInput from './password';

interface Login {
   email: string;
   password: string;
}

export function LoginHeader({ goToRegister }: { goToRegister: () => void }) {
   return (
      <Flex direction="column" align="center">
         <Heading mt="8px">Log In</Heading>
         <Flex mt="12px" align="baseline">
            <Text m="0 4px 0 0" fontWeight="normal" fontSize="14px" color="var(--color-gray-6)">
               New?
            </Text>
            <Button variant="link" fontSize="14px" color="var(--color-blue)" onClick={goToRegister}>
               Create an account
            </Button>
         </Flex>
      </Flex>
   );
}

export function LoginForm({
   goToReset,
   setUser,
}: {
   goToReset: () => void;
   setUser: React.Dispatch<React.SetStateAction<{}>>;
}) {
   const [login, setLogin] = useState<Login>({
      email: '',
      password: '',
   });
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const label = event.target.name;
      const value = event.target.value;
      setLogin({ ...login, [label]: value });
   };
   const appId = 'be0ef8241c0be993ae73c407e6c536b9';
   const toast = useToast();

   async function performLogin() {
      await fetch('https://www.ifixit.com/api/2.0/user/token', {
         method: 'POST',
         body: JSON.stringify(login),
         headers: {
            'X-App-Id': appId,
         },
      }).then(response =>
         response
            .json()
            .then(data => ({ status: response.status, body: data }))
            .then(data => {
               const response = data.body;
               const success = data.status < 400;
               if (success) {
                  setUser(response);
               }
               showFeedback(success, response.message, response.username);
            })
      );
   }

   function showFeedback(success: boolean, errMsg?: string, username?: string) {
      const successMsg = 'Welcome back, ' + username + '!';
      const feedback = success ? successMsg : errMsg;
      toast({
         title: feedback,
         position: 'top',
         status: success ? 'success' : 'error',
         duration: 7000,
         isClosable: true,
      });
   }

   function allowSubmit(): boolean {
      return login.email.length > 0 && login.password.length > 0;
   }

   return (
      <form
         onSubmit={event => {
            event.preventDefault();
            performLogin();
         }}
      >
         <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter email" name="email" onChange={handleChange} />
         </FormControl>
         <FormControl mt="20px">
            <Flex justify="space-between">
               <FormLabel>Password</FormLabel>
               <Button variant="link" fontSize="14px" color="var(--color-blue)" onClick={goToReset}>
                  Forgot?
               </Button>
            </Flex>
            <PasswordInput handleChange={handleChange as ChangeEventHandler<HTMLInputElement>} />
         </FormControl>
         <Flex justify="center">
            <Button
               mt="32px"
               bgColor="var(--color-blue)"
               color="white"
               type="submit"
               disabled={!allowSubmit()}
               _hover={{ bgColor: 'var(--color-blue)' }}
               _active={{ bgColor: 'var(--color-blue)' }}
            >
               Log In
            </Button>
         </Flex>
      </form>
   );
}

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
import { color, fontSize, space } from '@core-ds/primitives';

interface Login {
   email: string;
   password: string;
}

export function LoginHeader({ goToRegister }: { goToRegister: () => void }) {
   return (
      <Flex direction="column" align="center">
         <Heading mt={`${space[2]}`}>Log In</Heading>
         <Flex mt={`${space[3]}`} align="baseline">
            <Text
               m={`0 ${space[1]} 0 0`}
               fontWeight="normal"
               fontSize={`${fontSize.md}`}
               color={`${color.gray6}`}
            >
               New?
            </Text>
            <Button
               variant="link"
               fontSize={`${fontSize.md}`}
               color={`${color.blue}`}
               onClick={goToRegister}
            >
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
      }).then((response) =>
         response
            .json()
            .then((data) => ({ status: response.status, body: data }))
            .then((data) => {
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
         onSubmit={(event) => {
            event.preventDefault();
            performLogin();
         }}
      >
         <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
               placeholder="Enter email"
               name="email"
               onChange={handleChange}
            />
         </FormControl>
         <FormControl mt="20px">
            <Flex justify="space-between">
               <FormLabel>Password</FormLabel>
               <Button
                  variant="link"
                  fontSize={`${fontSize.md}`}
                  color={`${color.blue}`}
                  onClick={goToReset}
               >
                  Forgot?
               </Button>
            </Flex>
            <PasswordInput
               handleChange={
                  handleChange as ChangeEventHandler<HTMLInputElement>
               }
            />
         </FormControl>
         <Flex justify="center">
            <Button
               mt={`${space[6]}`}
               bgColor={`${color.blue}`}
               color="white"
               type="submit"
               disabled={!allowSubmit()}
               _hover={{ bgColor: `${color.blue}` }}
               _active={{ bgColor: `${color.blue}` }}
            >
               Log In
            </Button>
         </Flex>
      </form>
   );
}

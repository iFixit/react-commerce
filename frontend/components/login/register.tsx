import {
   Button,
   Flex,
   FormControl,
   FormHelperText,
   FormLabel,
   Heading,
   Input,
   InputGroup,
   InputLeftElement,
   Link,
   Text,
   useToast,
} from '@chakra-ui/react';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import PasswordInput from './password';
import { color, fontSize, space, borderRadius } from '@core-ds/primitives';

interface User {
   username: string;
   unique_username: string;
   email: string;
   password: string;
}

export function RegisterHeader({ goToLogin }: { goToLogin: () => void }) {
   return (
      <Flex direction="column" align="center">
         <Heading mt="8px">Create Account</Heading>
         <Flex mt="12px" align="baseline">
            <Text
               m={`0 ${space[1]} 0 0`}
               fontWeight="normal"
               fontSize={`${fontSize.md}`}
               color={`${color.gray6}`}
            >
               Been here before?
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

export function RegisterForm({ goToLogin }: { goToLogin: () => void }) {
   const [user, setUser] = useState<User>({
      username: '',
      unique_username: '',
      email: '',
      password: '',
   });
   const [showAlert, setShowAlert] = useState(false);
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const label = event.target.name;
      const value = event.target.value;
      setUser({ ...user, [label]: value });
   };
   const toast = useToast();
   const appId = 'be0ef8241c0be993ae73c407e6c536b9';

   async function register() {
      await fetch('https://www.ifixit.com/api/2.0/users', {
         method: 'POST',
         body: JSON.stringify(user),
         headers: {
            'X-App-Id': appId,
         },
      }).then((response) =>
         response
            .json()
            .then((data) => ({ status: response.status, body: data.message }))
            .then((data) => showFeedback(data.status < 400, data.body))
      );
   }

   function showFeedback(success: boolean, errMsg?: string) {
      const successMsg = 'Registration successful! Please log in.';
      const feedback = success ? successMsg : errMsg;
      toast({
         title: feedback,
         position: 'top',
         status: success ? 'success' : 'error',
         duration: 7000,
         isClosable: true,
      });
      if (success) {
         goToLogin();
      }
   }

   function isValidName(): boolean {
      const name = user.username;
      const length = name.length;
      const validLength = length >= 3 && length <= 30;
      const validChars = !name.includes('<') && !name.includes('>');
      return validLength && validChars;
   }

   function allowSubmit(): boolean {
      return (
         isValidName() &&
         user.unique_username.length > 0 &&
         user.email.length > 0 &&
         user.password.length > 0
      );
   }

   return (
      <form
         onSubmit={(event) => {
            event.preventDefault();
            register();
         }}
      >
         <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
               placeholder="Albert Einstein"
               name="username"
               onChange={handleChange}
               onSelect={() => setShowAlert(true)}
               isInvalid={!isValidName() && showAlert}
               errorBorderColor="#dd4d31"
            />
         </FormControl>
         {!isValidName() && showAlert && (
            <Text
               padding="10px"
               mt={`${space[3]}`}
               fontSize={`${fontSize.md}`}
               color={`${color.gray5}`}
               border="1px solid #f5cac1"
               bgColor="#fcedea"
               borderRadius={`${borderRadius.md}`}
            >
               {
                  'Please choose a descriptive, family friendly user name. User names\
             should be at least three and no more than 30 characters and not\
             include the < or > characters.'
               }
            </Text>
         )}
         <FormControl mt={`${space[5]}`}>
            <FormLabel>Unique Username</FormLabel>
            <InputGroup>
               <InputLeftElement pointerEvents="none" color={`${color.gray4}`}>
                  @
               </InputLeftElement>
               <Input
                  name="unique_username"
                  onChange={handleChange}
                  placeholder="albert"
                  pl="28px"
               />
            </InputGroup>
         </FormControl>
         <FormControl mt={`${space[5]}`}>
            <FormLabel>Email</FormLabel>
            <Input
               name="email"
               onChange={handleChange}
               placeholder="albert@domain.com"
               type="email"
            />
            <FormHelperText
               fontSize={`${fontSize.md}`}
               color={`${color.gray5}`}
            >
               {
                  "We'll use your email to send you updates on your community contributions."
               }
            </FormHelperText>
         </FormControl>
         <FormControl mt={`${space[5]}`}>
            <FormLabel>Password</FormLabel>
            <PasswordInput
               handleChange={
                  handleChange as ChangeEventHandler<HTMLInputElement>
               }
            />
         </FormControl>
         <Button
            mt={`${space[6]}`}
            bgColor={`${color.blue}`}
            color="white"
            disabled={!allowSubmit()}
            _hover={{ bgColor: `${color.blue}` }}
            _active={{ bgColor: `${color.blue}` }}
            type="submit"
         >
            Create My Account
         </Button>
         <Text
            color={`${color.gray5}`}
            fontSize={`${fontSize.md}`}
            mt={`${space[2]}`}
         >
            By joining iFixit, you agree to our{' '}
            <Link
               href="https://www.ifixit.com/Info/Privacy"
               color={`${color.blue}`}
            >
               Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
               href="https://www.ifixit.com/Info/Terms_of_Use"
               color={`${color.blue}`}
            >
               Terms
            </Link>
         </Text>
      </form>
   );
}

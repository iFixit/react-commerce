import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalCloseButton,
   Stack,
   StackDivider,
   ModalFooter,
   Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ExternalLogin from './externalLogin';
import { ResetHeader, ResetForm } from './reset';
import { LoginHeader, LoginForm } from './login';
import { RegisterHeader, RegisterForm } from './register';

export default function LoginModal({
   isOpen,
   onClose,
   setUser,
}: {
   isOpen: boolean;
   onClose: () => void;
   setUser: React.Dispatch<React.SetStateAction<{}>>;
}) {
   const [mode, setMode] = useState('login');

   function getProperHeader() {
      switch (mode) {
         case 'reset':
            return <ResetHeader goToLogin={() => setMode('login')} />;
         case 'register':
            return <RegisterHeader goToLogin={() => setMode('login')} />;
         default:
            return <LoginHeader goToRegister={() => setMode('register')} />;
      }
   }

   function getProperForm() {
      switch (mode) {
         case 'reset':
            return <ResetForm />;
         case 'register':
            return <RegisterForm goToLogin={() => setMode('login')} />;
         default:
            return <LoginForm goToReset={() => setMode('reset')} setUser={setUser} />;
      }
   }

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent overflow="hidden" w={{ base: '90%', md: '700px' }} mt="90px">
            <ModalHeader>{getProperHeader()}</ModalHeader>
            <ModalCloseButton />
            <ModalBody
               bgColor="var(--color-gray-1)"
               padding="0"
               borderTop="1px solid var(--color-gray-2)"
            >
               <Stack
                  divider={
                     <StackDivider
                        borderColor="var(--color-gray-2)"
                        display={{ base: 'none', md: 'unset' }}
                     />
                  }
                  spacing="0"
                  direction={{ base: 'column', md: 'row' }}
               >
                  <Flex
                     direction="column"
                     m="36px 0 48px"
                     padding="0 36px"
                     w={{ base: '100%', md: '50%' }}
                  >
                     {getProperForm()}
                  </Flex>
                  <ExternalLogin />
               </Stack>
            </ModalBody>
            <ModalFooter padding="0" bgColor="var(--color-gray-1)" />
         </ModalContent>
      </Modal>
   );
}

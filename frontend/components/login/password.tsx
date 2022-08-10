import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function PasswordInput({
   handleChange,
}: {
   handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
   const [show, setShow] = useState(false);
   const handleClick = () => setShow(!show);

   return (
      <InputGroup size="md">
         <Input
            onChange={handleChange}
            name="password"
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
         />
         <InputRightElement mr="4px">
            <Button h="1.75rem" size="sm" onClick={handleClick} border="none">
               {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
         </InputRightElement>
      </InputGroup>
   );
}

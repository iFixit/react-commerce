import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

export const LinkButton = forwardRef<ButtonProps, 'a'>((props, ref) => (
   <Button ref={ref} as="a" {...props} />
));

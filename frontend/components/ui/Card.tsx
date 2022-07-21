import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';

export type CardProps = FlexProps & {
   className?: string;
};

export const Card = forwardRef<CardProps, 'div'>(
   ({ children, className, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            className={className}
            bg="white"
            boxShadow="base"
            borderRadius="lg"
            direction="column"
            {...otherProps}
         >
            {children}
         </Flex>
      );
   }
);

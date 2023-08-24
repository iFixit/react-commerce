import { Box, BoxProps } from '@chakra-ui/react';
import { motion, usePresence } from 'framer-motion';
import * as React from 'react';

// This is a temporary type fix for Framer Motion since
// React 18 typings breaks FC which Framer Motion relies on.
declare module 'framer-motion' {
   export interface AnimatePresenceProps {
      children?: React.ReactNode;
   }
}

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

export function AnimatedListItem({ children }: React.PropsWithChildren<{}>) {
   const [isPresent, safeToRemove] = usePresence();

   return (
      <MotionBox
         as="li"
         w="full"
         layout
         style={{ position: isPresent ? 'static' : 'absolute' }}
         initial="in"
         animate={isPresent ? 'in' : 'out'}
         variants={{
            in: {
               height: 'auto',
            },
            out: {
               height: 0,
               zIndex: -1,
               overflow: 'hidden',
            },
         }}
         onAnimationComplete={() => !isPresent && safeToRemove?.()}
         transition={{
            type: 'spring',
            stiffness: 500,
            damping: 50,
            mass: 1,
         }}
      >
         {children}
      </MotionBox>
   );
}

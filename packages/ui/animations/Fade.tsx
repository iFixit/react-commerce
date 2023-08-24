import { Box, BoxProps } from '@chakra-ui/react';
import { fadeIn, fadeOut } from './keyframes';
import { useCSSTransition } from './useCSSTransition';

type FadeProps = BoxProps & {
   show: boolean | undefined | null;
   disableEntryAnimation?: boolean;
   disableExitAnimation?: boolean;
};

export function Fade({
   show = false,
   disableEntryAnimation = false,
   disableExitAnimation = false,
   sx,
   children,
   ...otherProps
}: FadeProps) {
   const transition = useCSSTransition({
      show,
      disableEntryAnimation,
      disableExitAnimation,
   });

   return (
      <Box
         className={transition.state}
         hidden={transition.state === 'hide'}
         sx={{
            ...sx,
            '&.hide': {
               opacity: 0,
            },
            '&.show': {
               opacity: 1,
            },
            '&.enter': {
               animation: `${fadeIn} 250ms ease-in-out forwards`,
            },
            '&.exit': {
               animation: `${fadeOut} 250ms ease-in-out forwards`,
            },
         }}
         onAnimationEnd={transition.onAnimationEnd}
         {...otherProps}
      >
         {children}
      </Box>
   );
}

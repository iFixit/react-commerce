import { Box, BoxProps } from '@chakra-ui/react';
import { slideFadeIn, slideFadeOut, slideIn, slideOut } from './keyframes';
import { useSize } from './useSize';
import { useCSSTransition } from './useCSSTransition';

type CollapseProps = BoxProps & {
   show: boolean | undefined | null;
   animateOpacity?: boolean;
};

export function Collapse({
   show = false,
   animateOpacity = false,
   sx,
   children,
   ...otherProps
}: CollapseProps) {
   const transition = useCSSTransition({ show });
   const [ref, size] = useSize();
   const height = size?.height;

   return (
      <Box
         className={
            show
               ? height == null
                  ? undefined
                  : transition.state
               : transition.state
         }
         hidden={transition.state === 'hide'}
         sx={{
            ...sx,
            '--slide-height': `${height}px`,
            '&.hide': {
               height: 0,
               opacity: animateOpacity ? 0 : undefined,
            },
            '&.show': {
               height: 'var(--slide-height)',
               opacity: animateOpacity ? 1 : undefined,
            },
            '&.enter': {
               animation: `${
                  animateOpacity ? slideFadeIn : slideIn
               } 250ms ease-in-out forwards`,
            },
            '&.exit': {
               animation: `${
                  animateOpacity ? slideFadeOut : slideOut
               } 250ms ease-in-out forwards`,
            },
         }}
         overflow="hidden"
         onAnimationEnd={transition.onAnimationEnd}
         {...otherProps}
      >
         <div ref={ref}>{children}</div>
      </Box>
   );
}

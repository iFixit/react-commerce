import { usePrevious } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useIsMounted } from '../hooks';

type UseCSSTransitionProps = {
   show: boolean | undefined | null;
   disableEntryAnimation?: boolean;
   disableExitAnimation?: boolean;
};

export type TransitionState = 'enter' | 'show' | 'exit' | 'hide';

export function useCSSTransition({
   show = false,
   disableEntryAnimation = false,
   disableExitAnimation = false,
}: UseCSSTransitionProps) {
   const [state, setState] = useState<TransitionState>(show ? 'show' : 'hide');
   const isMounted = useIsMounted();
   const previousShow = usePrevious(show);

   useEffect(() => {
      if (isMounted && previousShow !== show) {
         if (show) {
            setState(disableEntryAnimation ? 'show' : 'enter');
         } else {
            setState(disableExitAnimation ? 'hide' : 'exit');
         }
      }
   }, [show, previousShow, disableEntryAnimation, disableExitAnimation]);

   const onAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
      event
   ) => {
      if (event.target !== event.currentTarget) return;

      setState((current) => {
         switch (current) {
            case 'enter':
               return 'show';
            case 'exit':
               return 'hide';
            default:
               return current;
         }
      });
   };

   return { state, onAnimationEnd };
}

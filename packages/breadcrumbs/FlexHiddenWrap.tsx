import { SystemProps } from '@chakra-ui/react';
import { useRef, useLayoutEffect, ReactNode, RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '@ifixit/ui';

export type HiddenWrapEffect = (
   _children: HTMLElement[],
   _container: HTMLElement
) => void;
export function useHiddenWrap<T extends HTMLElement>({
   wrappedChildrenEffect,
   shownChildrenEffect,
}: {
   wrappedChildrenEffect?: HiddenWrapEffect;
   shownChildrenEffect?: HiddenWrapEffect;
}): {
   ref: RefObject<T | undefined>;
   display: SystemProps['display'];
   flexWrap: SystemProps['flexWrap'];
   overflow: SystemProps['overflow'];
} {
   const ref = useRef<T>();

   useIsomorphicLayoutEffect(() => {
      if (!ref?.current) {
         return;
      }

      const measure = () => {
         if (ref.current) {
            onBrowserRender(
               ref.current,
               wrappedChildrenEffect,
               shownChildrenEffect
            );
         }
      };

      measure();
      window.addEventListener('resize', measure);
      return () => {
         window.removeEventListener('resize', measure);
      };
   }, [ref.current, wrappedChildrenEffect, shownChildrenEffect]);
   return { ref, display: 'flex', flexWrap: 'wrap', overflow: 'hidden' };
}

function onBrowserRender<T extends HTMLElement>(
   container: T,
   wrappedEffect: undefined | HiddenWrapEffect,
   shownEffect: undefined | HiddenWrapEffect
) {
   const buffer = container.offsetHeight / 2;
   const wrappedPX = container.offsetTop + buffer;
   const children = Array.from(container.children) as HTMLElement[];

   const wrappedChildren = children.filter(
      (child) => child.offsetTop > wrappedPX
   );
   const shownChildren = children.filter(
      (child) => child.offsetTop <= wrappedPX
   );
   wrappedEffect?.(wrappedChildren, container);
   shownEffect?.(shownChildren, container);
}

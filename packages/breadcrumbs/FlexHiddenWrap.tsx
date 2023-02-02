import { SystemProps } from '@chakra-ui/react';
import { useRef, useLayoutEffect, ReactNode, RefObject } from 'react';

export type HiddenWrapEffect = (_children: HTMLElement[], _container: HTMLElement) => void;
export function useHiddenWrap<T extends HTMLElement>({
   wrappedChildrenEffect,
   shownChildrenEffect,
}: {
   wrappedChildrenEffect?: HiddenWrapEffect;
   shownChildrenEffect?: HiddenWrapEffect;
}): {
   ref: RefObject<T>;
   display: SystemProps['display'];
   flexWrap: SystemProps['flexWrap'];
   overflow: SystemProps['overflow'];
} {
   const ref = useRef<T>();

   useLayoutEffect(() => {
      if (!ref?.current) {
         return;
      }

      const measure = () => {
         onBrowserRender(ref.current, wrappedChildrenEffect, shownChildrenEffect);
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
   wrappedEffect: HiddenWrapEffect,
   shownEffect: HiddenWrapEffect
) {
   const containerStart = container.offsetTop;
   const children = Array.from(container.children) as HTMLElement[];

   const wrappedChildren = children.filter(child => child.offsetTop > containerStart);
   const shownChildren = children.filter(child => child.offsetTop <= containerStart);
   wrappedEffect?.(wrappedChildren, container);
   shownEffect?.(shownChildren, container);
}

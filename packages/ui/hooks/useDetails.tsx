import { useBoolean } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';

export function useDetails(): readonly [
   React.RefObject<HTMLDetailsElement>,
   boolean,
   () => void
] {
   const [isOpen, { toggle: toggleIsOpen }] = useBoolean(false);
   const ref = useRef<HTMLDetailsElement>(null);
   useEffect(() => {
      const { current } = ref;
      current?.addEventListener('toggle', toggleIsOpen);
      return () => {
         current?.removeEventListener('toggle', toggleIsOpen);
      };
   }, [ref, toggleIsOpen]);
   const toggle = useCallback(() => {
      ref.current?.toggleAttribute('open');
   }, [ref]);
   return [ref, isOpen, toggle] as const;
}

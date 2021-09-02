import * as React from 'react';

export function useDebouncedCallback<Args extends any[]>(
   callback: (...args: Args) => void,
   wait: number
) {
   const savedCallbackRef = React.useRef(callback);
   const argsRef = React.useRef<Args>();
   const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

   function cleanup() {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }
   }

   React.useEffect(() => {
      savedCallbackRef.current = callback;
   }, [callback]);

   React.useEffect(() => cleanup, []);

   return function debouncedCallback(...args: Args) {
      argsRef.current = args;

      function execute() {
         if (argsRef.current) {
            savedCallbackRef.current(...argsRef.current);
         }
      }

      cleanup();

      timeoutRef.current = setTimeout(execute, wait);
   };
}

export function useDerivedState<T = any>(compute: (value: T | undefined) => T) {
   const stateRef = React.useRef<T>();

   stateRef.current = compute(stateRef.current);

   return stateRef.current;
}

export function usePrevious<T>(value: T): T | undefined {
   const ref = React.useRef<T>();

   React.useEffect(() => {
      ref.current = value;
   }, [value]);

   return ref.current;
}

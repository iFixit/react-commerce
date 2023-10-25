import { useBreakpointValue } from '@chakra-ui/react';
import { useSafeLocalStorage } from '@ifixit/local-storage';
import * as React from 'react';

export function useDebounce<Value = any>(value: Value, delay: number): Value {
   const [debouncedValue, setDebouncedValue] = React.useState(value);

   React.useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);
      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

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

export function usePrevious<T>(value: T): T | undefined {
   const ref = React.useRef<T>();

   React.useEffect(() => {
      ref.current = value;
   }, [value]);

   return ref.current;
}

export const useIsomorphicLayoutEffect =
   typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export function useIsMountedState() {
   const [isMounted, setIsMounted] = React.useState(false);

   React.useEffect(() => {
      setIsMounted(true);
   }, []);

   return isMounted;
}

export function useIsMounted() {
   const isMountedRef = React.useRef(false);

   React.useEffect(() => {
      isMountedRef.current = true;
      return () => {
         isMountedRef.current = false;
      };
   }, []);

   return isMountedRef.current;
}

interface UsePreloadImage {
   preload(url: string): void;
   isLoaded: boolean;
   isError: boolean;
   error: any;
}

export function usePreloadImage(): UsePreloadImage {
   const [state, setState] = useSafeSetState<{
      status: 'idle' | 'loading' | 'loaded' | 'error';
      error: any;
   }>({
      status: 'idle',
      error: null,
   });

   const preload = React.useCallback((url: string) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
         setState({
            status: 'loaded',
            error: null,
         });
      };
      img.onerror = (err) => {
         setState({
            status: 'error',
            error: err,
         });
      };
   }, []);

   return {
      preload,
      isError: state?.status === 'error',
      isLoaded: state?.status === 'loaded',
      error: state?.error,
   };
}

/**
 * This hook is similar to Chakra `useBreakpointValue` hook, but it's designed to work with server
 * side rendering, namely it doesn't show warnings on the initial render.
 */
export function useSSRBreakpointValue<Value>(
   values: Value[] | Partial<Record<string, Value>>,
   defaultBreakpoint?: string | undefined
) {
   const isMounted = useIsMountedState();
   const breakpointValue = useBreakpointValue(values, defaultBreakpoint);
   return isMounted ? breakpointValue : defaultBreakpoint;
}

/**
 * A simple hook to store user preferences in local storage.
 * @param key localStorage key
 * @returns [value, setValue] tuple where `value` is the current value and `setValue` is a function to update it.
 */
export function useExpiringLocalPreference<Data = any>(
   key: string,
   defaultData: Data,
   expireInDays: number,
   validator: (data: any) => Data | null
): [Data, (data: Data) => void] {
   type ExpiringData = {
      value: Data;
      expires: number;
   };

   const [data, setData] = React.useState(defaultData);

   React.useEffect(() => {
      const safeLocalStorage = useSafeLocalStorage();
      const serializedData = safeLocalStorage.getItem(key);
      if (serializedData != null) {
         try {
            const data = JSON.parse(serializedData) as ExpiringData;
            const expiresAt = Number.isInteger(data?.expires)
               ? data.expires
               : 0;
            const validData = validator(data?.value);
            if (validData !== null && expiresAt && Date.now() < expiresAt) {
               setData(validData);
            } else {
               safeLocalStorage.removeItem(key);
            }
         } catch (e) {
            safeLocalStorage.removeItem(key);
         }
      }
   }, []);

   const setAndSave = (data: Data) => {
      setData(data);
      const expiringData = {
         value: data,
         expires: Date.now() + expireInDays * 1000 * 86400,
      } as ExpiringData;
      const serializedData = JSON.stringify(expiringData);
      const safeLocalStorage = useSafeLocalStorage();
      safeLocalStorage.setItem(key, serializedData);
   };

   return [data, setAndSave];
}

/**
 * A simple hook to store user preferences in local storage.
 * @param key localStorage key
 * @param defaultData
 * @returns [value, setValue] tuple where `value` is the current value and `setValue` is a function to update it.
 */
export function useLocalPreference<Data = any>(
   key: string,
   defaultData: Data,
   validator: (data: any) => Data | null
): [Data, (data: Data) => void] {
   const [data, setData] = React.useState(defaultData);

   React.useEffect(() => {
      const safeLocalStorage = useSafeLocalStorage();
      const serializedData = safeLocalStorage.getItem(key);
      if (serializedData != null) {
         try {
            const parsedData = validator(JSON.parse(serializedData));
            if (parsedData !== null) {
               setData(parsedData);
            }
         } catch (e) {
            safeLocalStorage.removeItem(key);
         }
      }
   }, []);

   const setAndSave = (data: Data) => {
      setData(data);
      const serializedData = JSON.stringify(data);
      const safeLocalStorage = useSafeLocalStorage();
      safeLocalStorage.setItem(key, serializedData);
   };

   return [data, setAndSave];
}

export function useSafeSetState<T>(
   initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
   const [state, setState] = React.useState(initialState);

   const mountedRef = React.useRef(false);
   React.useEffect(() => {
      mountedRef.current = true;
      return () => {
         mountedRef.current = false;
      };
   }, []);
   const safeSetState = React.useCallback<
      React.Dispatch<React.SetStateAction<T>>
   >(
      (args) => {
         if (mountedRef.current) {
            return setState(args);
         }
      },
      [mountedRef, setState]
   );

   return [state, safeSetState];
}

/**
 * Creates a decoupled state value that is kept is sync with the provided state.
 * The purpose of this hook is to make an input field feel more responsive when the
 * state update depends on async requests.
 * @param state The state that is being decoupled
 * @returns The decoupled state
 */
export function useDecoupledState<Type = any>(
   state: Type
): [Type, React.Dispatch<React.SetStateAction<Type>>] {
   const [decoupledState, setDecoupledState] = React.useState(state);

   React.useEffect(() => {
      setDecoupledState(state);
   }, [state]);

   return [decoupledState, setDecoupledState];
}

interface UseOnScreenOptions {
   rootMargin?: string;
   initialOnScreen?: boolean;
}

export function useOnScreen(
   ref: React.RefObject<HTMLElement>,
   options?: UseOnScreenOptions
) {
   const [isIntersecting, setIntersecting] = React.useState(
      options?.initialOnScreen ?? false
   );
   React.useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIntersecting(entry.isIntersecting);
         },
         {
            rootMargin: options?.rootMargin || '0px',
         }
      );
      if (ref.current) {
         observer.observe(ref.current);
      }
      return () => {
         if (ref.current) observer.unobserve(ref.current);
      };
   }, []);
   return isIntersecting;
}

export function useIsScrolledPast(ref: React.RefObject<HTMLElement>) {
   const [isScrolledPast, setIsScrolledPast] = React.useState(false);

   React.useEffect(() => {
      const handleScroll = () => {
         if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setIsScrolledPast(rect.bottom < 0);
         }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [ref]);

   return isScrolledPast;
}

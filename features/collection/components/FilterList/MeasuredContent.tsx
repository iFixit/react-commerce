import * as React from 'react';
import { VariableSizeList } from 'react-window';

interface MeasuredContentContext {
   listRef: React.RefObject<VariableSizeList>;
   getSize(index: number): number;
   setSize(index: number, size: number): void;
}

const MeasuredContentContext = React.createContext<MeasuredContentContext | null>(
   null
);

export interface MeasuredContentProviderProps {}

export function MeasuredContentProvider({
   children,
}: React.PropsWithChildren<MeasuredContentProviderProps>) {
   const listRef = React.useRef<VariableSizeList>(null);
   const sizeMap = React.useRef<Record<number, number>>({});
   const setSize = React.useCallback<MeasuredContentContext['setSize']>(
      (index, size) => {
         sizeMap.current = { ...sizeMap.current, [index]: size };
         if (listRef.current) {
            listRef.current.resetAfterIndex(index);
         }
      },
      []
   );
   const getSize = React.useCallback<MeasuredContentContext['getSize']>(
      (index) => {
         return sizeMap.current[index] || 50;
      },
      []
   );

   const value: MeasuredContentContext = {
      listRef,
      getSize,
      setSize,
   };

   return (
      <MeasuredContentContext.Provider value={value}>
         {children}
      </MeasuredContentContext.Provider>
   );
}

export function useMeasuredContentContext() {
   const value = React.useContext(MeasuredContentContext);
   if (value == null) {
      throw new Error(
         "can't use useMeasuredContent without MeasuredContentProvider"
      );
   }
   return value;
}

export interface UseMeasureContentResult<T> {
   ref: React.MutableRefObject<T | null>;
   reset(): void;
   getSize(index: number): number;
}

export function useMeasureContent<T extends HTMLElement>(
   index: number,
   deps: React.DependencyList = []
): UseMeasureContentResult<T> {
   const ref = React.useRef<T | null>(null);
   const { setSize, getSize } = useMeasuredContentContext();

   React.useEffect(() => {
      if (ref.current != null) {
         setSize(index, ref.current.getBoundingClientRect().height);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [index, setSize, ...deps]);

   const reset = React.useCallback(() => {
      if (ref.current != null) {
         setSize(index, ref.current.getBoundingClientRect().height);
      }
   }, [index, setSize]);

   return {
      ref,
      reset,
      getSize,
   };
}

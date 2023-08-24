import { useEffect, useRef, useState } from 'react';

export function useSize() {
   const ref = useRef<HTMLDivElement>(null);
   const [size, setSize] = useState<DOMRect | null>(null);

   useEffect(() => {
      const element = ref.current;

      if (element) {
         setSize(element.getBoundingClientRect());
         const resizeObserver = new ResizeObserver(() => {
            setSize(element.getBoundingClientRect());
         });

         resizeObserver.observe(element);

         return () => resizeObserver.disconnect();
      }
   }, []);

   return [ref, size] as const;
}

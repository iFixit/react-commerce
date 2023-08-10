import { Flex, useToken } from '@chakra-ui/react';
import { useEffect, useState, RefObject } from 'react';

export function ScrollPercent({
   scrollContainerRef,
}: {
   scrollContainerRef?: RefObject<HTMLElement>;
}) {
   const [scrollPercent, setScrollPercent] = useState(0);

   const getUpdateScrollPercent = (container: HTMLElement) => {
      return () => {
         const atContainer = container.offsetTop < window.scrollY;
         if (!atContainer) {
            setScrollPercent(0);
            return;
         }

         const scrollPercent = Math.min(
            1,
            (window.scrollY - container.offsetTop) /
               (container.offsetHeight - window.innerHeight)
         );
         setScrollPercent(scrollPercent);
      };
   };

   useEffect(() => {
      const el = scrollContainerRef?.current || document.documentElement;
      const handler = getUpdateScrollPercent(el);
      window.addEventListener('scroll', handler);
      return () => {
         window.removeEventListener('scroll', handler);
      };
   }, [scrollContainerRef]);

   const height = useToken('space', 2);
   const [blue200, blue500] = useToken('colors', ['blue.200', 'blue.500']);

   return (
      <Flex
         position="sticky"
         top={0}
         left={0}
         width="100%"
         height={height}
         background={`linear-gradient(to right, ${blue500} ${
            scrollPercent * 100
         }%, ${blue200} 0%)`}
         // ensure the progress bar is always on top
         isolation="isolate"
         zIndex="1000"
      />
   );
}

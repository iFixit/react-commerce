import { Flex, useToken } from '@chakra-ui/react';
import { useEffect, useState, RefObject } from 'react';

export function ScrollPercent({
   scrollContainerRef,
   hideOnZero = false,
   hideOnScrollPast = false,
}: {
   scrollContainerRef?: RefObject<HTMLElement>;
   hideOnZero?: boolean;
   hideOnScrollPast?: boolean;
}) {
   const [scrollPercent, setScrollPercent] = useState(0);
   const [scrolledPast, setScrolledPast] = useState(false);

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
         setScrolledPast(
            scrollPercent === 1 &&
               window.scrollY > container.offsetTop + container.offsetHeight
         );
      };
   };

   useEffect(() => {
      const el = scrollContainerRef?.current || document.documentElement;
      const handler = getUpdateScrollPercent(el);
      window.addEventListener('scroll', handler);
      window.addEventListener('resize', handler);
      return () => {
         window.removeEventListener('scroll', handler);
         window.removeEventListener('resize', handler);
      };
   }, [scrollContainerRef]);

   const height = useToken('space', 2);
   const [blue200, blue500] = useToken('colors', ['blue.200', 'blue.500']);

   const containerTop = scrollContainerRef?.current?.offsetTop;
   const hasReachedScrollContainer =
      containerTop && window.scrollY > containerTop;
   if (hideOnZero && !hasReachedScrollContainer) {
      return null;
   }

   if (hideOnScrollPast && scrolledPast) {
      return null;
   }

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

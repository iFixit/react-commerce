import { Flex, useToken, css, useTheme, forwardRef } from '@chakra-ui/react';
import { useEffect, useState, RefObject, useCallback } from 'react';

export type ScrollPercentProps = {
   scrollContainerRef?: RefObject<HTMLElement>;
   onChange?: (percent: number, el: HTMLElement) => void;
   hidden?: boolean;
};

function getEl(scrollContainerRef?: RefObject<HTMLElement>): HTMLElement {
   return scrollContainerRef?.current || document.documentElement;
}

export const ScrollPercent = forwardRef(function ScrollPercent(
   { scrollContainerRef, onChange, hidden }: ScrollPercentProps,
   ref
) {
   const [scrollPercent, setScrollPercent] = useState(0);

   const updateScrollPercent = useCallback((container: HTMLElement) => {
      const atContainer = container.offsetTop < window.scrollY;
      if (!atContainer) {
         setScrollPercent(0);
         return;
      }

      const scrollPercent =
         (window.scrollY - container.offsetTop) /
         (container.offsetHeight - window.innerHeight);
      setScrollPercent(scrollPercent);
   }, []);

   useEffect(() => {
      const el = getEl(scrollContainerRef);
      onChange?.(scrollPercent, el);
   }, [scrollContainerRef, onChange, scrollPercent]);

   useEffect(() => {
      const el = getEl(scrollContainerRef);
      const handler = () => {
         updateScrollPercent(el);
      };

      window.addEventListener('scroll', handler);
      window.addEventListener('resize', handler);

      handler();

      return () => {
         window.removeEventListener('scroll', handler);
         window.removeEventListener('resize', handler);
      };
   }, [scrollContainerRef, updateScrollPercent]);

   const height = useScrollPercentHeight(CssTokenOption.CssString);
   const [blue200, blue500] = useToken('colors', ['blue.200', 'blue.500']);

   if (hidden) {
      return null;
   }

   const scrollPercentNormalized = Math.min(1, scrollPercent) * 100;

   return (
      <Flex
         position="sticky"
         top={0}
         left={0}
         width="100%"
         height={height}
         marginTop={`-${height}`}
         background={`linear-gradient(to right, ${blue500} ${scrollPercentNormalized}%, ${blue200} 0%)`}
         // ensure the progress bar is always on top
         isolation="isolate"
         zIndex="1000"
         ref={ref}
      />
   );
});

export enum CssTokenOption {
   ThemeToken = 'ThemeToken',
   CssString = 'CssString',
   Number = 'Number',
}

export function useScrollPercentHeight(
   option: CssTokenOption.ThemeToken
): number;
export function useScrollPercentHeight(
   option: CssTokenOption.CssString
): string;
export function useScrollPercentHeight(option: CssTokenOption.Number): number;

export function useScrollPercentHeight(
   option: CssTokenOption
): number | string {
   const space2 = useToken('space', 2);
   const theme = useTheme();
   if (option === CssTokenOption.ThemeToken) {
      return space2;
   }
   const cssThunk = css({
      height: space2,
   });

   const heightStr = cssThunk(theme).height as string;
   if (option === CssTokenOption.CssString) {
      return heightStr;
   }

   const height = parseInt(heightStr, 10);
   return height;
}

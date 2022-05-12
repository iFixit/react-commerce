import type { ThemeOverride } from '@chakra-ui/react';
import primitives from '@core-ds/primitives';

export const breakpoints: ThemeOverride['breakpoints'] = {
   base: '0em',
   sm: primitives.breakpoint.sm, // 576px
   md: primitives.breakpoint.md, // 768px
   lg: primitives.breakpoint.lg, // 1000px
   xl: primitives.breakpoint.xl, // 1200px
   '2xl': '1536px',
};

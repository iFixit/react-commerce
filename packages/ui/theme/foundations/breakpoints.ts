import type { ThemeOverride } from '@chakra-ui/react';
import primitives from '@core-ds/primitives';

export const breakpoints: ThemeOverride['breakpoints'] = {
   base: '0px',
   sm: primitives.breakpoint.sm,
   md: primitives.breakpoint.md,
   lg: primitives.breakpoint.lg,
   xl: primitives.breakpoint.xl,
   '2xl': primitives.breakpoint['2xl'],
};

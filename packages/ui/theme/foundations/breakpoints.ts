import type { ThemeOverride } from '@chakra-ui/react';
import { breakpoint as primitiveBreakpoint } from '@core-ds/primitives';

export const breakpoints: ThemeOverride['breakpoints'] = {
   sm: primitiveBreakpoint.sm,
   md: primitiveBreakpoint.md,
   lg: primitiveBreakpoint.lg,
   xl: primitiveBreakpoint.xl,
   '2xl': primitiveBreakpoint['2xl'],
};

import type { ThemeOverride } from '@chakra-ui/react';
import { breakpoint as primitiveBreakpoint } from '@core-ds/primitives';

export const sizes: ThemeOverride['sizes'] = {
   header: '68px',
   sm: primitiveBreakpoint.sm,
   md: primitiveBreakpoint.md,
   lg: primitiveBreakpoint.lg,
   xl: primitiveBreakpoint.xl,
   '2xl': primitiveBreakpoint['2xl'],
};

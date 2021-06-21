import { Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

export interface FilterSectionProps {}

export function FilterSection({
   children,
}: React.PropsWithChildren<FilterSectionProps>) {
   return <Stack spacing={2}>{children}</Stack>;
}

export interface FilterSectionTitleProps {}

export function FilterSectionTitle({
   children,
}: React.PropsWithChildren<FilterSectionTitleProps>) {
   return <Text fontWeight="semibold">{children}</Text>;
}

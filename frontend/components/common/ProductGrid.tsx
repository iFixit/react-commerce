import { ResponsiveValue, SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import React from 'react';

export type ProductGridProps = Omit<SimpleGridProps, 'columns' | '_after'> & {
   columns: Record<string, number>;
};

export function ProductGrid({ children, columns, ...other }: ProductGridProps) {
   const childrenCount = React.Children.count(children);

   const gridRow: ResponsiveValue<number> = Object.entries(columns).reduce(
      (acc, [key, value]) => {
         acc[key] = Math.ceil(childrenCount / value);
         return acc;
      },
      {} as Record<string, number>
   );

   const gridColumnStart: ResponsiveValue<number> = Object.entries(
      columns
   ).reduce((acc, [key, value]) => {
      acc[key] = (childrenCount % value) + 1;
      return acc;
   }, {} as Record<string, number>);

   const gridColumnEnd: ResponsiveValue<number> = Object.entries(
      columns
   ).reduce((acc, [key, value]) => {
      acc[key] = value + 1;
      return acc;
   }, {} as Record<string, number>);

   const display: ResponsiveValue<string> = Object.entries(columns).reduce(
      (acc, [key, value]) => {
         acc[key] = childrenCount % value === 0 ? 'none' : 'block';
         return acc;
      },
      {} as Record<string, string>
   );

   return (
      <SimpleGrid
         {...other}
         columns={columns}
         _after={{
            content: `""`,
            display,
            bg: 'white',
            gridRow,
            gridColumnStart,
            gridColumnEnd,
         }}
      >
         {children}
      </SimpleGrid>
   );
}

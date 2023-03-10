import {
   ResponsiveValue,
   SimpleGrid,
   SimpleGridProps,
   useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

export type ProductGridProps = Omit<SimpleGridProps, 'columns' | '_after'> & {
   columns: Record<string, number>;
   hideIncompleteRows?: boolean;
};

export function ProductGrid({
   children,
   columns,
   hideIncompleteRows = false,
   ...other
}: ProductGridProps) {
   const childrenCount = React.Children.count(children);

   const visibleChildrenCount = useBreakpointValue(
      Object.entries(columns).reduce((acc, [key, value]) => {
         acc[key] = Math.floor(childrenCount / value) * value;
         return acc;
      }, {} as Record<string, number>)
   );

   const visibleChildren = hideIncompleteRows
      ? React.Children.toArray(children).slice(
           0,
           visibleChildrenCount ?? childrenCount
        )
      : children;

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
         columns={columns}
         bg="gray.300"
         borderColor="gray.300"
         spacing="1px"
         _after={{
            content: `""`,
            display,
            bg: 'white',
            gridRow,
            gridColumnStart,
            gridColumnEnd,
         }}
         {...other}
      >
         {visibleChildren}
      </SimpleGrid>
   );
}

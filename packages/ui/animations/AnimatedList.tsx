import { Box, chakra } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { slideIn, slideOut } from './keyframes';
import { useAnimatedList } from './useAnimatedList';
import { useSize } from './useSize';

interface AnimatedListProps<T = any> {
   items: T[];
   renderItem: (item: T) => React.ReactNode;
   getItemId?: (item: T) => string;
   debug?: string;
}

export function AnimatedList<T = any>({
   items,
   renderItem,
   getItemId = (i: any) => i.id,
}: AnimatedListProps<T>) {
   const animated = useAnimatedList({ items, getId: getItemId });

   return (
      <Box as="ul" listStyleType="none">
         {animated.items.map((item) => {
            const itemId = getItemId(item);
            return (
               <ListItem
                  key={itemId}
                  state={
                     animated.isEntering(itemId)
                        ? 'enter'
                        : animated.isExiting(itemId)
                        ? 'exit'
                        : 'show'
                  }
                  onExitComplete={() => animated.onExitComplete(itemId)}
               >
                  {renderItem(item)}
               </ListItem>
            );
         })}
      </Box>
   );
}

interface ListItemProps {
   state: 'enter' | 'show' | 'exit';
   onExitComplete?: () => void;
   onEnterComplete?: () => void;
}

function ListItem({
   state,
   onExitComplete,
   onEnterComplete,
   children,
}: PropsWithChildren<ListItemProps>) {
   const [ref, size] = useSize();

   const height = size?.height;

   const handleAnimationEnd: React.AnimationEventHandler<HTMLLIElement> = (
      event
   ) => {
      if (event.target !== event.currentTarget) return;

      switch (state) {
         case 'enter':
            onEnterComplete?.();
            break;
         case 'exit':
            onExitComplete?.();
            break;
      }
   };

   return (
      <chakra.li
         overflow="hidden"
         position="relative"
         className={height == null ? undefined : state}
         sx={{
            '--slide-height': `${height}px`,
            '&.show': {
               height: 'var(--slide-height)',
            },
            '&.enter': {
               height: 'var(--slide-height)',
               opacity: 1,
               animation: `${slideIn} 250ms ease-in-out`,
            },
            '&.exit': {
               height: 0,
               opacity: 0,
               animation: `${slideOut} 250ms ease-in-out`,
            },
         }}
         onAnimationEnd={handleAnimationEnd}
      >
         <Box ref={ref} position="absolute" left="0" top="0" w="full">
            {children}
         </Box>
      </chakra.li>
   );
}

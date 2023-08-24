import { useMemo, useRef } from 'react';
import { usePrevious } from '../hooks';

interface UseAnimatedListProps<T = any> {
   items: T[];
   getId: (item: T) => string;
}

export function useAnimatedList<T>({ items, getId }: UseAnimatedListProps<T>) {
   const animatedItems = useAnimatedItems({ items, getId });
   const transitionItems = useTransitionItems(animatedItems);

   const allItems = useMemo(() => {
      const all = items.slice();
      for (const indexedItem of transitionItems.exiting) {
         all.splice(indexedItem.index, 0, indexedItem.item);
      }
      return all;
   }, [items, transitionItems.exiting]);

   return {
      items: allItems,
      ...transitionItems,
   };
}

function useTransitionItems<T extends { id: string }>(items: T[]) {
   const exitMapRef = useRef<Record<string, T>>({});
   const enterMapRef = useRef<Record<string, T>>({});
   const previousItems = usePrevious(items);

   if (previousItems != null && items !== previousItems) {
      const itemsIds = items.map((item) => item.id);
      const prevItemsIds = previousItems.map((item) => item.id);

      // Add exiting items
      previousItems.forEach((item) => {
         if (!itemsIds.includes(item.id)) {
            exitMapRef.current[item.id] = item;
         }
      });

      // Add entering items
      items.forEach((item) => {
         if (!prevItemsIds.includes(item.id)) {
            enterMapRef.current[item.id] = item;
         }
      });

      // Clear exiting items that are no longer exiting
      Object.keys(exitMapRef.current).forEach((id) => {
         if (itemsIds.includes(id)) {
            delete exitMapRef.current[id];
         }
      });

      // Clear entering items that are no longer entering
      Object.keys(enterMapRef.current).forEach((id) => {
         if (!itemsIds.includes(id)) {
            delete enterMapRef.current[id];
         }
      });
   }

   const onExitComplete = (id: string) => {
      delete exitMapRef.current[id];
   };

   const onEnterComplete = (id: string) => {
      delete enterMapRef.current[id];
   };

   const isExiting = (id: string) => exitMapRef.current[id] != null;
   const isEntering = (id: string) => enterMapRef.current[id] != null;

   return {
      exiting: Object.values(exitMapRef.current),
      entering: Object.values(enterMapRef.current),
      isExiting,
      isEntering,
      onExitComplete,
      onEnterComplete,
   };
}

function useAnimatedItems<T>({
   items,
   getId,
}: {
   items: T[];
   getId: (item: T) => string;
}) {
   return useMemo(() => {
      return items.map((item, index) => ({
         id: getId(item),
         item,
         index,
      }));
   }, [items]);
}

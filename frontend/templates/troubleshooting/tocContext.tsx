import {
   useEffect,
   useState,
   RefObject,
   useContext,
   createContext,
   PropsWithChildren,
   useRef,
   useCallback,
   Dispatch,
   SetStateAction,
} from 'react';

export type TOCRecord = {
   title: string;
   uniqueId: string;
   elementRef: RefObject<HTMLElement>;
   active: boolean;
   scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export type ScrollToOptions = {
   bufferPx?: number;
   addIdToUrl?: boolean;
};

export type TOCItems = Record<string, TOCRecord>;
export type MinimalTOCRecord = { title: string; uniqueId: string };
export type TOCContext = {
   addItem: (
      minimalTOCRecord: MinimalTOCRecord,
      ref: RefObject<HTMLElement>
   ) => void;
   updateItemRef: (uniqueId: string, ref: RefObject<HTMLElement>) => void;
   removeItem: (uniqueId: string) => void;
   getItems: () => TOCRecord[];
};

export const TOCContext = createContext<TOCContext | null>(null);

function scrollTo(
   ref: RefObject<HTMLElement>,
   scrollToOptions?: ScrollToOptions
) {
   const el = ref.current;
   if (!el) {
      return;
   }
   const bufferPx = scrollToOptions?.bufferPx || 0;
   window.scrollTo({ top: el.offsetTop + bufferPx, behavior: 'smooth' });

   const addIdToUrl = scrollToOptions?.addIdToUrl || true;
   const id = el.id;

   if (addIdToUrl && id) {
      window.history.pushState(null, '', `#${id}`);
   }
}

function createRecord(
   minimalTOCRecord: MinimalTOCRecord,
   ref?: RefObject<HTMLElement>
) {
   const elementRef = ref || { current: null };
   return {
      ...minimalTOCRecord,
      elementRef: elementRef,
      active: false,
      scrollTo: (scrollToOptions?: ScrollToOptions) =>
         scrollTo(elementRef, scrollToOptions),
   };
}

function createTOCItems(minimalTOCRecords: MinimalTOCRecord[]) {
   const records = minimalTOCRecords.map((minimalTOCRecord) =>
      createRecord(minimalTOCRecord, { current: null })
   );
   return Object.fromEntries(
      records.map((record) => [record.uniqueId, record])
   );
}

function updateTOCItemRef(
   existingItems: TOCItems,
   uniqueId: string,
   ref?: RefObject<HTMLElement>
) {
   const existingItem = existingItems[uniqueId];

   if (!existingItem) {
      console.error(`No item with uniqueId ${uniqueId} exists in the TOC`);
      return existingItems;
   }

   const newItems = { ...existingItems };
   const newRef = ref || existingItem.elementRef;
   newItems[uniqueId] = {
      ...existingItem,
      elementRef: newRef,
      scrollTo: (scrollToOptions?: ScrollToOptions) =>
         scrollTo(newRef, scrollToOptions),
   };
   return newItems;
}

function removeTOCItem(existingItems: TOCItems, uniqueId: string) {
   const newItems = { ...existingItems };
   delete newItems[uniqueId];
   return newItems;
}

function useCRUDFunctions(
   items: TOCItems,
   setItems: Dispatch<SetStateAction<TOCItems>>
) {
   const updateItemRef = useCallback(
      (uniqueId: string, ref: RefObject<HTMLElement>) => {
         setItems((items) => updateTOCItemRef(items, uniqueId, ref));
      },
      [setItems]
   );

   const addItem = useCallback(
      (minimalTOCRecord: MinimalTOCRecord, ref: RefObject<HTMLElement>) => {
         setItems((items) => {
            const exists = Object.keys(items).includes(
               minimalTOCRecord.uniqueId
            );

            if (exists) {
               throw new Error(
                  `UniqueId ${minimalTOCRecord.uniqueId} already exists in the TOC`
               );
            }

            const newItems = { ...items };
            newItems[minimalTOCRecord.uniqueId] = createRecord(
               minimalTOCRecord,
               ref
            );
            return newItems;
         });
      },
      [setItems]
   );

   const getItems = useCallback(() => {
      return sortVertically(Object.values(items));
   }, [items]);

   const removeItem = useCallback(
      (uniqueId: string) => {
         setItems((items) => removeTOCItem(items, uniqueId));
      },
      [setItems]
   );

   return {
      addItem,
      updateItemRef,
      getItems,
      removeItem,
   };
}

function useObserveItems(
   items: TOCItems,
   setItems: Dispatch<SetStateAction<TOCItems>>
) {
   const updateClosestItem = useCallback(() => {
      setItems((items) => {
         const closest = getClosest(items);
         const newItems = { ...items };
         Object.values(newItems).forEach((newItem) => {
            newItem.active = newItem.uniqueId === closest?.uniqueId;
         });
         return newItems;
      });
   }, [setItems]);

   // watch for elements entering / leaving the viewport and update the active element
   useEffect(() => {
      // Update active item on scroll
      const scrollHandler = () => {
         updateClosestItem();
      };

      // Update active item on resize
      const resizeHandler = () => {
         updateClosestItem();
      };

      updateClosestItem();

      window.addEventListener('scroll', scrollHandler, { passive: true });
      window.addEventListener('resize', resizeHandler, { passive: true });

      return () => {
         window.removeEventListener('scroll', scrollHandler);
         window.removeEventListener('resize', resizeHandler);
      };
   }, [updateClosestItem]);
}

export type TOCContextProviderProps = PropsWithChildren<{
   defaultItems?: MinimalTOCRecord[];
}>;

export const TOCContextProvider = ({
   children,
   defaultItems,
}: TOCContextProviderProps) => {
   const [items, setItems] = useState<TOCItems>(
      createTOCItems(defaultItems || [])
   );

   const { addItem, updateItemRef, getItems, removeItem } = useCRUDFunctions(
      items,
      setItems
   );
   useObserveItems(items, setItems);

   const context = {
      addItem,
      updateItemRef,
      removeItem,
      getItems,
   };
   return <TOCContext.Provider value={context}>{children}</TOCContext.Provider>;
};

export const useTOCContext = () => {
   const context = useContext(TOCContext);
   if (!context) {
      throw new Error('useTOCContext must be used within a TOCContext');
   }
   return context;
};

export function AddToTOCClientSide<T extends HTMLElement>(
   minimalTOCRecord: MinimalTOCRecord
) {
   const { addItem, removeItem } = useTOCContext();
   const ref = useRef<T>(null);

   useEffect(() => {
      if (!minimalTOCRecord.title || !minimalTOCRecord.uniqueId) {
         return;
      }
      addItem(minimalTOCRecord, ref);

      return () => {
         if (!minimalTOCRecord.title || !minimalTOCRecord.uniqueId) {
            return;
         }
         removeItem(minimalTOCRecord.uniqueId);
      };
   }, [minimalTOCRecord, ref, addItem, removeItem]);
   return { ref };
}

export function LinkToTOC<T extends HTMLElement>(uniqueId?: string) {
   const { updateItemRef, removeItem } = useTOCContext();
   const ref = useRef<T>(null);

   useEffect(() => {
      if (!uniqueId) {
         return;
      }
      updateItemRef(uniqueId, ref);

      return () => {
         if (!uniqueId) {
            return;
         }
         removeItem(uniqueId);
      };
   }, [uniqueId, ref, updateItemRef, removeItem]);
   return { ref };
}

function sortVertically(records: TOCRecord[]): TOCRecord[] {
   return records.sort((a, b) => {
      const aTop = a.elementRef.current?.offsetTop || 0;
      const bTop = b.elementRef.current?.offsetTop || 0;
      return aTop - bTop;
   });
}

function getClosest(items: TOCItems) {
   const visibleItems = Object.values(items).filter((record) => {
      const el = record.elementRef.current;
      if (!el) {
         return false;
      }

      const elTopScrollPastTopOfViewport =
         el.offsetTop <= window.scrollY;

      const isVisible = !elTopScrollPastTopOfViewport;

      return isVisible;
   });
   const verticallySortedItems = sortVertically(visibleItems);

   const closest = verticallySortedItems.length > 0 ? verticallySortedItems[0] : null;

   return closest || null;
}

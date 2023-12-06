import { SentryError } from '@ifixit/sentry';
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
   MouseEventHandler,
} from 'react';

export type TOCRecord = {
   title: string;
   uniqueId: string;
   elementRef: RefObject<HTMLElement>;
   active: boolean;
   scrollToBufferPx?: number;
   scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export type ScrollToOptions = {
   bufferPx?: number;
   addIdToUrl?: boolean;
};

export type TOCItems<T extends TOCRecord> = Record<string, T>;
export type MinimalTOCRecord<T> = {
   title: string;
   uniqueId: string;
} & T;
export type TOCContext<T> = {
   addItem: (
      minimalTOCRecord: MinimalTOCRecord<T>,
      ref: RefObject<HTMLElement>
   ) => void;
   updateItemRef: (
      uniqueId: string,
      ref: RefObject<HTMLElement>,
      scrollToBufferPx?: number
   ) => void;
   removeItem: (uniqueId: string) => void;
   getItems: () => (TOCRecord & T)[];
   getItem: (uniqueId: string) => (TOCRecord & T) | undefined;
};

const TOCContext = createContext(null as TOCContext<any> | null);

function scrollTo(
   ref: RefObject<HTMLElement>,
   scrollToBufferPx?: number,
   scrollToOptions?: ScrollToOptions
) {
   const el = ref.current;
   if (!el) {
      return;
   }
   const bufferPx = scrollToBufferPx || 0;
   window.scrollTo({ top: el.offsetTop + bufferPx, behavior: 'smooth' });

   const addIdToUrl = scrollToOptions?.addIdToUrl || true;
   const id = el.id;

   if (addIdToUrl && id) {
      window.history.pushState(null, '', `#${id}`);
   }
}

function createRecord<T>(
   minimalTOCRecord: MinimalTOCRecord<T>,
   ref?: RefObject<HTMLElement>
) {
   const elementRef = ref || { current: null };
   return {
      ...minimalTOCRecord,
      elementRef: elementRef,
      active: false,
      scrollTo: (scrollToOptions?: ScrollToOptions) =>
         scrollTo(elementRef, 0, scrollToOptions),
   };
}

function createTOCItems<T>(minimalTOCRecords: MinimalTOCRecord<T>[]) {
   const records = minimalTOCRecords.map((minimalTOCRecord) =>
      createRecord(minimalTOCRecord, { current: null })
   ) as (TOCRecord & T)[];
   return Object.fromEntries(
      records.map((record) => [record.uniqueId, record])
   );
}

function updateTOCItemRef<T extends TOCRecord>(
   existingItems: TOCItems<T>,
   uniqueId: string,
   ref?: RefObject<HTMLElement>,
   scrollToBufferPx?: number
) {
   const existingItem = existingItems[uniqueId];

   if (!existingItem) {
      console.error(
         `No item with uniqueId ${uniqueId} exists in the TOC`,
         existingItems
      );
      return existingItems;
   }

   const newItems = { ...existingItems };
   const newRef = ref || existingItem.elementRef;
   newItems[uniqueId] = {
      ...existingItem,
      elementRef: newRef,
      scrollToBufferPx,
      scrollTo: (scrollToOptions?: ScrollToOptions) =>
         scrollTo(newRef, scrollToBufferPx, scrollToOptions),
   };
   return newItems;
}

function removeTOCItem<T extends TOCRecord>(
   existingItems: TOCItems<T>,
   uniqueId: string
) {
   const newItems = { ...existingItems };
   delete newItems[uniqueId];
   return newItems;
}

function useCRUDFunctions<T>(
   items: TOCItems<T & TOCRecord>,
   setItems: Dispatch<SetStateAction<TOCItems<T & TOCRecord>>>
) {
   const updateItemRef = useCallback(
      (
         uniqueId: string,
         ref: RefObject<HTMLElement>,
         scrollToBufferPx?: number
      ) => {
         setItems((items) =>
            updateTOCItemRef(items, uniqueId, ref, scrollToBufferPx)
         );
      },
      [setItems]
   );

   const addItem = useCallback(
      (minimalTOCRecord: MinimalTOCRecord<T>, ref: RefObject<HTMLElement>) => {
         setItems((items) => {
            const exists = Object.keys(items).includes(
               minimalTOCRecord.uniqueId
            );

            if (exists) {
               throw new SentryError(
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

   const getItem = useCallback(
      (uniqueId: string) => {
         return items[uniqueId];
      },
      [items]
   );

   return {
      addItem,
      updateItemRef,
      getItems,
      removeItem,
      getItem,
   };
}

function useObserveItems<T extends TOCRecord>(
   items: TOCItems<T>,
   setItems: Dispatch<SetStateAction<TOCItems<T>>>
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

export type TOCContextProviderProps<T> = PropsWithChildren<{
   defaultItems?: MinimalTOCRecord<T>[];
}>;

export function TOCContextProvider<T>({
   children,
   defaultItems,
}: TOCContextProviderProps<T>) {
   const [items, setItems] = useState<TOCItems<T & TOCRecord>>(
      createTOCItems(defaultItems || [])
   );

   const { addItem, updateItemRef, getItems, removeItem, getItem } =
      useCRUDFunctions(items, setItems);
   useObserveItems(items, setItems);

   const context = {
      addItem,
      updateItemRef,
      removeItem,
      getItems,
      getItem,
   };
   return <TOCContext.Provider value={context}>{children}</TOCContext.Provider>;
}

export function useTOCContext<T>() {
   const context = useContext(TOCContext) as TOCContext<T>;
   if (!context) {
      throw new SentryError('useTOCContext must be used within a TOCContext');
   }
   return context;
}

export function AddToTOCClientSide<T extends HTMLElement, U>(
   minimalTOCRecord: MinimalTOCRecord<U>
) {
   const { addItem, removeItem } = useTOCContext<U>();
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

export function LinkToTOC<T extends HTMLElement>(
   uniqueId?: string,
   scrollToBufferPx?: number
) {
   const { updateItemRef, removeItem, addItem } = useTOCContext();
   const ref = useRef<T>(null);

   useEffect(() => {
      if (!uniqueId) {
         return;
      }

      updateItemRef(uniqueId, ref, scrollToBufferPx);
   }, [uniqueId, ref, addItem, updateItemRef, removeItem, scrollToBufferPx]);
   return { ref };
}

export function useTOCBufferPxScrollOnClick(id: string) {
   const { getItem } = useTOCContext();
   const onClick = useCallback<MouseEventHandler>(
      (event) => {
         const item = getItem(id);
         if (!item) {
            return;
         }

         event.preventDefault();
         item.scrollTo();
      },
      [id, getItem]
   );

   return {
      onClick,
   };
}

function sortVertically<T extends TOCRecord>(records: T[]): T[] {
   return records.sort((a, b) => {
      const aTop = a.elementRef.current?.offsetTop || 0;
      const bTop = b.elementRef.current?.offsetTop || 0;
      return aTop - bTop;
   });
}

function getClosest<T extends TOCRecord>(items: TOCItems<T>) {
   const visibleItems = Object.values(items).filter((record) => {
      const el = record.elementRef.current;
      if (!el) {
         return false;
      }
      const buffer = 0.1;

      const elTopIsScrolledPast = el.offsetTop <= window.scrollY;
      const elBottom = el.offsetTop + el.offsetHeight;
      const viewportHeight = window.innerHeight;
      const isElBiggerThanViewport = el.offsetHeight > viewportHeight;
      const TenPercentOfViewportHeight = viewportHeight * buffer;
      const elBottomIsAboveViewportBottomWithBuffer =
         elBottom + TenPercentOfViewportHeight <=
         window.scrollY + viewportHeight;

      if (
         elTopIsScrolledPast &&
         isElBiggerThanViewport &&
         !elBottomIsAboveViewportBottomWithBuffer
      ) {
         return true;
      }

      const isVisible = !elTopIsScrolledPast;

      return isVisible;
   });
   const verticallySortedItems = sortVertically(visibleItems);

   const closest =
      verticallySortedItems.length > 0 ? verticallySortedItems[0] : null;

   return closest || null;
}

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
   elementRef: RefObject<HTMLElement>;
   active: boolean;
   scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export type ScrollToOptions = {
   bufferPx?: number;
   addIdToUrl?: boolean;
};

export type TOCItems = Record<string, TOCRecord>;

export type TOCContext = {
   addItem: (title: string, ref: RefObject<HTMLElement>) => void;
   updateItemRef: (title: string, ref: RefObject<HTMLElement>) => void;
   removeItem: (title: string) => void;
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

   const scrollHeight = document.body.scrollHeight;
   const scrollTop =
      (el.offsetTop / scrollHeight) * (scrollHeight - window.innerHeight);

   const bufferPx = scrollToOptions?.bufferPx || 0;
   const scrollTo = scrollTop + bufferPx;

   window.scrollTo({ top: scrollTo, behavior: 'smooth' });

   const addIdToUrl = scrollToOptions?.addIdToUrl || true;
   const id = el.id;

   if (addIdToUrl && id) {
      window.history.pushState(null, '', `#${id}`);
   }
}

function createRecord(title: string, ref?: RefObject<HTMLElement>) {
   const elementRef = ref || { current: null };
   return {
      title,
      elementRef: elementRef,
      active: false,
      scrollTo: (scrollToOptions?: ScrollToOptions) =>
         scrollTo(elementRef, scrollToOptions),
   };
}

function createTOCItems(titles: string[]) {
   const records = titles.map((title) =>
      createRecord(title, { current: null })
   );
   return Object.fromEntries(records.map((record) => [record.title, record]));
}

function updateTOCItemRef(
   existingItems: TOCItems,
   title: string,
   ref?: RefObject<HTMLElement>
) {
   const existingItem = existingItems[title];

   if (!existingItem) {
      console.error(`No item with title ${title} exists in the TOC`);
      return existingItems;
   }

   const newItems = { ...existingItems };
   const newRef = ref || existingItem.elementRef;
   newItems[title] = {
      ...existingItem,
      elementRef: newRef,
      scrollTo: (scrollToOptions?: ScrollToOptions) =>
         scrollTo(newRef, scrollToOptions),
   };
   return newItems;
}

function removeTOCItem(existingItems: TOCItems, title: string) {
   const newItems = { ...existingItems };
   delete newItems[title];
   return newItems;
}

function useCRUDFunctions(
   items: TOCItems,
   setItems: Dispatch<SetStateAction<TOCItems>>
) {
   const updateItemRef = useCallback(
      (title: string, ref: RefObject<HTMLElement>) => {
         setItems((items) => updateTOCItemRef(items, title, ref));
      },
      [setItems]
   );

   const addItem = useCallback(
      (title: string, ref: RefObject<HTMLElement>) => {
         setItems((items) => {
            const titleExists = Object.keys(items).includes(title);

            if (titleExists) {
               throw new Error(`Title ${title} already exists in the TOC`);
            }

            const newItems = { ...items };
            newItems[title] = createRecord(title, ref);
            return newItems;
         });
      },
      [setItems]
   );

   const getItems = useCallback(() => {
      return sortVertically(Object.values(items));
   }, [items]);

   const removeItem = useCallback(
      (title: string) => {
         setItems((items) => removeTOCItem(items, title));
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
   const updateClosetItem = useCallback(() => {
      setItems((items) => {
         const closest = getClosest(items);
         const newItems = { ...items };
         Object.values(newItems).forEach((newItem) => {
            newItem.active = newItem.title === closest?.title;
         });
         return newItems;
      });
   }, [setItems]);

   // watch for elements entering / leaving the viewport and update the active element
   useEffect(() => {
      // Update active item on scroll
      const scrollHandler = () => {
         updateClosetItem();
      };

      // Update active item on resize
      const resizeHandler = () => {
         updateClosetItem();
      };
      window.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);

      return () => {
         window.removeEventListener('scroll', scrollHandler);
         window.removeEventListener('resize', resizeHandler);
      };
   }, [updateClosetItem]);

   // Update the active element on nextjs hydration
   useEffect(() => {
      const observer = new MutationObserver(() => {
         updateClosetItem();
      });

      observer.observe(document.body, {
         childList: true,
         subtree: true,
      });

      return () => {
         observer.disconnect();
      };
   }, [updateClosetItem]);
}

export const TOCContextProvider = ({
   children,
   defaultTitles,
}: PropsWithChildren<{
   defaultTitles?: string[];
}>) => {
   const [items, setItems] = useState<TOCItems>(
      createTOCItems(defaultTitles || [])
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

export function AddToTOCClientSide<T extends HTMLElement>(title?: string) {
   const { addItem, removeItem } = useTOCContext();
   const ref = useRef<T>(null);

   useEffect(() => {
      if (!title) {
         return;
      }
      addItem(title, ref);

      return () => {
         if (!title) {
            return;
         }
         removeItem(title);
      };
   }, [title, ref, addItem, removeItem]);
   return { ref };
}

export function LinkToTOC<T extends HTMLElement>(title?: string) {
   const { updateItemRef, removeItem } = useTOCContext();
   const ref = useRef<T>(null);

   useEffect(() => {
      if (!title) {
         return;
      }
      updateItemRef(title, ref);

      return () => {
         if (!title) {
            return;
         }
         removeItem(title);
      };
   }, [title, ref, updateItemRef, removeItem]);
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

      const elBottomScrollPastTopOfViewport =
         el.offsetTop + el.clientHeight <= window.scrollY;

      const isVisible = !elBottomScrollPastTopOfViewport;

      return isVisible;
   });
   const verticallySortedItems = sortVertically(visibleItems);

   const scrollHeight = document.body.scrollHeight;
   const scrollPercent = window.scrollY / (scrollHeight - window.innerHeight);

   const closest = verticallySortedItems.reverse().find((record) => {
      const itemTop = record.elementRef.current?.offsetTop || 0;

      const itemPercent = itemTop / scrollHeight;
      const hasPassed = scrollPercent >= itemPercent;
      return hasPassed;
   });

   return closest || null;
}

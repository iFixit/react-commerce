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
   visible: boolean;
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
      visible: false,
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
      return sortVertically(items);
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
   const observeItems = useCallback(
      (observer: IntersectionObserver) => {
         Object.values(items).forEach((item) => {
            if (item.elementRef.current) {
               observer.observe(item.elementRef.current);
            }
         });

         return () => {
            Object.values(items).forEach((item) => {
               if (item.elementRef.current) {
                  observer.unobserve(item.elementRef.current);
               }
            });
         };
      },
      [items]
   );

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

   const setVisible = useCallback(
      (title: string, visible: boolean) => {
         setItems((items) => {
            items[title].visible = visible;
            return items;
         });
      },
      [setItems]
   );

   const getTitleFromEl = useCallback(
      (el: HTMLElement) => {
         const title = Object.keys(items).find(
            (key) => items[key].elementRef.current === el
         );

         return title;
      },
      [items]
   );

   // watch for elements entering / leaving the viewport and update the active element
   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               const title = getTitleFromEl(entry.target as HTMLElement);

               if (!title) {
                  return;
               }

               setVisible(title, entry.isIntersecting);
            });
         },
         { threshold: 0 }
      );

      const cleanup = observeItems(observer);

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
         observer.disconnect();
         cleanup();
         window.removeEventListener('scroll', scrollHandler);
         window.removeEventListener('resize', resizeHandler);
      };
   }, [setVisible, getTitleFromEl, observeItems, updateClosetItem]);

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

function sortVertically(items: TOCItems): TOCRecord[] {
   const itemsArr = Object.values(items);
   return itemsArr.sort((a, b) => {
      const aTop = a.elementRef.current?.offsetTop || 0;
      const bTop = b.elementRef.current?.offsetTop || 0;
      return aTop - bTop;
   });
}

function getClosest(items: TOCItems) {
   const verticallySortedItems = sortVertically(items);

   const visibleItems = verticallySortedItems.filter((item) => item.visible);

   const scrollHeight = document.body.scrollHeight;
   const scrollPercent = window.scrollY / (scrollHeight - window.innerHeight);

   const closest = visibleItems.reverse().find((visibleItem) => {
      const itemTop = visibleItem.elementRef.current?.offsetTop || 0;

      const itemPercent = itemTop / scrollHeight;
      const hasPassed = scrollPercent >= itemPercent;
      return hasPassed;
   });

   return closest || null;
}

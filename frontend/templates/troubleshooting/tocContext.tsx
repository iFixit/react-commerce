import {
   useEffect,
   useState,
   RefObject,
   useContext,
   createContext,
   PropsWithChildren,
   useRef,
   useCallback,
} from 'react';

export type TOCRecord = {
   title: string;
   elementRef: RefObject<HTMLElement>;
   visible: boolean;
   active: boolean;
};

export type TOCItems = Record<string, TOCRecord>;

export type TOCContext = {
   pushItem: (title: string, ref: RefObject<HTMLElement>) => void;
   removeItem: (title: string) => void;
   getItems: () => TOCRecord[];
};

export const TOCContext = createContext<TOCContext | null>(null);

export const TOCContextProvider = ({ children }: PropsWithChildren) => {
   const [items, setItems] = useState<TOCItems>({});

   const pushItem = useCallback(
      (title: string, ref: RefObject<HTMLElement>) => {
         setItems((items) => {
            return {
               ...items,
               [title]: {
                  title,
                  elementRef: ref,
                  visible: false,
                  active: false,
               },
            };
         });
      },
      [setItems]
   );
   const getItems = useCallback(() => {
      return sortVertically(items);
   }, [items]);

   const removeItem = useCallback(
      (title: string) => {
         setItems((items) => {
            const newItems = { ...items };
            delete newItems[title];
            return newItems;
         });
      },
      [setItems]
   );

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
   }, []);

   const setVisible = useCallback((title: string, visible: boolean) => {
      setItems((items) => {
         items[title].visible = visible;
         return items;
      });
   }, []);

   const getTitleFromEl = useCallback(
      (el: HTMLElement) => {
         const title = Object.keys(items).find(
            (key) => items[key].elementRef.current === el
         );

         return title;
      },
      [items]
   );

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

   const context = {
      pushItem,
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

export function AddToTOC<T extends HTMLElement>(title?: string) {
   const { pushItem, removeItem } = useTOCContext();
   const ref = useRef<T>(null);

   useEffect(() => {
      if (!title) {
         return;
      }
      pushItem(title, ref);

      return () => {
         if (!title) {
            return;
         }
         removeItem(title);
      };
   }, [title, ref, pushItem, removeItem]);
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

   // @ts-ignore because findLast is not in the types?
   const closest = visibleItems.findLast((visibleItem) => {
      const itemTop = visibleItem.elementRef.current?.offsetTop || 0;

      const itemPercent = itemTop / scrollHeight;
      const hasPassed = scrollPercent >= itemPercent;
      return hasPassed;
   });

   return closest || null;
}

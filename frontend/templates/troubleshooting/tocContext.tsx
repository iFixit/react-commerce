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

type TOCRecord = {
   title: string;
   ref: RefObject<HTMLElement>;
   visible: boolean;
};

export type TOCItem = {
   title: string;
   ref: RefObject<HTMLElement>;
   active: boolean;
};

export type TOCItems = Record<string, TOCRecord>;

export type TOCContext = {
   pushItem: (title: string, ref: RefObject<HTMLElement>) => void;
   removeItem: (title: string) => void;
   getItems: () => TOCItem[];
};

export const TOCContext = createContext<TOCContext | null>(null);

export const TOCContextProvider = ({ children }: PropsWithChildren) => {
   const [items, setItems] = useState<TOCItems>({});
   const [closetItem, setClosestItem] = useState<TOCRecord | null>(null);

   const pushItem = useCallback(
      (title: string, ref: RefObject<HTMLElement>) => {
         setItems((items) => {
            return {
               ...items,
               [title]: {
                  title,
                  ref,
                  visible: false,
               },
            };
         });
      },
      [setItems]
   );
   const getItems = useCallback(() => {
      const sortedItems = sortVertically(items);
      return sortedItems.map((item) => {
         return {
            title: item.title,
            ref: item.ref,
            active: item.title === closetItem?.title,
         };
      });
   }, [items, closetItem]);

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
            if (item.ref.current) {
               observer.observe(item.ref.current);
            }
         });

         return () => {
            Object.values(items).forEach((item) => {
               if (item.ref.current) {
                  observer.unobserve(item.ref.current);
               }
            });
         };
      },
      [items]
   );

   const updateClosestItem = useCallback(() => {
      const verticallySortedItems = sortVertically(items).filter(
         (item) => item.visible
      );

      const scrollPercent =
         window.scrollY / (document.body.scrollHeight - window.innerHeight);

      const closestItem = verticallySortedItems.find((item, index) => {
         const nextItem = verticallySortedItems[index + 1];
         if (!nextItem) {
            return item;
         }

         const itemTop = item.ref.current?.offsetTop || 0;
         const nextItemTop = nextItem.ref.current?.offsetTop || 0;

         const scrollHeight = document.body.scrollHeight;

         const itemPercent = itemTop / scrollHeight;
         const nextItemPercent = nextItemTop / scrollHeight;

         return (
            scrollPercent >= itemPercent && scrollPercent <= nextItemPercent
         );
      });

      if (!closestItem) {
         return;
      }

      setClosestItem(closestItem);
   }, [items]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               const target = entry.target as HTMLElement;
               const title = Object.keys(items).find(
                  (key) => items[key].ref.current === target
               );

               if (!title) {
                  return;
               }
               setItems((prevItems) => ({
                  ...prevItems,
                  [title]: {
                     ...prevItems[title],
                     visible: entry.isIntersecting,
                  },
               }));
            });
         },
         { threshold: 0 }
      );

      const cleanup = observeItems(observer);

      // Update active item on scroll
      const scrollHandler = () => {
         updateClosestItem();
      };

      // Update active item on resize
      const resizeHandler = () => {
         updateClosestItem();
      };
      window.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);

      return () => {
         observer.disconnect();
         cleanup();
         window.removeEventListener('scroll', scrollHandler);
         window.removeEventListener('resize', resizeHandler);
      };
   }, [items, observeItems, updateClosestItem]);

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
      const aTop = a.ref.current?.offsetTop || 0;
      const bTop = b.ref.current?.offsetTop || 0;
      return aTop - bTop;
   });
}

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

export type TOCItem = {
   title: string;
   ref: RefObject<HTMLElement>;
   visible: boolean;
};

export type TOCItems = Record<string, TOCItem>;
type PushItem = (title: string, ref: RefObject<HTMLElement>) => void;
type GetItems = () => TOCItem[];

export type TOCContext = {
   pushItem: PushItem;
   removeItem: (title: string) => void;
   getItems: GetItems;
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
                  ref,
                  visible: false,
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

      return () => {
         observer.disconnect();
         cleanup();
      };
   }, [items, observeItems]);

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

function sortVertically(items: TOCItems): TOCItem[] {
   const itemsArr = Object.values(items);
   return itemsArr.sort((a, b) => {
      const aTop = a.ref.current?.offsetTop || 0;
      const bTop = b.ref.current?.offsetTop || 0;
      return aTop - bTop;
   });
}

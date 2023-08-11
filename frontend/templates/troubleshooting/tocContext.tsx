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

export type TOCItems = Record<string, RefObject<HTMLElement>>;
type PushItem = (title: string, ref: RefObject<HTMLElement>) => void;
type GetItems = () => TOCItems;

export type TOCContext = {
   pushItem: PushItem;
   removeItem: (title: string) => void;
   getItems: GetItems;
   activeEl: HTMLElement | null;
};

export const TOCContext = createContext<TOCContext | null>(null);

export const TOCContextProvider = ({ children }: PropsWithChildren) => {
   const [items, setItems] = useState<TOCItems>({});

   const pushItem = useCallback(
      (title: string, ref: RefObject<HTMLElement>) => {
         setItems((items) => {
            items[title] = ref;
            return items;
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

   const [activeEl, setActiveEl] = useState<HTMLElement | null>(null);

   useEffect(() => {
      const updateActiveEl = () => {
         const validEls = Object.values(items)
            .map((ref) => ref?.current)
            .filter((ref) => ref !== null) as HTMLElement[];

         const activeEl = findActiveEl(validEls);

         if (!activeEl) {
            return;
         }
         setActiveEl(() => activeEl);
      };

      updateActiveEl();

      window.addEventListener('scroll', updateActiveEl);
      window.addEventListener('resize', updateActiveEl);
      return () => {
         window.removeEventListener('scroll', updateActiveEl);
         window.removeEventListener('resize', updateActiveEl);
      };
   }, [items]);

   const context = {
      pushItem,
      removeItem,
      getItems,
      activeEl,
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

function sortVertically(items: TOCItems): TOCItems {
   const itemsArr = Object.entries(items);
   const itemsAsObjs = itemsArr.map(([title, ref]) => ({
      title,
      ref,
      el: ref.current,
   }));
   const sortedItemObjs = itemsAsObjs.sort((a, b) => {
      const aTop = a.el?.offsetTop || 0;
      const bTop = b.el?.offsetTop || 0;
      return aTop - bTop;
   });

   const sortedItems = sortedItemObjs.reduce((acc, { title, ref }) => {
      acc[title] = ref;
      return acc;
   }, {} as TOCItems);

   return sortedItems;
}

function findActiveEl(els: HTMLElement[]) {
   const sortedEls = els
      .map((el) => {
         const elTop = el.offsetTop;
         const elBottom = elTop + el.offsetHeight;
         const viewTop = window.scrollY;
         const viewBottom = viewTop + window.innerHeight;
         const elHeight = elBottom - elTop;
         const overlap =
            Math.min(elBottom, viewBottom) - Math.max(elTop, viewTop);
         const overlapPercent = overlap / elHeight;
         return {
            el,
            overlapPercent,
            elHeight,
         };
      })
      .sort((a, b) => {
         const overlap = b.overlapPercent - a.overlapPercent;
         if (overlap !== 0) {
            return overlap;
         }
         return b.elHeight - a.elHeight;
      });

   return sortedEls[0]?.el;
}

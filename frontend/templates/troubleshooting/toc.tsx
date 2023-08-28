import {
   Button,
   Flex,
   FlexProps,
   List,
   ListItem,
   ListItemProps,
   ListProps,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
   useDisclosure,
   useToken,
} from '@chakra-ui/react';
import {
   TOCContextProvider,
   TOCContext,
   TOCContextProviderProps,
   TOCRecord,
   useTOCContext,
} from './tocContext';
import {
   CssTokenOption,
   ScrollPercent,
   ScrollPercentProps,
   useScrollPercentHeight,
} from './scrollPercent';
import { FlexScrollGradient } from '@components/common/FlexScrollGradient';
import {
   PropsWithChildren,
   RefObject,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';
import { FaIcon } from '@ifixit/icons';
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons';
import { flags } from '@config/flags';

export function TOC({
   listItemProps,
   ...props
}: FlexProps & { listItemProps?: ListItemProps }) {
   const { getItems } = useTOCContext();
   const items = getItems();
   return (
      <Flex
         alignSelf="flex-start"
         height={{ lg: '100vh' }}
         position="sticky"
         top={0}
         width="auto"
         flexGrow={{ base: 1, lg: 0 }}
         zIndex={{ base: 'docked', lg: 'initial' }}
         {...props}
      >
         <LargeTOC
            items={items}
            listItemProps={listItemProps}
            display={{ base: 'none', lg: 'flex' }}
         />
         <MobileTOC
            listItemProps={listItemProps}
            flexGrow={1}
            position="fixed"
            top={0}
            left={0}
            width="100%"
            display={{ base: 'flex', lg: 'none' }}
         />
      </Flex>
   );
}

function LargeTOC({
   items,
   listItemProps,
   ...props
}: FlexProps & { listItemProps?: ListItemProps; items: TOCRecord[] }) {
   return (
      <FlexScrollGradient
         nestedFlexProps={
            {
               as: List,
               flexDirection: 'column',
               spacing: 1,
               paddingX: 3,
               paddingTop: 6,
            } as FlexProps & ListProps
         }
         {...props}
      >
         <TOCItems tocItems={items} listItemProps={listItemProps} />
      </FlexScrollGradient>
   );
}

export function MobileTOC({
   listItemProps,
   display,
   ...props
}: FlexProps & { listItemProps?: ListItemProps }) {
   const { getItems } = useTOCContext();
   const items = getItems();
   const activeItem = items.find((item) => item.active);
   const scrollIndicatorHeightCSS = useScrollPercentHeight(
      CssTokenOption.CssString
   );
   const actualDisplay = activeItem ? display : 'none';
   const { isOpen, onOpen, onClose } = useDisclosure();

   useEffect(() => {
      if (actualDisplay === 'none') {
         onClose();
      }
   }, [actualDisplay, onClose]);

   const title = activeItem?.title ?? 'Table of Contents';

   return (
      <Flex {...props} display={actualDisplay}>
         <Menu
            matchWidth={true}
            strategy="fixed"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            autoSelect={false}
         >
            <MenuButton
               as={Button}
               flexGrow={1}
               marginTop={scrollIndicatorHeightCSS}
               rightIcon={<FaIcon icon={faAngleDown} />}
               color="gray.900"
               fontWeight={510}
               fontSize="sm"
               borderBottom="1px solid"
               borderColor="gray.300"
               background="white"
               borderRadius={0}
               paddingX={4}
               _active={{ background: 'white' }}
            >
               {title}
            </MenuButton>
            <MenuList
               width="calc(100% - (2 * var(--chakra-space-8)))"
               marginX={8}
               paddingY={0}
               borderRadius={4}
               boxShadow="md"
            >
               <FlexScrollGradient
                  nestedFlexProps={
                     {
                        flexDirection: 'column',
                        flexGrow: 1,
                        maxHeight: 48,
                        paddingY: 1.5,
                     } as FlexProps & ListProps
                  }
               >
                  <MobileTOCItems items={items} />
               </FlexScrollGradient>
            </MenuList>
         </Menu>
      </Flex>
   );
}

function MobileTOCItems({ items }: { items: TOCRecord[] }) {
   return (
      <>
         {items.map((item, index) => {
            return <MobileTOCItem {...item} key={index} />;
         })}
      </>
   );
}

function MobileTOCItem({ title, scrollTo, elementRef, active }: TOCRecord) {
   const ref = useRef<HTMLButtonElement>(null);

   const scrollIndicatorHeight = useScrollPercentHeight(CssTokenOption.Number);
   const blue100 = useToken('colors', 'blue.100');

   useScrollToActiveEffect(ref, active);
   const onClick = () => {
      const el = elementRef.current;

      if (!el) {
         return;
      }

      scrollTo({
         bufferPx: scrollIndicatorHeight,
      });

      highlightEl(el, blue100);
   };

   return (
      <MenuItem
         flexShrink={1}
         flexGrow={1}
         onClick={onClick}
         color={active ? 'blue.600' : 'gray.500'}
         background={active ? 'blue.100' : undefined}
         _hover={{
            background: 'blue.100',
            color: active ? undefined : 'gray.800',
         }}
         paddingX={4}
         paddingY={1.5}
         ref={ref}
         fontSize="sm"
         fontWeight={510}
      >
         {title}
      </MenuItem>
   );
}

function TOCItems({
   tocItems,
   listItemProps,
}: {
   tocItems: TOCRecord[];
   listItemProps?: ListItemProps;
}) {
   const items = tocItems.map((props, index) => {
      return <TOCItem key={index} {...props} {...listItemProps} />;
   });

   return <>{items}</>;
}

function useScrollToActiveEffect(ref: RefObject<HTMLElement>, active: boolean) {
   useEffect(() => {
      const el = ref.current;
      if (!el) {
         return;
      }

      if (!active) {
         return;
      }

      el.parentElement?.scrollTo({
         top: el.offsetTop - el.parentElement.clientHeight / 2,
      });
   }, [ref, active]);
}

function TOCItem({
   title,
   elementRef,
   active,
   uniqueId,
   scrollTo,
   ...props
}: TOCRecord & ListItemProps) {
   const scrollIndicatorHeight = useScrollPercentHeight(CssTokenOption.Number);

   const ref = useRef<HTMLLIElement>(null);

   const blue100 = useToken('colors', 'blue.100');

   const onClick = () => {
      const el = elementRef.current;
      if (!el) {
         return;
      }

      scrollTo({
         bufferPx: scrollIndicatorHeight,
      });

      highlightEl(el, blue100);
   };

   useScrollToActiveEffect(ref, active);

   return (
      <ListItem
         paddingY={1}
         paddingX={3}
         color={active ? 'brand.600' : 'gray.500'}
         background={active ? 'blue.100' : undefined}
         borderTopRightRadius={active ? 'md' : undefined}
         borderBottomRightRadius={active ? 'md' : undefined}
         ref={ref}
         _hover={{
            color: active ? undefined : 'gray.800',
         }}
         cursor="pointer"
         {...props}
      >
         <Text fontWeight={510} fontSize="sm" onClick={onClick}>
            {title}
         </Text>
      </ListItem>
   );
}

function highlightEl(el: HTMLElement, color: string) {
   const originalBackgroundColor = el.style.backgroundColor;
   const originalTransition = el.style.transition;

   el.style.transition = 'background-color .5s ease-in-out';
   el.style.backgroundColor = color;

   setTimeout(() => {
      el.style.backgroundColor = originalBackgroundColor;
   }, 500);
   setTimeout(() => {
      el.style.transition = originalTransition;
   }, 1000);
}

export function TOCBasedScrollPercent({
   scrollContainerRef,
}: ScrollPercentProps) {
   const [hidden, setHidden] = useState(true);
   const { getItems } = useTOCContext();
   const items = getItems();
   const lastItem = items[items.length - 1];

   const onChange = useCallback(
      (scrollPercent: number, container: HTMLElement) => {
         const atContainer = container.offsetTop < window.scrollY;
         if (!atContainer) {
            setHidden(true);
            return;
         }

         const lastItemEl = lastItem.elementRef.current;
         const scrolledPastLastItem =
            lastItemEl && window.scrollY >= lastItemEl.offsetTop;

         if (!lastItem.active && scrolledPastLastItem) {
            setHidden(true);
            return;
         }

         setHidden(false);
      },
      [lastItem]
   );

   return (
      <ScrollPercent
         scrollContainerRef={scrollContainerRef}
         onChange={onChange}
         hidden={hidden}
      />
   );
}

export function onlyShowIfTOCFlagEnabled<P>(
   Component: React.ComponentType<PropsWithChildren<P>>
) {
   return (props: PropsWithChildren<P>) => {
      if (!flags.TROUBLESHOOTING_TOC_ENABLED) {
         return <>{props.children}</>;
      }

      return <Component {...props} />;
   };
}

export function onlyShowIfTOCFlagEnabledProvider(
   ExistingContext: typeof TOCContextProvider
) {
   return (props: TOCContextProviderProps) => {
      if (!flags.TROUBLESHOOTING_TOC_ENABLED) {
         const context = {
            addItem: () => {},
            updateItemRef: () => {},
            removeItem: () => {},
            getItems: () => [],
         };
         return (
            <TOCContext.Provider value={context}>
               {props.children}
            </TOCContext.Provider>
         );
      }

      return <ExistingContext {...props} />;
   };
}

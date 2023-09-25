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
   useBreakpointValue,
   useDisclosure,
   useToken,
} from '@chakra-ui/react';
import { TOCRecord, useTOCContext } from './tocContext';
import { FlexScrollGradient } from '@components/common/FlexScrollGradient';
import { RefObject, useEffect, useRef, useState } from 'react';
import { FaIcon } from '@ifixit/icons';
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons';
import { debounce } from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export function TOC({
   listItemProps,
   contentRef,
   ...props
}: FlexProps & {
   listItemProps?: ListItemProps;
   contentRef: RefObject<HTMLElement>;
}) {
   const { getItems } = useTOCContext();
   const items = getItems();

   useScrollToOnloadEffect();

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
            contentRef={contentRef}
            listItemProps={listItemProps}
            flexGrow={1}
            position="fixed"
            top={0}
            left={0}
            width="100%"
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
         gradientPX={96}
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
   contentRef,
   ...props
}: FlexProps & {
   listItemProps?: ListItemProps;
   contentRef: RefObject<HTMLElement>;
}) {
   const { getItems } = useTOCContext();
   const items = getItems();
   const wantsMobile = useBreakpointValue({ base: true, lg: false });
   const activeItem = items.find((item) => item.active);

   const [showMobileTOC, setShowMobileTOC] = useState(false);

   useEffect(() => {
      if (!contentRef.current) {
         return;
      }

      if (!wantsMobile) {
         setShowMobileTOC(false);
         return;
      }

      const onScroll = () => {
         const scrolledIntoContent =
            (contentRef.current?.offsetTop || 0) <= window.scrollY;

         setShowMobileTOC(scrolledIntoContent);
      };

      onScroll();

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
   }, [contentRef, wantsMobile]);

   const isVisible = wantsMobile && showMobileTOC && activeItem;

   return (
      <AnimatePresence>
         {isVisible && (
            <Flex
               {...props}
               as={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
               <MobileTOCMenu activeItem={activeItem} items={items} />
            </Flex>
         )}
      </AnimatePresence>
   );
}

function useScrollToOnloadEffect() {
   const { getItem } = useTOCContext();

   const [ranEffect, setRanEffect] = useState(false);

   const { asPath } = useRouter();
   const id = asPath.split('#')[1];
   const record = getItem(id);
   const el = record?.elementRef.current;
   const scrollTo = record?.scrollTo;

   useEffect(() => {
      if (ranEffect) {
         return;
      }

      if (!el || !scrollTo) {
         return;
      }

      scrollTo();
      setRanEffect(true);
   }, [el, scrollTo, ranEffect]);
}

function MobileTOCMenu({
   activeItem,
   items,
}: {
   activeItem: TOCRecord;
   items: TOCRecord[];
}) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const title = activeItem?.title ?? 'Table of Contents';

   return (
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
               gradientPX={45}
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

function MobileTOCItem({
   title,
   scrollTo,
   scrollToBufferPx: _scrollToBufferPx,
   elementRef,
   active,
}: TOCRecord) {
   const ref = useRef<HTMLButtonElement>(null);

   const blue100 = useToken('colors', 'blue.100');

   useScrollToActiveEffect(ref, active);
   const onClick = () => {
      const el = elementRef.current;

      if (!el) {
         return;
      }

      scrollTo();

      debouncedHighlightEl(el, blue100);
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
   scrollToBufferPx: _scrollToBufferPx,
   scrollTo,
   ...props
}: TOCRecord & ListItemProps) {
   const ref = useRef<HTMLLIElement>(null);

   const blue100 = useToken('colors', 'blue.100');

   const onClick = () => {
      const el = elementRef.current;
      if (!el) {
         return;
      }

      scrollTo();

      debouncedHighlightEl(el, blue100);
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

const debouncedHighlightEl = debounce(highlightEl, 1000, {
   leading: true,
   trailing: false,
   maxWait: 0,
});

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

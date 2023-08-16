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
   useToken,
} from '@chakra-ui/react';
import { TOCRecord, useTOCContext } from './tocContext';
import { CssTokenOption, useScrollPercentHeight } from './scrollPercent';
import { FlexScrollGradient } from '@components/common/FlexScrollGradient';
import { RefObject, useEffect, useRef } from 'react';
import { FaIcon } from '@ifixit/icons';
import { faAngleDown } from '@fortawesome/pro-solid-svg-icons';

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
         width={{ base: '100%', lg: 'auto' }}
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
            zIndex={999}
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
               spacing: 2,
               paddingRight: 3,
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

   return (
      <Flex {...props} display={actualDisplay}>
         <Menu matchWidth={true} strategy="fixed">
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
               paddingLeft={4}
               paddingRight={4}
               _active={{ background: 'white' }}
            >
               {activeItem?.title}
            </MenuButton>
            <MenuList
               width="calc(100% - (2 * var(--chakra-space-8)))"
               marginLeft={8}
               marginRight={8}
               boxShadow="md"
               borderRadius={4}
               maxHeight="calc(100% - 56px - (2 * var(--chakra-space-8)))"
               paddingTop={1.5}
               paddingBottom={1.5}
               sx={{
                  minWidth: 'initial',
               }}
               overflowY="auto"
               rootProps={{
                  height: '100%',
                  style: {
                     minWidth: 'initial',
                  },
               }}
            >
               <MobileTOCItems items={items} />
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

function MobileTOCItem({ title, scrollTo }: TOCRecord) {
   const scrollIndicatorHeight = useScrollPercentHeight(CssTokenOption.Number);
   const blue100 = useToken('colors', 'blue.100');

   const onClick = () => {
      scrollTo({
         bufferPx: scrollIndicatorHeight,
         highlightColor: blue100,
      });
   };

   return (
      <MenuItem
         flexShrink={1}
         flexGrow={1}
         onClick={onClick}
         color="gray.500"
         _hover={{
            background: 'blue.100',
            color: 'brand.600',
         }}
         paddingLeft={4}
         paddingRight={4}
         paddingTop={1.5}
         paddingBottom={1.5}
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

function useScrollToActiveEffect(
   ref: RefObject<HTMLLIElement>,
   active: boolean
) {
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
         highlightColor: blue100,
      });
   };

   useScrollToActiveEffect(ref, active);

   return (
      <ListItem
         paddingTop={1}
         paddingBottom={1}
         paddingLeft={3}
         paddingRight={3}
         color={active ? 'brand.600' : 'gray.500'}
         background={active ? 'blue.100' : undefined}
         borderTopRightRadius={active ? 1 : undefined}
         borderBottomRightRadius={active ? 1 : undefined}
         ref={ref}
         cursor="pointer"
         {...props}
      >
         <Text
            fontWeight={active ? 510 : 'normal'}
            fontSize="sm"
            onClick={onClick}
         >
            {title}
         </Text>
      </ListItem>
   );
}

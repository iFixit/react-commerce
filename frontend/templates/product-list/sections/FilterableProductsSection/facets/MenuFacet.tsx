import {
   Box,
   forwardRef,
   HStack,
   Text,
   TextProps,
   useBoolean,
   VStack,
} from '@chakra-ui/react';
import { invariant } from '@helpers/application-helpers';
import NextLink from 'next/link';
import React, { MouseEventHandler } from 'react';
import { ShowMoreButton } from './ShowMoreButton';
import type { MenuFacetState } from './useMenuFacet';

type MenuItem = MenuFacetState['items'][0];

export type MenuFacetProps = {
   items: MenuItem[];
   limit: number;
   onItemClick?: (value: string) => void;
   canToggleShowMore?: boolean;
   isShowingMore?: boolean;
   onShowMore?: () => void;
   createItemURL?: (item: MenuItem) => string;
   navigateOnClick?: boolean;
};

export function MenuFacet(props: MenuFacetProps) {
   const { isShowingMore, canToggleShowMore, onShowMore } = useShowMore(props);

   const firstItems = React.useMemo(() => {
      return props.items.slice(0, props.limit);
   }, [props.items, props.limit]);

   const additionalItems = React.useMemo(() => {
      return props.items.slice(props.limit);
   }, [props.items, props.limit]);

   return (
      <Box>
         <VStack align="stretch" spacing="1" role="listbox">
            {firstItems.map((item) => (
               <MenuListItem
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  count={item.count}
                  isRefined={item.isRefined}
                  url={props.createItemURL?.(item)}
                  onClick={props.onItemClick}
                  navigateOnClick={props.navigateOnClick}
               />
            ))}
            <Box h={isShowingMore ? undefined : 0} overflow="hidden">
               {additionalItems.map((item) => (
                  <MenuListItem
                     key={item.label}
                     label={item.label}
                     value={item.value}
                     count={item.count}
                     isRefined={item.isRefined}
                     url={props.createItemURL?.(item)}
                     onClick={props.onItemClick}
                     navigateOnClick={props.navigateOnClick}
                  />
               ))}
            </Box>
         </VStack>
         {canToggleShowMore && (
            <ShowMoreButton
               isShowingMore={isShowingMore}
               onClick={onShowMore}
            />
         )}
      </Box>
   );
}

type UseShowMoreProps = {
   items: MenuItem[];
   limit: number;
   canToggleShowMore?: boolean;
   isShowingMore?: boolean;
   onShowMore?: () => void;
};

function useShowMore(props: UseShowMoreProps) {
   const [isShowingAll, { toggle }] = useBoolean(false);
   const isControlled = props.isShowingMore !== undefined;
   const canToggleShowMore = isControlled
      ? props.canToggleShowMore ?? false
      : props.limit < props.items.length;
   const isShowingMore = props.isShowingMore ?? isShowingAll;
   const onShowMore = isControlled ? props.onShowMore : toggle;

   invariant(onShowMore, 'FacetMenu is controlled but onShowMore is undefined');

   return { isShowingMore, onShowMore, canToggleShowMore };
}

type MenuListItemProps = {
   value: string;
   label: string;
   isRefined: boolean;
   count: number;
   url?: string;
   onClick?: (value: string) => void;
   navigateOnClick?: boolean;
};

function MenuListItem({
   value,
   label,
   isRefined,
   count,
   url,
   onClick,
   navigateOnClick,
}: MenuListItemProps) {
   const handleClick = React.useCallback<MouseEventHandler>(
      (event) => {
         if (!navigateOnClick) {
            event.preventDefault();
            onClick?.(value);
         }
      },
      [navigateOnClick, onClick, value]
   );

   return (
      <HStack
         justify="space-between"
         color={isRefined ? 'brand.500' : 'inherit'}
         fontWeight={isRefined ? 'bold' : 'inherit'}
      >
         {url ? (
            <NextLink href={url} passHref>
               <MenuItemLabel as="a" value={value} onClick={handleClick}>
                  {label}
               </MenuItemLabel>
            </NextLink>
         ) : (
            <MenuItemLabel as="button" value={value} onClick={handleClick}>
               {label}
            </MenuItemLabel>
         )}
         <Text size="sm" fontFamily="sans-serif" color={'gray.500'}>
            {count}
         </Text>
      </HStack>
   );
}

type MenuItemLabelProps = TextProps & {
   value: string;
};

const MenuItemLabel = forwardRef<MenuItemLabelProps, 'p'>(
   ({ value, ...textProps }, ref) => {
      return (
         <Text
            ref={ref}
            role="option"
            data-value={value}
            _hover={{
               textDecoration: 'underline',
            }}
            align="left"
            {...textProps}
         />
      );
   }
);

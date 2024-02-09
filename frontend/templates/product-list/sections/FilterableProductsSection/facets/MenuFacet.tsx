import {
   Box,
   forwardRef,
   HStack,
   Text,
   TextProps,
   useBoolean,
   VStack,
} from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { invariant } from '@helpers/application-helpers';
import { FacetOption } from 'app/_data/product-list/concerns/facets';
import React, { MouseEventHandler } from 'react';
import { ShowMoreButton } from './ShowMoreButton';

export type MenuFacetProps = {
   attribute: string;
   items: FacetOption[];
   limit: number;
   // onItemClick?: (value: string) => void;
   // canToggleShowMore?: boolean;
   // isShowingMore?: boolean;
   // onShowMore?: () => void;
   // createItemURL?: (item: MenuItem) => string;
};

export function MenuFacet(props: MenuFacetProps) {
   const { isShowingMore, canToggleShowMore, onShowMore } = useShowMore(props);
   const formattedFacetName = formatFacetName(props.attribute);

   const firstItems = React.useMemo(() => {
      return props.items.slice(0, props.limit);
   }, [props.items, props.limit]);

   const additionalItems = React.useMemo(() => {
      return props.items.slice(props.limit);
   }, [props.items, props.limit]);

   return (
      <Box>
         <VStack
            align="stretch"
            spacing="2"
            role="listbox"
            aria-label={`${formattedFacetName} options`}
         >
            {firstItems.map((item) => (
               <MenuListItem
                  key={item.value}
                  label={item.value}
                  value={item.value}
                  count={item.count}
                  isRefined={item.selected}
                  // url={props.createItemURL?.(item)}
                  // onClick={props.onItemClick}
               />
            ))}
            {additionalItems.length > 0 && (
               <VStack
                  align="stretch"
                  spacing="2"
                  overflow="hidden"
                  h={isShowingMore ? undefined : 0}
               >
                  {additionalItems.map((item) => (
                     <MenuListItem
                        key={item.value}
                        label={item.value}
                        value={item.value}
                        count={item.count}
                        isRefined={item.selected}
                        // url={props.createItemURL?.(item)}
                        // onClick={props.onItemClick}
                     />
                  ))}
               </VStack>
            )}
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
   items: FacetOption[];
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
};

function MenuListItem({
   value,
   label,
   isRefined,
   count,
   url,
   onClick,
}: MenuListItemProps) {
   const handleClick = React.useCallback<MouseEventHandler>(
      (event) => {
         event.preventDefault();
         onClick?.(value);
      },
      [onClick, value]
   );

   return (
      <HStack
         justify="space-between"
         color={isRefined ? 'brand.500' : 'inherit'}
         fontWeight={isRefined ? 'semibold' : 'inherit'}
      >
         {url ? (
            <MenuItemLabel
               as="a"
               href={url}
               value={value}
               onClick={handleClick}
            >
               {label}
            </MenuItemLabel>
         ) : (
            <MenuItemLabel
               as="button"
               value={value}
               onClick={handleClick}
               fontWeight={isRefined ? 'semibold' : 'inherit'}
            >
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

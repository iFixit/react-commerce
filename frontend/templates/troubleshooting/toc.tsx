import {
   List,
   ListItem,
   ListItemProps,
   ListProps,
   Text,
} from '@chakra-ui/react';
import { TOCRecord, useTOCContext } from './tocContext';
import { CssTokenOption, useScrollPercentHeight } from './scrollPercent';

export function TOC({
   listItemProps,
   ...props
}: ListProps & { listItemProps?: ListItemProps }) {
   const { getItems } = useTOCContext();
   const items = getItems();
   // mobile view at 1024px breakpoint (lg == desktop)

   return (
      <List
         alignSelf="flex-start"
         height="auto"
         position="sticky"
         top={0}
         spacing={2}
         paddingRight={3}
         {...props}
      >
         <TOCItems tocItems={items} listItemProps={listItemProps} />
      </List>
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

function TOCItem({
   title,
   elementRef,
   active,
   scrollTo,
   ...props
}: TOCRecord & ListItemProps) {
   const scrollIndicatorHeight = useScrollPercentHeight(CssTokenOption.Number);

   const onClick = () => {
      const el = elementRef.current;
      if (!el) {
         return;
      }

      scrollTo({
         bufferPx: scrollIndicatorHeight,
      });
   };
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

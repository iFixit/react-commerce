import { List, ListItem, ListProps, Text } from '@chakra-ui/react';
import { TOCRecord, useTOCContext } from './tocContext';
import { CssTokenOption, useScrollPercentHeight } from './scrollPercent';

export function TOC(props: ListProps) {
   const { getItems } = useTOCContext();
   const items = getItems();

   return (
      <List
         {...props}
         alignSelf="flex-start"
         height="auto"
         position="sticky"
         top={0}
         spacing={1.5}
      >
         <TOCItems tocItems={items} />
      </List>
   );
}

function TOCItems({ tocItems }: { tocItems: TOCRecord[] }) {
   const items = tocItems.map((props, index) => {
      return <TOCItem key={index} {...props} />;
   });

   return <>{items}</>;
}

function TOCItem({ title, elementRef, active, scrollTo }: TOCRecord) {
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
      <ListItem>
         <Text
            color={active ? 'blue.500' : 'gray.500'}
            fontWeight={active ? 'semibold' : 'normal'}
            onClick={onClick}
         >
            {title}
         </Text>
      </ListItem>
   );
}

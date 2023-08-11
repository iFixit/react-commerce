import { List, ListItem, ListProps, Text } from '@chakra-ui/react';
import { TOCRecord, useTOCContext } from './tocContext';

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

function TOCItem({ title, elementRef, active }: TOCRecord) {
   const onClick = () => {
      elementRef.current?.scrollIntoView({
         behavior: 'smooth',
         block: 'nearest',
      });
   };
   return (
      <ListItem>
         <Text color={active ? 'blue.500' : 'gray.500'} onClick={onClick}>
            {title}
         </Text>
      </ListItem>
   );
}

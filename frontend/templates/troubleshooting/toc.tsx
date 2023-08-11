import { Flex, Text } from '@chakra-ui/react';
import { TOCItems, useTOCContext } from './tocContext';

export function TOC() {
   const tocContext = useTOCContext();
   const items = tocContext.getItems();
   const activeEl = tocContext.activeEl;

   return (
      <Flex position="fixed" bottom={0}>
         <TOCItems tocItems={items} activeEl={activeEl} />
      </Flex>
   );
}

function TOCItems({
   tocItems,
   activeEl,
}: {
   tocItems: TOCItems;
   activeEl: HTMLElement | null;
}) {
   const tocProps = Object.keys(tocItems).map((title) => {
      const ref = tocItems[title];
      const el = ref.current;

      return {
         title: title,
         active: ref.current === activeEl,
         referencedEl: el,
      };
   });

   const items = tocProps.map((props, index) => {
      return <TOCItem key={index} {...props} />;
   });

   return <>{items}</>;
}

function TOCItem({
   title,
   active,
   referencedEl,
}: {
   title: string;
   active: boolean;
   referencedEl: HTMLElement | null;
}) {
   const onClick = () => {
      referencedEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
   };

   return (
      <Text color={active ? 'blue.500' : 'gray.500'} onClick={onClick}>
         {title}
      </Text>
   );
}

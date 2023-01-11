import {
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import * as React from 'react';

type FacetAccordionItemProps = React.PropsWithChildren<{
   attribute: string;
   refinedCount: number;
   refinementIndicator?: 'count' | 'dot';
   isExpanded: boolean;
   isHidden: boolean;
   isDisabled: boolean;
}>;

export function FacetAccordionItem({
   attribute,
   refinedCount,
   refinementIndicator = 'count',
   isExpanded,
   isHidden,
   isDisabled,
   children,
}: FacetAccordionItemProps) {
   const formattedFacetName = formatFacetName(attribute);
   const accordionItemRef = React.useRef<HTMLDivElement>(null);

   React.useEffect(() => {
      if (isExpanded) {
         setTimeout(
            () =>
               accordionItemRef.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
               }),
            // We have to wait for the transition to complete
            200
         );
      }
   }, [isExpanded]);

   return (
      <AccordionItem
         hidden={isHidden}
         isDisabled={isDisabled}
         data-testid={`${
            isExpanded ? 'expanded' : 'collapsed'
         }-facet-accordion-item-${attribute}`}
         data-facet-name={attribute}
         className={isHidden ? 'hidden' : 'visible'}
         ref={accordionItemRef}
      >
         <AccordionButton
            aria-label={
               isExpanded
                  ? `Collapse ${formattedFacetName}`
                  : `Expand ${formattedFacetName}`
            }
         >
            <Box flex="1" textAlign="left" fontWeight="bold">
               {formattedFacetName}
            </Box>
            <HStack>
               {refinementIndicator === 'dot' && refinedCount > 0 && (
                  <Box w="2" h="2" borderRadius="full" bg="brand.500"></Box>
               )}
               {refinementIndicator === 'count' && refinedCount > 0 && (
                  <Text
                     rounded="full"
                     bg="gray.600"
                     color="white"
                     px="1.5"
                     fontSize="xs"
                  >
                     {refinedCount}
                  </Text>
               )}
               <AccordionIcon />
            </HStack>
         </AccordionButton>
         <AccordionPanel pb={4} display={isDisabled ? 'none' : 'block'}>
            <VStack align="stretch" spacing="3">
               {children}
            </VStack>
         </AccordionPanel>
      </AccordionItem>
   );
}

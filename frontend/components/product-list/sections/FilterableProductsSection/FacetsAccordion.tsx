import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionItemProps,
   AccordionPanel,
   Box,
   forwardRef,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { formatFacetName } from '@helpers/algolia-helpers';
import { WikiInfoEntry } from '@models/product-list/types';
import * as React from 'react';
import { useHits, useRefinementList } from 'react-instantsearch-hooks-web';
import { RangeInput } from './RangeInput';
import { RefinementList } from './RefinementList';
import { useCountRefinements } from './useCountRefinements';
import { useFilteredFacets } from './useFacets';

type FacetsAccordianProps = {
   wikiInfo: WikiInfoEntry[];
};

export function FacetsAccordion(props: FacetsAccordianProps) {
   const { wikiInfo } = props;
   const facets = useFilteredFacets(wikiInfo);
   const countRefinements = useCountRefinements();

   return (
      <Accordion allowMultiple data-testid="facets-accordion">
         {facets.map((facet, index) => {
            const isFirst = index === 0;
            const isLast = index === facets.length - 1;
            const facetAttributes = [facet];
            if (facet === 'price_range') {
               facetAttributes.push('facet_tags.Price');
            }
            const refinedCount = countRefinements(facetAttributes);
            return (
               <FacetAccordionItem
                  key={facet}
                  attribute={facet}
                  refinedCount={refinedCount}
                  borderTop={isFirst ? 'none' : undefined}
                  borderBottom={isLast ? 'none' : undefined}
               />
            );
         })}
      </Accordion>
   );
}

type FacetAccordionItemProps = AccordionItemProps & {
   attribute: string;
   refinedCount: number;
};

export const FacetAccordionItem = forwardRef<FacetAccordionItemProps, 'div'>(
   ({ attribute, refinedCount, ...props }, ref) => {
      const { items } = useRefinementList({ attribute });
      const { hits } = useHits();
      const isProductListEmpty = hits.length === 0;
      const hasApplicableRefinements = items.length > 0;
      const isDisabled = isProductListEmpty || !hasApplicableRefinements;

      const formattedFacetName = formatFacetName(attribute);

      if (!hasApplicableRefinements && !isProductListEmpty) {
         return null;
      }

      return (
         <AccordionItem
            ref={ref}
            {...props}
            isDisabled={isDisabled}
            data-testid={`facet-accordion-item-${attribute}`}
            data-facet-name={attribute}
         >
            {({ isExpanded }) => (
               <>
                  <AccordionButton
                     aria-label={
                        isExpanded
                           ? `Collapse ${formattedFacetName}`
                           : `Expand ${formattedFacetName}`
                     }
                  >
                     <Box flex="1" textAlign="left">
                        {formattedFacetName}
                     </Box>
                     <HStack>
                        {refinedCount > 0 && (
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
                  <AccordionPanel
                     pb={4}
                     display={isDisabled ? 'none' : 'block'}
                  >
                     <VStack align="stretch" spacing="3">
                        {attribute === 'price_range' && (
                           <RangeInput attribute="facet_tags.Price" />
                        )}
                        <RefinementList
                           attribute={attribute}
                           showMore
                           showMoreLimit={200}
                        />
                     </VStack>
                  </AccordionPanel>
               </>
            )}
         </AccordionItem>
      );
   }
);

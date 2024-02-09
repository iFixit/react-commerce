import { Accordion } from '@chakra-ui/react';
import { ProductList } from '@models/product-list';
import { Facet } from 'app/_data/product-list/concerns/facets';
import * as React from 'react';
import { useFilteredFacets } from '../useFacets';
import { FacetRefinementListAccordionItem } from './FacetRefinementListAccordionItem';
import { FacetMenuAccordionItem } from './FacetMenuAccordionItem';

type FacetsAccordianProps = {
   productList: ProductList;
};

const initialExpandedFacets = [
   'facet_tags.Item Type',
   'facet_tags.Tool Category',
];

export function FacetsAccordion({ productList }: FacetsAccordianProps) {
   const facets = useFilteredFacets(productList);
   const [indexes, setIndexes] = React.useState<number[]>(() => {
      return initialExpandedFacets
         .map((expandedFacet) =>
            facets.findIndex((facet) => facet.name === expandedFacet)
         )
         .filter((index) => index >= 0);
   });

   const handleChangeIndexes = React.useCallback((indexes: number[]) => {
      setIndexes(indexes);
   }, []);

   return (
      <Accordion
         allowMultiple
         index={indexes}
         onChange={handleChangeIndexes}
         data-testid="facets-accordion"
         sx={{
            '> :not(style)': {
               borderColor: 'gray.300',
            },
            '> .visible': {
               borderTopWidth: '0px',
            },
            '> .visible ~ .visible': {
               borderTopWidth: '1px',
            },
            '>:last-child': {
               borderBottom: 'none',
            },
         }}
      >
         {facets.map((facet, facetIndex) => {
            const facetAttributes = [facet.name];
            if (facet.name === 'price_range') {
               facetAttributes.push('facet_tags.Price');
            }
            return (
               <AccordionItem
                  key={facet.name}
                  facet={facet}
                  productList={productList}
                  isExpanded={indexes.includes(facetIndex)}
               />
            );
         })}
      </Accordion>
   );
}

type AccordionItemProps = {
   productList: ProductList;
   facet: Facet;
   isExpanded: boolean;
};

export const AccordionItem = ({
   productList,
   facet,
   isExpanded,
}: AccordionItemProps) => {
   if (facet.multiple) {
      return (
         <FacetRefinementListAccordionItem
            productList={productList}
            facet={facet}
            isExpanded={isExpanded}
         />
      );
   }
   return (
      <FacetMenuAccordionItem
         productList={productList}
         facet={facet}
         isExpanded={isExpanded}
      />
   );
};

import { Accordion } from '@chakra-ui/react';
import { getFacetWidgetType } from '@helpers/product-list-helpers';
import { assertNever } from '@ifixit/helpers';
import { FacetWidgetType, ProductList } from '@models/product-list';
import * as React from 'react';
import { useCountRefinements } from '../useCountRefinements';
import { useFilteredFacets } from '../useFacets';
import { FacetMenuAccordionItem } from './FacetMenuAccordionItem';
import { FacetRefinementListAccordionItem } from './FacetRefinementListAccordionItem';

type FacetsAccordianProps = {
   productList: ProductList;
};

const initialExpandedFacets = [
   'facet_tags.Item Type',
   'facet_tags.Tool Category',
];

export function FacetsAccordion({ productList }: FacetsAccordianProps) {
   const facets = useFilteredFacets(productList);
   const countRefinements = useCountRefinements();
   const [indexes, setIndexes] = React.useState<number[]>(() => {
      return initialExpandedFacets
         .map((expandedFacet) =>
            facets.findIndex((facet) => facet === expandedFacet)
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
            const facetAttributes = [facet];
            if (facet === 'price_range') {
               facetAttributes.push('facet_tags.Price');
            }
            const refinedCount = countRefinements(facetAttributes);
            return (
               <AccordionItem
                  key={facet}
                  attribute={facet}
                  refinedCount={refinedCount}
                  productList={productList}
                  isExpanded={indexes.includes(facetIndex)}
               />
            );
         })}
      </Accordion>
   );
}

type AccordionItemProps = {
   attribute: string;
   refinedCount: number;
   productList: ProductList;
   isExpanded: boolean;
};

export const AccordionItem = ({
   attribute,
   refinedCount,
   productList,
   isExpanded,
}: AccordionItemProps) => {
   const widgetType = getFacetWidgetType(attribute);

   switch (widgetType) {
      case FacetWidgetType.Menu: {
         return (
            <FacetMenuAccordionItem
               attribute={attribute}
               isExpanded={isExpanded}
               productList={productList}
               refinedCount={refinedCount}
            />
         );
      }
      case FacetWidgetType.RefinementList: {
         return (
            <FacetRefinementListAccordionItem
               attribute={attribute}
               isExpanded={isExpanded}
               productList={productList}
               refinedCount={refinedCount}
            />
         );
      }
      default:
         return assertNever(widgetType);
   }
};

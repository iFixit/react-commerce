import {
   Button,
   chakra,
   Collapse,
   Icon,
   SystemStyleObject,
   Tag,
   TagCloseButtonProps,
   TagLabel,
   TagProps,
   useBreakpointValue,
   useStyles,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import { assertNever } from '@helpers/application-helpers';
import {
   FilterType,
   RangeFilter,
   useClearFilter,
   useFacet,
   useFacetFilter,
   useFilters,
} from '@lib/algolia';
import * as React from 'react';
import { HiX } from 'react-icons/hi';

interface AppliedFiltersProps {
   className?: string;
}

export const AppliedFilters = chakra(({ className }: AppliedFiltersProps) => {
   const filters = useFilters();
   const clear = useClearFilter();
   const clearAllFilters = React.useCallback(() => {
      clear();
   }, [clear]);
   const buttonSize = useBreakpointValue({ base: 'lg', md: 'sm' });

   return (
      <Collapse in={filters.length > 0} animateOpacity unmountOnExit>
         <Wrap
            className={className}
            w="full"
            align="center"
            data-testid="applied-filters"
         >
            {filters.map((filter) => {
               switch (filter.type) {
                  case FilterType.List: {
                     return (
                        <ListTags key={filter.id} facetHandle={filter.id} />
                     );
                  }
                  case FilterType.Range: {
                     return <RangeTag key={filter.id} filter={filter} />;
                  }
                  default:
                     return assertNever(filter);
               }
            })}
            <WrapItem aria-labelledby="applied-filters-clear-all">
               <Button
                  id="applied-filters-clear-all"
                  variant="link"
                  size={buttonSize}
                  colorScheme="brand"
                  onClick={clearAllFilters}
                  aria-label="Clear all filters"
               >
                  Clear All
               </Button>
            </WrapItem>
         </Wrap>
      </Collapse>
   );
});

interface ListTagsProps {
   facetHandle: string;
}

function ListTags({ facetHandle }: ListTagsProps) {
   const filter = useFacetFilter(facetHandle);
   const facet = useFacet(facetHandle);
   return (
      <>
         {filter.selectedOptions.map((optionId) => {
            const label = `${facet.name}: ${facet.options.byId[optionId].value}`;
            return (
               <WrapItem key={optionId}>
                  <FilterTag
                     name={label}
                     onClear={() => filter.clear(optionId)}
                  >
                     {label}
                  </FilterTag>
               </WrapItem>
            );
         })}
      </>
   );
}

interface RangeTagProps {
   filter: RangeFilter;
}

function RangeTag({ filter }: RangeTagProps) {
   const facet = useFacet(filter.id);
   const clear = useClearFilter();

   let label: string;
   if (filter.min == null) {
      label = `${facet.name} <= ${filter.max}`;
   } else if (filter.max == null) {
      label = `${facet.name} >= ${filter.min}`;
   } else {
      label = `${facet.name}: ${filter.min} - ${filter.max}`;
   }
   return (
      <WrapItem key={filter.id}>
         <FilterTag name={label} onClear={() => clear(filter.id)}>
            {label}
         </FilterTag>
      </WrapItem>
   );
}

type FilterTagProps = TagProps & {
   name: string;
   onClear(): void;
};

const FilterTag = ({
   children,
   onClear,
   name,
   ...otherProps
}: FilterTagProps) => {
   const tagSize = useBreakpointValue({ base: 'lg', md: 'md' });
   return (
      <Tag size={tagSize} variant="outline" colorScheme="brand" {...otherProps}>
         <TagLabel maxW="260px">{children}</TagLabel>
         {/* 
            Replacing TagCloseButton with a custom one to improve aria-label, 
            since TagCloseButton doesn't allow to customize it 
         */}
         <TagRemoveButton aria-label={`Remove ${name}`} onClick={onClear} />
      </Tag>
   );
};

const TagRemoveButton: React.FC<TagCloseButtonProps> = (props) => {
   const { isDisabled, children, ...rest } = props;

   const styles = useStyles();

   const btnStyles: SystemStyleObject = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: '0',
      ...styles.closeButton,
   };

   return (
      <chakra.button
         type="button"
         disabled={isDisabled}
         __css={btnStyles}
         {...rest}
      >
         {children || <Icon as={HiX} verticalAlign="inherit" />}
      </chakra.button>
   );
};

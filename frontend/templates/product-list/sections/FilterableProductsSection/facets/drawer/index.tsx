import {
   Box,
   Button,
   CloseButton,
   Divider,
   Fade,
   Flex,
   HStack,
   IconButton,
   Portal,
   Text,
   useBreakpointValue,
   useSafeLayoutEffect,
} from '@chakra-ui/react';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { formatFacetName } from '@helpers/algolia-helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductList } from '@models/product-list';
import * as React from 'react';
import {
   useClearRefinements,
   useCurrentRefinements,
} from 'react-instantsearch';
import { useCountRefinements } from '../useCountRefinements';
import { useFilteredFacets } from '../useFacets';
import { FacetListItem } from './FacetListItem';
import { FacetPanel } from './FacetPanel';

type FacetsDrawerProps = {
   isOpen: boolean;
   onClose: () => void;
   productList: ProductList;
};

export function FacetsDrawer({
   isOpen,
   onClose,
   productList,
}: FacetsDrawerProps) {
   const facets = useFilteredFacets(productList);
   const [currentFacet, setCurrentFacet] = React.useState<string | null>(null);
   const countRefinements = useCountRefinements();

   useLockBodyScroll(isOpen);

   return (
      <Portal>
         <Fade in={isOpen} unmountOnExit>
            <Box
               position="fixed"
               bg="blackAlpha.600"
               top="0"
               w="100vw"
               h="100vh"
               zIndex="modal"
            />
         </Fade>
         <Flex
            position="fixed"
            top="0"
            bottom="0"
            w="100vw"
            zIndex="100000"
            transition="all 300ms"
            transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
         >
            <Flex
               bg="white"
               h="full"
               w={{ base: 'full', sm: '96' }}
               position="relative"
               direction="column"
            >
               <Flex align="center" justify="flex-end" p="2.5">
                  <Flex order={2} flexGrow={1} overflow="hidden">
                     <Text
                        width="full"
                        flexShrink={0}
                        fontWeight="semibold"
                        textAlign="center"
                        transition="all 0.2s ease-in-out"
                        transform={
                           currentFacet == null
                              ? 'translateX(0)'
                              : 'translateX(-100%)'
                        }
                     >
                        Filters
                     </Text>
                     <Text
                        w="full"
                        flexShrink={0}
                        fontWeight="semibold"
                        flexGrow={1}
                        textAlign="center"
                        transition="all 0.2s ease-in-out"
                        transform={
                           currentFacet == null
                              ? 'translateX(0)'
                              : 'translateX(-100%)'
                        }
                     >
                        {formatFacetName(currentFacet ?? '')}
                     </Text>
                  </Flex>
                  <Fade in={currentFacet != null}>
                     <IconButton
                        order={1}
                        aria-label="go back"
                        variant="ghost"
                        icon={
                           <FaIcon icon={faArrowLeft} h="4" color="gray.600" />
                        }
                        onClick={() => setCurrentFacet(null)}
                     />
                  </Fade>
                  <CloseButton order={3} onClick={onClose} boxSize="10" />
               </Flex>
               <Divider borderColor="gray.300" opacity="1" />
               <Box flexGrow={1} overflow="hidden" position="relative">
                  <Box height="100%" overflowY="scroll">
                     {facets.map((facet) => {
                        const refinedCount = countRefinements([facet]);
                        return (
                           <FacetListItem
                              key={facet}
                              attribute={facet}
                              onSelect={setCurrentFacet}
                              refinedCount={refinedCount}
                              productList={productList}
                           />
                        );
                     })}
                  </Box>
                  {facets.map((facet) => {
                     return (
                        <FacetPanel
                           key={facet}
                           attribute={facet}
                           isOpen={facet === currentFacet}
                           productList={productList}
                           onClose={() => setCurrentFacet(null)}
                        />
                     );
                  })}
               </Box>
               <Box>
                  <Divider borderColor="gray.300" opacity="1" />
                  <HStack p="2">
                     {facets.map((facet) => {
                        return (
                           <ClearFacetButton
                              key={facet}
                              attribute={facet}
                              isVisible={facet === currentFacet}
                           />
                        );
                     })}
                     <ClearAllButton isVisible={currentFacet == null} />
                     <Button
                        flex={1}
                        colorScheme="blue"
                        onClick={() => {
                           if (currentFacet == null) {
                              onClose();
                           } else {
                              setCurrentFacet(null);
                           }
                        }}
                     >
                        Apply
                     </Button>
                  </HStack>
               </Box>
            </Flex>
            <Box flexGrow={1} h="100vh" onClick={onClose} />
         </Flex>
      </Portal>
   );
}

type ClearFacetButtonProps = {
   attribute: string;
   isVisible: boolean;
};

function ClearFacetButton({ attribute, isVisible }: ClearFacetButtonProps) {
   const { items } = useCurrentRefinements({ includedAttributes: [attribute] });
   const { refine } = useClearRefinements({
      includedAttributes: [attribute],
   });
   const refinedCount = items.reduce(
      (sum, item) => sum + item.refinements.length,
      0
   );
   if (!isVisible) {
      return null;
   }
   return (
      <Button
         w="50%"
         variant="outline"
         fontWeight="normal"
         isDisabled={refinedCount === 0}
         onClick={() => refine()}
      >
         {refinedCount > 1
            ? `Clear ${refinedCount} filters`
            : refinedCount === 1
            ? `Clear ${refinedCount} filter`
            : 'Clear'}
      </Button>
   );
}

type ClearAllButtonProps = {
   isVisible: boolean;
};

function ClearAllButton({ isVisible }: ClearAllButtonProps) {
   const { refine } = useClearRefinements();
   if (!isVisible) {
      return null;
   }
   return (
      <Button flex={1} variant="outline" onClick={() => refine()}>
         Clear all
      </Button>
   );
}

function useLockBodyScroll(lock: boolean) {
   const responsiveDisplayValue =
      useBreakpointValue({
         base: 'none',
         sm: 'block',
      }) || 'block';
   useSafeLayoutEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const nextContainer = document.getElementById('__next');
      if (lock) {
         document.body.style.overflow = 'hidden';
         nextContainer!.style.display = responsiveDisplayValue;
      }
      return () => {
         nextContainer!.style.display = 'block';
         document.body.style.overflow = originalStyle;
      };
   }, [lock, responsiveDisplayValue]);
}

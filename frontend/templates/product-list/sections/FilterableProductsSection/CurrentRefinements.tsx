import { Box, Button, Flex } from '@chakra-ui/react';
import { faClose } from '@fortawesome/pro-solid-svg-icons';
import { formatFacetName } from '@helpers/algolia-helpers';
import { useSearchQuery } from '@templates/product-list/hooks/useSearchQuery';
import { FaIcon } from '@ifixit/icons';
import * as React from 'react';
import {
   useClearRefinements,
   useCurrentRefinements,
   usePagination,
} from 'react-instantsearch';

export function CurrentRefinements() {
   const { setSearchQuery } = useSearchQuery();
   const currentRefinements = useCurrentRefinements();
   const clearRefinements = useClearRefinements({
      excludedAttributes: [],
   });
   const pagination = usePagination();

   return (
      <>
         {currentRefinements.items.map((item) => {
            return (
               <React.Fragment key={item.label}>
                  {item.refinements.map((refinement) => {
                     const formattedFacetName = formatFacetName(
                        refinement.attribute
                     );
                     return (
                        <Flex
                           key={refinement.label}
                           data-testid={`current-refinement-${refinement.value}`}
                           bgColor="brand.100"
                           borderColor="brand.300"
                           borderWidth="1px"
                           py="3px"
                           px="1.5"
                           mr="1.5"
                           mb="1.5"
                           fontWeight="semibold"
                           fontSize={{ base: '13px', md: 'sm' }}
                           lineHeight={{ base: '4', md: '5' }}
                           color="brand.700"
                           alignItems="center"
                           borderRadius="base"
                           flexShrink={0}
                           maxW="full"
                        >
                           <Box noOfLines={1} wordBreak="break-all">
                              {formattedFacetName}: {refinement.label}
                           </Box>

                           <Button
                              variant="unstyled"
                              ml="1"
                              w="4"
                              h="4"
                              my="-1px"
                              minW="4"
                              display="flex"
                              aria-label={`Remove ${formattedFacetName}: ${refinement.label}`}
                              onClick={() => {
                                 item.refine(refinement);
                                 pagination.refine(0);
                              }}
                           >
                              <FaIcon
                                 display="block"
                                 icon={faClose}
                                 h="4"
                                 color="brand.300"
                                 transition="all 300ms"
                                 _hover={{
                                    color: 'brand.700',
                                 }}
                              />
                           </Button>
                        </Flex>
                     );
                  })}
               </React.Fragment>
            );
         })}
         <Button
            onClick={() => {
               setSearchQuery('');
               clearRefinements.refine();
            }}
            size="xs"
            variant="outline"
            bgColor="gray.100"
            borderColor="gray.300"
            color="gray.700"
            fontSize="sm"
            fontWeight="normal"
            borderRadius="base"
            transition="all 300ms"
            _hover={{
               bgColor: 'gray.200',
               color: 'gray.900',
               borderColor: 'gray.400',
            }}
         >
            Clear all filters
         </Button>
      </>
   );
}

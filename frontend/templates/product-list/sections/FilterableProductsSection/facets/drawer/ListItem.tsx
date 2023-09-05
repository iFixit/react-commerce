import { Box, Button, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import { faChevronRight, faClose } from '@fortawesome/pro-solid-svg-icons';
import { formatFacetName } from '@helpers/algolia-helpers';
import { FaIcon } from '@ifixit/icons';
import { useCurrentRefinements, usePagination } from 'react-instantsearch';

type ListItemProps = {
   attribute: string;
   refinedCount: number;
   refinementIndicator?: 'count' | 'dot';
   onSelect: (attribute: string) => void;
};

export function ListItem({
   attribute,
   refinedCount,
   refinementIndicator = 'count',
   onSelect,
}: ListItemProps) {
   const pagination = usePagination();
   const { items } = useCurrentRefinements({ includedAttributes: [attribute] });

   return (
      <Box
         data-testid="facets-drawer-list-item"
         data-drawer-list-item-name={attribute}
         pl="4"
         onClick={() => onSelect(attribute)}
      >
         <Flex pt="4" pl="1.5" justify="space-between" align="center" pr="4">
            <Text
               color="gray.900"
               fontWeight={refinedCount > 0 ? 'semibold' : 'normal'}
            >
               {formatFacetName(attribute)}
            </Text>
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
               <FaIcon icon={faChevronRight} h="4" color="gray.500" />
            </HStack>
         </Flex>

         <Flex
            pt="2"
            pl="1.5"
            pr="4"
            wrap="wrap"
            align="flex-start"
            display={{ base: 'flex', md: 'none' }}
         >
            {items.map((item) =>
               item.refinements.map((refinement) => {
                  const formattedFacetName = formatFacetName(
                     refinement.attribute
                  );
                  return (
                     <Flex
                        key={refinement.label}
                        data-testid={`current-refinement-drawer-${refinement.value}`}
                        bgColor="brand.100"
                        borderColor="brand.300"
                        borderWidth="1px"
                        py="1"
                        px="1.5"
                        mr="1.5"
                        mb="1.5"
                        fontWeight="semibold"
                        fontSize="sm"
                        lineHeight="1em"
                        color="brand.700"
                        alignItems="center"
                        borderRadius="base"
                        flexShrink={0}
                        maxW="full"
                     >
                        <Box noOfLines={1}>{refinement.label}</Box>

                        <Button
                           variant="unstyled"
                           ml="1"
                           w="4"
                           h="4"
                           my="-1px"
                           minW="4"
                           display="flex"
                           aria-label={`Remove ${formattedFacetName}: ${refinement.label}`}
                           onClick={(e) => {
                              item.refine(refinement);
                              pagination.refine(0);
                              e.stopPropagation();
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
               })
            )}
         </Flex>
         <Divider pt="4" borderColor="gray.200" opacity="1" />
      </Box>
   );
}

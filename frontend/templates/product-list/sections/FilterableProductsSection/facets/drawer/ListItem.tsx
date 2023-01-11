import { Box, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { formatFacetName } from '@helpers/algolia-helpers';
import { FaIcon } from '@ifixit/icons';

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
   return (
      <Box
         data-testid="facets-drawer-list-item"
         data-drawer-list-item-name={attribute}
         pl="4"
         onClick={() => onSelect(attribute)}
      >
         <Flex py="4" pl="1.5" justify="space-between" align="center" pr="4">
            <Text fontSize="sm" color="gray.700">
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
               <FaIcon icon={faChevronRight} h="2.5" color="gray.500" />
            </HStack>
         </Flex>
         <Divider />
      </Box>
   );
}

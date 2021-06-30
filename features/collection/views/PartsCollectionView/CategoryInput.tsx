import {
   Box,
   Button,
   Icon,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import { useFacetFilterList, useFacetValues } from '@lib/algolia';
import * as React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineUsb } from 'react-icons/ai';
import { BiCamera, BiChip, BiFridge } from 'react-icons/bi';
import { BsHouse, BsMusicPlayer } from 'react-icons/bs';
import { HiChevronDown, HiOutlineViewGrid } from 'react-icons/hi';
import { ImTablet } from 'react-icons/im';
import {
   IoGameControllerOutline,
   IoPhonePortraitOutline,
} from 'react-icons/io5';
import { RiComputerLine, RiMacbookLine } from 'react-icons/ri';

export interface CategoryInputProps {}

const categoryFacetName = 'named_tags.Device Category';

export function CategoryInput() {
   const { isLoaded, values } = useFacetValues(categoryFacetName);
   const { selectedValueIds, set } = useFacetFilterList(categoryFacetName, {
      filterType: 'or',
   });

   const selectedValue = React.useMemo(() => {
      const id = selectedValueIds[0];
      if (id == null) {
         return null;
      }
      return values.find((item) => item.id === id)?.value || null;
   }, [selectedValueIds, values]);

   return (
      <Box>
         <Menu>
            <MenuButton
               as={Button}
               lineHeight="1em"
               leftIcon={
                  selectedValue == null ? (
                     <Icon as={HiOutlineViewGrid} color="gray.500" />
                  ) : (
                     <Icon
                        as={categoryIcons[selectedValue]}
                        color="blue.500"
                        fill="blue.500"
                     />
                  )
               }
               rightIcon={<Icon as={HiChevronDown} />}
               minW="200px"
               textAlign="left"
            >
               {selectedValue || 'Choose category'}
            </MenuButton>
            <MenuList
               display="grid"
               gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))"
               gridGap="1px"
               p="0"
               bg="gray.200"
               overflow="hidden"
               minW="container.sm"
            >
               {isLoaded &&
                  values.map((item) => {
                     return (
                        <MenuItem
                           key={item.id}
                           bg="white"
                           py="2"
                           icon={
                              <Icon
                                 as={categoryIcons[item.value]}
                                 color="blue.500"
                                 fill="blue.500"
                                 boxSize="6"
                              />
                           }
                           onClick={() => set(item.id)}
                        >
                           {item.value}
                        </MenuItem>
                     );
                  })}
            </MenuList>
         </Menu>
      </Box>
   );
}

const categoryIcons: Record<string, IconType> = {
   Mac: RiMacbookLine,
   Phone: IoPhonePortraitOutline,
   Tablet: ImTablet,
   PC: RiComputerLine,
   'Computer Hardware': BiChip,
   Appliance: BiFridge,
   'Game Console': IoGameControllerOutline,
   Household: BsHouse,
   Camera: BiCamera,
   Electronics: AiOutlineUsb,
   'Portable Media Player': BsMusicPlayer,
};

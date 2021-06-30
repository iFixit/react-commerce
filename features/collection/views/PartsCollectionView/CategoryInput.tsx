import {
   Box,
   Button,
   Icon,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import * as React from 'react';
import { IconType } from 'react-icons';
import { FcKindle } from 'react-icons/fc';
import { HiChevronDown, HiOutlineViewGrid } from 'react-icons/hi';
import { IoIosPhonePortrait } from 'react-icons/io';
import {
   IoPhonePortraitOutline,
   IoTabletPortraitOutline,
} from 'react-icons/io5';
import { RiMacbookLine } from 'react-icons/ri';

export interface CategoryInputProps {}

export function CategoryInput() {
   return (
      <Box>
         <Menu>
            <MenuButton
               as={Button}
               lineHeight="1em"
               leftIcon={<Icon as={HiOutlineViewGrid} color="gray.500" />}
               rightIcon={<Icon as={HiChevronDown} />}
            >
               Choose category
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
               {Object.keys(categoryIcons).map((category) => {
                  return (
                     <MenuItem
                        key={category}
                        bg="white"
                        py="2"
                        icon={
                           <Icon
                              as={categoryIcons[category]}
                              color="blue.500"
                              fill="blue.500"
                              boxSize="6"
                           />
                        }
                     >
                        {category}
                     </MenuItem>
                  );
               })}
            </MenuList>
         </Menu>
      </Box>
   );
}

const categoryIcons: Record<string, IconType> = {
   'Mac Parts': RiMacbookLine,
   'iPhone Parts': IoPhonePortraitOutline,
   'iPad Parts': IoTabletPortraitOutline,
   'iPod Parts': IoIosPhonePortrait,
   'Amazon Kindle Parts': FcKindle,
};

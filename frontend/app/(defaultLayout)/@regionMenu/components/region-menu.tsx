'use client';

import { Menu, MenuList } from '@chakra-ui/react';
import { StoreMenuButton, StoreMenuItem } from '@ifixit/footer';
import { Flag, FlagCountryCode } from '@ifixit/icons';
import { StoreListItem } from '@models/store';

interface RegionMenuProps {
   regions: StoreListItem[];
}

export function RegionMenu({ regions }: RegionMenuProps) {
   return (
      <Menu isLazy lazyBehavior="keepMounted">
         <StoreMenuButton
            icon={<Flag code={FlagCountryCode.US} />}
            color="white"
         >
            Region
         </StoreMenuButton>
         <MenuList>
            {regions.map((region) => {
               return (
                  <StoreMenuItem
                     key={region.code}
                     as="a"
                     href={region.url}
                     icon={<Flag code={region.code.toUpperCase() as any} />}
                     name={region.name}
                     currency={region.currency}
                  />
               );
            })}
         </MenuList>
      </Menu>
   );
}

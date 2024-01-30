'use client';

import { Menu, MenuList } from '@chakra-ui/react';
import { StoreMenuButton, StoreMenuItem } from '@ifixit/footer';
import { Flag, FlagCountryCode } from '@ifixit/icons';
import { StoreListItem } from '@models/store';

interface StoreSelectProps {
   stores: StoreListItem[];
}

export function StoreSelect({ stores }: StoreSelectProps) {
   if (stores.length === 0) return null;

   return (
      <Menu isLazy lazyBehavior="keepMounted">
         <StoreMenuButton
            icon={<Flag code={FlagCountryCode.US} />}
            color="white"
         >
            Region
         </StoreMenuButton>
         <MenuList>
            {stores.map((store) => {
               return (
                  <StoreMenuItem
                     key={store.code}
                     as="a"
                     href={store.url}
                     icon={<Flag code={store.code.toUpperCase() as any} />}
                     name={store.name}
                     currency={store.currency}
                  />
               );
            })}
         </MenuList>
      </Menu>
   );
}

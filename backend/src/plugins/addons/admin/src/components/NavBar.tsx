import {
   Box,
   Flex,
   SubNav,
   SubNavHeader,
   SubNavLink,
   SubNavSections,
} from '@strapi/design-system';
import { PaperPlane, Stack } from '@strapi/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { dataTransferPath, bulkOperationsPath } from '../utils/path-helpers';

export function NavBar() {
   return (
      <Flex>
         <Box
            style={{
               height: '100vh',
            }}
            background="neutral200"
         >
            <SubNav ariaLabel="Settings sub nav">
               <SubNavHeader label="Menu" />
               <SubNavSections>
                  <SubNavLink
                     as={NavLink}
                     to={dataTransferPath()}
                     icon={<PaperPlane />}
                  >
                     Data Transfer
                  </SubNavLink>
                  <SubNavLink
                     as={NavLink}
                     to={bulkOperationsPath()}
                     icon={<Stack />}
                  >
                     Bulk Operations
                  </SubNavLink>
               </SubNavSections>
            </SubNav>
         </Box>
      </Flex>
   );
}

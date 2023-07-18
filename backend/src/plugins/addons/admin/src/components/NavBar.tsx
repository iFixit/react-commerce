import {
   Box,
   Flex,
   SubNav,
   SubNavHeader,
   SubNavLink,
   SubNavSections,
} from '@strapi/design-system';
import { Database, Stack } from '@strapi/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { backupPath, bulkOperationsPath } from '../utils/path-helpers';

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
                     to={backupPath()}
                     icon={<Database />}
                  >
                     Backup
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

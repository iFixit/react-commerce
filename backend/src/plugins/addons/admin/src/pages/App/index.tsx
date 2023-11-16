/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { Layout } from '@strapi/design-system';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { queryClient } from '../../utils/react-query-client';
import { NavBar } from '../../components/NavBar';
import {
   backupPath,
   bulkOperationsPath,
   homePath,
} from '../../utils/path-helpers';
import BackupPage from '../Backup';
import BulkOperationsPage from '../BulkOperations';

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <div>
            <Layout sideNav={<NavBar />}>
               <Switch>
                  <Route exact path={homePath()}>
                     <Redirect to={backupPath()} />
                  </Route>
                  <Route path={backupPath()} component={BackupPage} exact />
                  <Route
                     path={bulkOperationsPath()}
                     component={BulkOperationsPage}
                     exact
                  />
               </Switch>
            </Layout>
         </div>
      </QueryClientProvider>
   );
};

export default App;

'use client';

import { AppProviders } from '@components/common';
import { DEFAULT_STORE_CODE } from '@config/env';
import { DefaultLayout } from '@layouts/default';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { ReactNode } from 'react';

export default async function iFixitHeaderFooterLayout({
   children,
}: {
   children: ReactNode;
}) {
   const layoutPropsPromise = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   const layoutProps = await layoutPropsPromise;

   return (
      <AppProviders>
         <DefaultLayout {...layoutProps}>{children}</DefaultLayout>
      </AppProviders>
   );
}

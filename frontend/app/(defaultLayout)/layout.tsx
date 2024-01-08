import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { ReactNode } from 'react';
import { PageFrame } from './components/page-frame';

export default async function DefaultLayout({
   children,
   regionMenu,
}: {
   children: ReactNode;
   regionMenu: React.ReactNode;
}) {
   const layoutData = await getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   return (
      <PageFrame regionMenu={regionMenu} layoutData={layoutData}>
         {children}
      </PageFrame>
   );
}

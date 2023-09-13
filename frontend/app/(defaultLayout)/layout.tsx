import { AppProviders } from '@components/common/AppProviders';
import { DEFAULT_STORE_CODE } from '@config/env';
import { getiFixitOrigin } from '@helpers/path-helpers';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import IFixitPageFrame from './components/IFixitPageFrame';

export default async function DefaultLayout({
   children,
}: {
   children: ReactNode;
}) {
   const readonlyHeaders = headers();
   const ifixitOrigin = getiFixitOrigin(readonlyHeaders);
   const layoutPropsPromise = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   const layoutProps = await layoutPropsPromise;

   return (
      <AppProviders ifixitOrigin={ifixitOrigin}>
         <IFixitPageFrame {...layoutProps}>{children}</IFixitPageFrame>
      </AppProviders>
   );
}

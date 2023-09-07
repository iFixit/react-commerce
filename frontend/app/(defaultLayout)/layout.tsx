import { AppProviders } from '@components/common/AppProviders';
import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { ReactNode } from 'react';
import IFixitPageFrame from './components/IFixitPageFrame';
import { ifixitOriginFromHostWrapper } from './products/[handle]/helpers';

export default async function DefaultLayout({
   children,
}: {
   children: ReactNode;
}) {
   const ifixitOrigin = ifixitOriginFromHostWrapper();
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

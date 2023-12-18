import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { NotFoundPage } from './components/not-found-page';

export default async function NotFound() {
   const layoutPropsPromise = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   const layoutProps = await layoutPropsPromise;

   return <NotFoundPage {...layoutProps} />;
}

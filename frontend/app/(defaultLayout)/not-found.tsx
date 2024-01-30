import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { StoreSelect } from './@storeSelect/store-select';
import { NotFoundPage } from './components/not-found-page';
import { PageFrame } from './components/page-frame';

export default async function NotFound() {
   const layoutData = await getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   return (
      <PageFrame
         layoutData={layoutData}
         storeSelect={<StoreSelect stores={layoutData.stores} />}
      >
         <NotFoundPage />
      </PageFrame>
   );
}

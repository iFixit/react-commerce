import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { NotFoundPage } from './components/not-found-page';
import { PageFrame } from './components/page-frame';
import { RegionMenu } from './@regionMenu/components/region-menu';

export default async function NotFound() {
   const layoutData = await getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   return (
      <PageFrame
         layoutData={layoutData}
         regionMenu={<RegionMenu regions={layoutData.stores} />}
      >
         <NotFoundPage />
      </PageFrame>
   );
}

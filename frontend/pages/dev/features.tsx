import { withSSRFeatureCookies } from '@components/common/Feature';
import { DEFAULT_STORE_CODE } from '@config/env';
import {
   DefaultLayoutProps,
   getLayoutServerSideProps,
} from '@layouts/default/server';

export { default } from '@templates/dev/features';

async function getMyServerSideProps() {
   const layoutProps: Promise<DefaultLayoutProps> = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   return {
      props: {
         layoutProps: await layoutProps,
      },
   };
}

export const getServerSideProps = withSSRFeatureCookies(getMyServerSideProps);
export type FeaturesSSRProps = Awaited<
   ReturnType<typeof getServerSideProps>
>['props'];

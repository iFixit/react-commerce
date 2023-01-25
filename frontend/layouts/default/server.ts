import { timeAsync } from '@ifixit/helpers';
import { getGlobalSettings } from '@models/global-settings';
import { findStoreByCode, getStoreList } from '@models/store';

type GetLayoutServerSidePropsArgs = {
   storeCode: string;
};

export type DefaultLayoutProps = Awaited<
   ReturnType<typeof getLayoutServerSideProps>
>;

export type WithLayoutProps<T> = T & { layoutProps: DefaultLayoutProps };

export async function getLayoutServerSideProps({
   storeCode,
}: GetLayoutServerSidePropsArgs) {
   const [globalSettings, stores, { shopify, ...currentStore }] =
      await timeAsync('layoutProps', () =>
         Promise.all([
            getGlobalSettings(),
            getStoreList(),
            findStoreByCode(storeCode),
         ])
      );
   return {
      globalSettings,
      currentStore,
      shopifyCredentials: {
         storefrontDomain: shopify.storefrontDomain,
         storefrontAccessToken: shopify.storefrontAccessToken,
      },
      stores,
   };
}

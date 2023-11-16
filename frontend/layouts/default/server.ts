import { timeAsync } from '@ifixit/helpers';
import { getGlobalSettings } from '@models/global-settings';
import { findStoreByCode, getStoreList } from '@models/store';

type GetLayoutServerSidePropsArgs = {
   storeCode: string;
   forceMiss?: boolean;
};

export type DefaultLayoutProps = Awaited<
   ReturnType<typeof getLayoutServerSideProps>
> & { title?: string; includeTitle?: boolean };

export type WithLayoutProps<T> = T & { layoutProps: DefaultLayoutProps };

export async function getLayoutServerSideProps({
   storeCode,
   forceMiss,
}: GetLayoutServerSidePropsArgs) {
   const [globalSettings, stores, { shopify, ...currentStore }] =
      await timeAsync('layoutProps', () =>
         Promise.all([
            getGlobalSettings({ forceMiss }),
            getStoreList({ forceMiss }),
            findStoreByCode(storeCode, { forceMiss }),
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

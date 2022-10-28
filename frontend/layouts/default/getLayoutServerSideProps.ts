import { DEFAULT_STORE_CODE } from '@config/env';
import { getGlobalSettings } from '@models/global-settings';
import { getStoreByCode, getStoreList } from '@models/store';
import { DefaultLayoutProps } from './types';
import { logAsync } from '@ifixit/helpers';

export async function getLayoutServerSideProps(): Promise<DefaultLayoutProps> {
   const [globalSettings, stores, currentStore] = await logAsync(
      'layoutProps',
      () =>
         Promise.all([
            getGlobalSettings(),
            getStoreList(),
            // TODO: get store code from user session or fall back to default
            getStoreByCode(DEFAULT_STORE_CODE),
         ])
   );
   return {
      globalSettings,
      currentStore,
      stores,
   };
}

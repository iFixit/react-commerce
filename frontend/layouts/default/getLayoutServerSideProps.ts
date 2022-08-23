import { getGlobalSettings } from '@models/global-settings';
import { getStoreByCode, getStoreList } from '@models/store';
import { DefaultLayoutProps } from './types';

export async function getLayoutServerSideProps(): Promise<DefaultLayoutProps> {
   const [globalSettings, stores, currentStore] = await Promise.all([
      getGlobalSettings(),
      getStoreList(),
      getStoreByCode('us'),
   ]);
   return {
      globalSettings,
      currentStore,
      stores,
   };
}

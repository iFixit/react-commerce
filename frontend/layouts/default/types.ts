import { GlobalSettings } from '@models/global-settings';
import { Store, StoreListItem } from '@models/store';

export interface DefaultLayoutProps {
   stores: StoreListItem[];
   currentStore: Store;
   globalSettings: GlobalSettings;
}

export type WithLayoutProps<T> = T & { layoutProps: DefaultLayoutProps };

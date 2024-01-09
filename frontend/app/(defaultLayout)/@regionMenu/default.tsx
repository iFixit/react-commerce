import { getStoreList } from '@models/store';
import { RegionMenu } from './components/region-menu';

export default async function RegionMenuDefaultSlot() {
   const regions = await getStoreList();

   if (regions.length === 0) return null;

   return <RegionMenu regions={regions} />;
}

import { getStoreList } from '@models/store';
import { StoreSelect } from './store-select';

export default async function DefaultStoreSelect() {
   return <StoreSelect stores={await getStoreList()} />;
}

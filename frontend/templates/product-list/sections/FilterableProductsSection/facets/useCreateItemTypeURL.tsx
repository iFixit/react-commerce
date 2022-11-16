import { stylizeDeviceItemType } from '@helpers/product-list-helpers';
import { useRouter } from 'next/router';
import { MenuFacetState } from './useMenuFacet';

type MenuItem = MenuFacetState['items'][0];

export function useCreateItemTypeURL() {
   const router = useRouter();
   return (item: MenuItem): string => {
      const [path, query] = router.asPath.split('?');
      const segments = path.split('/').filter((segment) => segment !== '');
      const itemTypeHandle = encodeURIComponent(
         stylizeDeviceItemType(item.value)
      );
      const prefixSegments = segments.slice(0, 2);
      const search = query ? `?${query}` : '';
      return `/${prefixSegments.join('/')}/${itemTypeHandle}${search}`;
   };
}

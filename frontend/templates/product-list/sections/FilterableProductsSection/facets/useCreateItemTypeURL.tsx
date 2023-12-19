import { stylizeDeviceItemType } from '@helpers/product-list-helpers';
// https://github.com/algolia/instantsearch/issues/5650
import { useRouter } from 'next/compat/router';
import { MenuFacetState } from './useMenuFacet';

type MenuItem = MenuFacetState['items'][0];

export function useCreateItemTypeURL() {
   const router = useRouter();
   return (item: MenuItem): string => {
      if (!router) {
         return '';
      }
      const [path, query] = router.asPath.split('?');
      const segments = path.split('/').filter((segment) => segment !== '');
      const itemTypeHandle = encodeURIComponent(
         stylizeDeviceItemType(item.value)
      );
      const prefixSegments = segments.slice(0, 2);
      const params = new URLSearchParams(query);
      params.delete('p');
      const search = params.toString() ? `?${params.toString()}` : '';
      return `/${prefixSegments.join('/')}/${itemTypeHandle}${search}`;
   };
}

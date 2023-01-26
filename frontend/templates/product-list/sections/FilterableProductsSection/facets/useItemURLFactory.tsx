import { stylizeFacetValue } from '@helpers/product-list-helpers';
import { useRouter } from 'next/router';
import { MenuFacetState } from './useMenuFacet';

type MenuItem = MenuFacetState['items'][0];

export function useItemURLFactory() {
   const router = useRouter();
   return {
      createItemTypeURL: (item: MenuItem): string => {
         const [path, query] = router.asPath.split('?');
         const segments = path.split('/').filter((segment) => segment !== '');
         const itemTypeHandle = encodeURIComponent(
            stylizeFacetValue(item.value)
         );
         const prefixSegments = segments.slice(0, 2);
         const search = query ? `?${query}` : '';
         return `/${prefixSegments.join('/')}/${itemTypeHandle}${search}`;
      },
      createToolCategoryURL: (item: MenuItem): string => {
         const [path, query] = router.asPath.split('?');
         const segments = path.split('/').filter((segment) => segment !== '');
         const toolCategoryHandle = encodeURIComponent(
            stylizeFacetValue(item.value)
         );
         const prefixSegments = segments.slice(0, 1);
         const search = query ? `?${query}` : '';
         return `/${prefixSegments.join('/')}/${toolCategoryHandle}${search}`;
      },
   };
}

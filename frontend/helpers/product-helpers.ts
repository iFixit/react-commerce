import { IFIXIT_ORIGIN } from '@config/env';
import {
   faArrowUpRightFromSquare,
   faImage,
   faShop,
   faWarehouse,
   IconDefinition,
} from '@fortawesome/pro-solid-svg-icons';
import { ifixitOriginWithSubdomain } from './path-helpers';

export function getProductPath(handle: string) {
   switch (handle) {
      case 'pro-tech-toolkit':
         return `${IFIXIT_ORIGIN}/Store/Tools/Pro-Tech-Toolkit/IF145-307`;
      case 'manta-driver-kit-112-bit-driver-kit':
         return `${IFIXIT_ORIGIN}/Store/Tools/Manta-Driver-Kit--112-Bit-Driver-Kit/IF145-392`;
      default:
         return `/products/${handle}`;
   }
}

interface ProductEditMenuOption {
   icon: IconDefinition;
   label: string;
}

export interface ProductEditMenuLink extends ProductEditMenuOption {
   url: string;
}

type GetAdminLinksProps = {
   productcode?: string;
   productId: string;
   storeCode: string;
};

export function getAdminLinks({
   productcode,
   productId,
   storeCode,
}: GetAdminLinksProps): ProductEditMenuLink[] {
   const encodedProductcode = encodeURIComponent(productcode ?? '');
   const encodedProductId = encodeProductId(productId);
   const akeneoOrigin = ifixitOriginWithSubdomain('akeneo');
   return [
      {
         icon: faArrowUpRightFromSquare,
         label: 'Akeneo',
         url: `${akeneoOrigin}/redirect/edit/product/${encodedProductcode}`,
      },
      {
         icon: faShop,
         label: 'Shopify',
         url: `https://ifixit-${storeCode}.myshopify.com/admin/products/${encodedProductId}`,
      },
      {
         icon: faWarehouse,
         label: 'View Inventory',
         url: `${IFIXIT_ORIGIN}/Admin/Inventory/inventory_report.php?searchTerm=${encodedProductcode}`,
      },
      {
         icon: faImage,
         label: 'Edit Images',
         url: `${IFIXIT_ORIGIN}/Admin/Product/ProductImages.php?productcode=${encodedProductcode}`,
      },
   ];
}

export function encodeProductId(productId: string) {
   if (!productId.startsWith('gid://')) {
      throw new Error('Product id must be a global shopify product id');
   }
   return productId.replace(/^gid:\/\/shopify\/Product\//, '');
}

import Shopify from '@shopify/shopify-api';

export function getShopClient(shopName: string, accessToken: string) {
   return new Shopify.Clients.Rest(getShopDomain(shopName), accessToken);
}

export function getShopDomain(shopName: string) {
   return `${shopName.replace('.myshopify.com', '')}.myshopify.com`;
}

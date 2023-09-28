export function getProductIdFromGlobalId(globalProductId: string) {
   if (!globalProductId.startsWith('gid://')) {
      throw new Error('Product id must be a global shopify product id');
   }
   return globalProductId.replace(/^gid:\/\/shopify\/Product\//, '');
}

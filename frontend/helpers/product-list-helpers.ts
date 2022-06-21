type ProductListAttributes = {
   filters?: string | null;
   deviceTitle?: string | null;
};

export function computeProductListAlgoliaFilterPreset<
   T extends ProductListAttributes
>(productList: T): string | undefined {
   const { filters, deviceTitle } = productList;
   if (filters && filters.length > 0) {
      return filters;
   }
   if (deviceTitle && deviceTitle.length > 0) {
      return `device:${JSON.stringify(deviceTitle)}`;
   }
   return undefined;
}

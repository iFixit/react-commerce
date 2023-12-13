import type {
   Product,
   ProductVariant,
   ProductVariantImage,
} from '@pages/api/nextjs/cache/product';

const toolProductImages: ProductVariantImage[] = [
   {
      id: 'gid://shopify/ProductImage/31648428556378',
      altText: 'Hakko 5B SA Curved Tweezers New',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/4LRTYhhAGRDEVEAX.jpg?v=1667585986',
      variantId: 'gid://shopify/ProductVariant/39333789761626',
   },
];

const toolProductVariants: ProductVariant[] = [
   {
      id: 'gid://shopify/ProductVariant/39333789761626',
      sku: 'IF317-048-1',
      quantityAvailable: 13,
      image: {
         id: 'gid://shopify/ProductImage/31648428556378',
         altText: 'Hakko 5B SA Curved Tweezers New',
         height: 2000,
         width: 2000,
         url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/4LRTYhhAGRDEVEAX.jpg?v=1667585986',
         variantId: 'gid://shopify/ProductVariant/39333789761626',
      },
      price: {
         amount: 9.99,
         currencyCode: 'USD',
      },
      compareAtPrice: null,
      proPricesByTier: {
         pro_1: {
            amount: 9.95,
            currencyCode: 'USD',
         },
         pro_2: {
            amount: 9.95,
            currencyCode: 'USD',
         },
         pro_3: {
            amount: 9.95,
            currencyCode: 'USD',
         },
         pro_4: {
            amount: 9.95,
            currencyCode: 'USD',
         },
      },
      selectedOptions: [
         {
            name: 'Condition',
            value: 'New',
         },
      ],
      description:
         '<p>Very precise fine tipped tweezers for microsoldering and manipulating tiny parts.</p>',
      kitContents: null,
      assemblyContents: null,
      note: null,
      disclaimer: null,
      warning: null,
      specifications: null,
      warranty: 'One year warranty',
      enabled: true,
      disableWhenOOS: false,
      internalDisplayName: 'Hakko 5B SA Curved Tweezers',
      shippingRestrictions: null,
      productcode: '317048',
      optionid: '1',
      isDiscounted: false,
      discountPercentage: 0,
      title: 'New',
      crossSellVariantIds: ['gid://shopify/ProductVariant/39333789794394'],
   },
];

export const mockedToolProduct: Product = {
   __typename: 'Product',
   id: 'gid://shopify/Product/6556235071578',
   title: 'Hakko 5B SA Curved Tweezers',
   handle: 'hakko-5b-sa-curved-tweezers',
   noindex: false,
   descriptionHtml:
      '<p>Very precise fine tipped tweezers for microsoldering and manipulating tiny parts.</p>',
   tags: ['Condition:New', 'Tool', 'Tool Category (Legacy):Soldering & Wiring'],
   reviews: {
      rating: 5.0,
      count: 2,
   },
   breadcrumbs: [
      {
         label: 'Home',
         url: '/Store',
      },
      {
         label: 'Tools',
         url: '/Tools',
      },
      {
         label: 'Hakko 5B SA Curved Tweezers',
         url: '#',
      },
   ],
   prop65WarningType: null,
   prop65Chemicals: 'none',
   productVideos: null,
   productVideosJson: null,
   compatibility: null,
   compatibilityNotes: null,
   metaTitle: 'Hakko 5B SA Curved Tweezers',
   shortDescription: 'Hakko 5B SA Curved tweezers great for microsoldering.',
   oemPartnership: null,
   enabledDomains: [
      {
         code: 'us',
         domain: 'https://www.ifixit.com',
         locales: ['en-US'],
      },
   ],
   images: toolProductImages,
   fallbackImages: [],
   options: [
      {
         id: 'gid://shopify/ProductOption/8433952227418',
         name: 'Condition',
         values: ['New'],
      },
   ],
   variants: toolProductVariants,
   isEnabled: true,
   iFixitProductId: 'IF317-048',
   productcode: '317048',
   redirectUrl: null,
   vendor: '',
   crossSellVariants: [
      {
         id: 'gid://shopify/ProductVariant/39333789794394',
         sku: 'IF317-047-1',
         quantityAvailable: 31,
         handle: 'hakko-3-sa-tweezers',
         title: 'Hakko 3 SA Tweezers',
         variantTitle: null,
         reviews: {
            rating: 5,
            count: 3,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/31648429015130',
            altText: 'IF317-047-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/NHvasuuucgWNLOiK_5fe4cc71-1a6d-4718-b654-3f4cde68dbec.jpg?v=1667585988',
         },
         price: {
            amount: 9.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 9.95,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 9.95,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 9.95,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 9.95,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
         enabled: true,
         shopifyVariantId: '39333789794394',
      },
   ],
   sections: [
      {
         type: 'ProductOverview',
         id: 'ProductOverviewSection-0',
      },
      {
         type: 'ReplacementGuides',
         id: 'ReplacementGuidesSection-1',
         title: null,
         guides: [
            {
               id: '0',
               title: 'Motorola Moto G7 Play Battery Replacement',
               url: '/Guide/Motorola+Moto+G7+Play+Battery+Replacement/131323',
               imageUrl:
                  'https://www.cominor.com/igi/VccIYuMpooQRd6Od.thumbnail',
               summary: 'This guide will show each detailed step to...',
               difficulty: 'Moderate',
               timeRequired: '45 - 50 minutes',
            },
         ],
      },
   ],
};

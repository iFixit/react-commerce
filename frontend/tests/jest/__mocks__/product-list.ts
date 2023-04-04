import type { ProductSearchHit } from '@models/product-list';

export const getMockProductSearchHit = (
   overrides: Partial<ProductSearchHit> = {}
): ProductSearchHit => {
   return {
      ...mockedProductSearchHit,
      ...overrides,
   };
};

const mockedProductSearchHit: ProductSearchHit = {
   sku: 'IF-313-1233',
   category: ['Batteries'],
   description:
      'Replace a dead or malfunctioning model EB-BG965ABE battery in a Samsung Galaxy S9 Plus smartphone.',
   device: [
      'Samsung Galaxy S9 Plus',
      'Samsung Galaxy Phone S',
      'Samsung Android Phone',
      'Android Phone',
      'Phone',
   ],
   doctype: 'product_group',
   facet_tags: {
      'Device Type': 'Galaxy S',
      'Device Brand': 'Samsung',
      OS: 'Android',
      'Device Category': 'Phone',
      'Part or Kit': ['Fix Kit', 'Part Only'],
      'Item Type': 'Batteries',
      'Main Category': 'Parts',
      Price: [36.99, 41.99, 29.99, 23.99],
   },
   group_max_price: 4199,
   group_min_price: 2999,
   handle: 'galaxy-s9-plus-replacement-battery',
   has_image: 1,
   identifiers: [
      '404-007',
      '404007',
      'IF404-007',
      'IF404007',
      '404-007-3',
      '404-007-4',
      '404-007-1',
      '404-007-2',
      '404007-3',
      '404007-4',
      '404007-1',
      '404007-2',
      'IF404-007-3',
      'IF404-007-4',
      'IF404-007-1',
      'IF404-007-2',
      'IF404007-3',
      'IF404007-4',
      'IF404007-1',
      'IF404007-2',
   ],
   image_url:
      'https://cart-products.cdn.ifixit.com/cart-products/iPbUhjTn6EYf1PTS.standard',
   is_pro: 0,
   keywords: [],
   lifetime_warranty: false,
   objectType: 'product_group',
   oem_partnership: null,
   price_float: 41.99,
   price_range: '$29 - $41',
   productcode: 404007,
   productid: 4040070000,
   public: 1,
   quantity_available: 10,
   rating: 4.5,
   rating_count: 18,
   score_product: 902,
   search_tags: [],
   short_description:
      'Replace a dead or malfunctioning model EB-BG96aasd5ABE battery in a Samsung Galaxy S9 Plus smartphone.',
   site: 'ifixit',
   title: 'Galaxy S9+ Battery',
   url: '/Store/Android/Galaxy-S9-Battery/IF404-007?o=4',
   worksin: [
      'Samsung Galaxy S9 Plus Canada (G965W)',
      'Samsung Galaxy S9 Plus China, Latin America (G9650)',
      'Samsung Galaxy S9 Plus Europe, Global Dual-SIM (G965F/DS)',
      'Samsung Galaxy S9 Plus Europe, Global Single-SIM (G965F)',
      'Samsung Galaxy S9 Plus USA (G965U)',
   ],
   objectID: '0000000002_product_group_4040070000_en',
   _highlightResult: {
      category: [
         {
            value: 'Batteries',
            matchLevel: 'none',
            matchedWords: [],
         },
      ],
      description: {
         value: 'Replace a dead or malfunctioning model EB-BG965ABE battery in a Samsung Galaxy S9 Plus smartphone.',
         matchLevel: 'none',
         matchedWords: [],
      },
      device: [
         {
            value: 'Samsung Galaxy S9 Plus',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Samsung Galaxy Phone S',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Samsung Android Phone',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Android Phone',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Phone',
            matchLevel: 'none',
            matchedWords: [],
         },
      ],
      identifiers: [
         {
            value: '404-007',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404007',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404-007',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404007',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404-007-3',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404-007-4',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404-007-1',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404-007-2',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404007-3',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404007-4',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404007-1',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: '404007-2',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404-007-3',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404-007-4',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404-007-1',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404-007-2',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404007-3',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404007-4',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404007-1',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'IF404007-2',
            matchLevel: 'none',
            matchedWords: [],
         },
      ],
      title: {
         value: 'Galaxy S9+ Battery',
         matchLevel: 'none',
         matchedWords: [],
      },
      worksin: [
         {
            value: 'Samsung Galaxy S9 Plus Canada (G965W)',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Samsung Galaxy S9 Plus China, Latin America (G9650)',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Samsung Galaxy S9 Plus Europe, Global Dual-SIM (G965F/DS)',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Samsung Galaxy S9 Plus Europe, Global Single-SIM (G965F)',
            matchLevel: 'none',
            matchedWords: [],
         },
         {
            value: 'Samsung Galaxy S9 Plus USA (G965U)',
            matchLevel: 'none',
            matchedWords: [],
         },
      ],
   },
   __position: 121,
};

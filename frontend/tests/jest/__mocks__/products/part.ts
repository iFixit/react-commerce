import type {
   Product,
   ProductVariant,
   ProductVariantImage,
} from '@pages/api/nextjs/cache/product';

const partProductImages: ProductVariantImage[] = [
   {
      id: 'gid://shopify/ProductImage/31667549864026',
      altText: 'Galaxy A51 Screen New Part Only',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/hUxkteGSKrZWtprS_11f56205-e41f-40a9-bd40-d2318d15d2b3.jpg?v=1669276040',
      variantId: 'gid://shopify/ProductVariant/39425225392218',
   },
   {
      id: 'gid://shopify/ProductImage/31667549896794',
      altText: 'Galaxy A51 Screen New Part Only',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/IlEA1KXGbvi4Hd2G_0f0ff27f-8532-4302-bdc5-6f8ed677c251.jpg?v=1669276040',
      variantId: 'gid://shopify/ProductVariant/39425225392218',
   },
];

const partProductVariants: ProductVariant[] = [
   {
      id: 'gid://shopify/ProductVariant/39425225392218',
      sku: 'IF457-000-1',
      quantityAvailable: 360,
      image: {
         id: 'gid://shopify/ProductImage/31667549864026',
         altText: 'Galaxy A51 Screen New Part Only',
         height: 2000,
         width: 2000,
         url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/hUxkteGSKrZWtprS_11f56205-e41f-40a9-bd40-d2318d15d2b3.jpg?v=1669276040',
         variantId: 'gid://shopify/ProductVariant/39425225392218',
      },
      price: {
         amount: 119.99,
         currencyCode: 'USD',
      },
      compareAtPrice: null,
      proPricesByTier: {
         pro_1: {
            amount: 119.99,
            currencyCode: 'USD',
         },
         pro_2: {
            amount: 119.99,
            currencyCode: 'USD',
         },
         pro_3: {
            amount: 119.99,
            currencyCode: 'USD',
         },
         pro_4: {
            amount: 119.99,
            currencyCode: 'USD',
         },
      },
      selectedOptions: [
         {
            name: 'Condition',
            value: 'New',
         },
         {
            name: 'Part or Kit',
            value: 'Part Only',
         },
      ],
      description:
         '<p>This Galaxy A51 replacement screen includes all of the small parts preinstalled in the assembly, saving time and increasing the quality of your repair.</p>\n\n<p>Replace a cracked or scratched front glass panel or malfunctioning AMOLED display on your phone. This screen and digitizer assembly will renew the appearance of your front panel, restore touch function, and eliminate the dead pixels or flickering on an aging display.</p>\n\n<p>This is an aftermarket part. It is not a genuine Samsung part.</p>',
      kitContents: null,
      assemblyContents:
         '<ul><li>Front Glass Digitizer Screen</li><li>AMOLED Display</li></ul>',
      note: null,
      disclaimer: '<p>Installation adhesive is not included.</p>',
      warning: null,
      specifications:
         "<table class='specifications'><tr><th>Manufacturer</th><td>Aftermarket</td></tr></table>",
      warranty: 'Lifetime Guarantee',
      enabled: true,
      disableWhenOOS: false,
      internalDisplayName: 'Galaxy A51 Screen / New / Part Only',
      shippingRestrictions: null,
      productcode: '457000',
      optionid: '1',
      isDiscounted: false,
      discountPercentage: 0,
      title: 'New / Part Only',
      crossSellVariantIds: [],
   },
];

export const mockedPartProduct: Product = {
   id: 'gid://shopify/Product/6581511684186',
   title: 'Galaxy A51 Screen',
   handle: 'galaxy-a51-screen',
   descriptionHtml:
      '<p>This Galaxy A51 replacement screen includes all of the small parts preinstalled in the assembly, saving time and increasing the quality of your repair.</p>\n\n<p>Replace a cracked or scratched front glass panel or malfunctioning AMOLED display on your phone. This screen and digitizer assembly will renew the appearance of your front panel, restore touch function, and eliminate the dead pixels or flickering on an aging display.</p>\n\n<p>This is an aftermarket part. It is not a genuine Samsung part.</p>',
   tags: [
      'Condition:New',
      'Device Brand:Samsung',
      'Device Category:Phone',
      'Device Type:Galaxy A',
      'Item Type:Screens',
      'OS:Android',
      'Part',
      'Part or Kit:Part Only',
      'worksin:2255',
   ],
   reviews: {
      rating: 5.0,
      count: 1,
   },
   breadcrumbs: [
      {
         label: 'Home',
         url: '/Store',
      },
      {
         label: 'Parts',
         url: '/Parts',
      },
      {
         label: 'Phone',
         url: '/Parts/Phone',
      },
      {
         label: 'Android Phone',
         url: '/Parts/Android_Phone',
      },
      {
         label: 'Samsung Android Phone',
         url: '/Parts/Samsung_Android_Phone',
      },
      {
         label: 'Samsung Galaxy A',
         url: '/Parts/Samsung_Galaxy_A',
      },
      {
         label: 'Samsung Galaxy A51',
         url: '/Parts/Samsung_Galaxy_A51',
      },
      {
         label: 'Galaxy A51 Screen',
         url: '#',
      },
   ],
   prop65WarningType: 'cancer and birth defects or other reproductive harm',
   prop65Chemicals: 'lead',
   productVideos: null,
   productVideosJson: null,
   compatibility: {
      devices: [
         {
            imageUrl: 'https://www.cominor.com/igi/rRRtB3kIHXtXQ1uZ.thumbnail',
            deviceUrl: '/Device/Samsung_Galaxy_A51',
            deviceName: 'Samsung Galaxy A51',
            variants: [
               'SM-A515F',
               'SM-A515FM',
               'SM-A515FN',
               'SM-A515GN',
               'SM-A515W',
               'SM-A515YN',
            ],
         },
      ],
      hasMoreDevices: false,
   },
   compatibilityNotes: null,
   metaTitle: 'Galaxy A51 Screen',
   shortDescription:
      'Replace an AMOLED screen compatible with the Samsung Galaxy A51 smartphone.',
   oemPartnership: null,
   enabledDomains: [
      {
         code: 'us',
         domain: 'https://www.ifixit.com',
         locales: ['en-US'],
      },
   ],
   images: partProductImages,
   options: [
      {
         id: 'gid://shopify/ProductOption/8466995773530',
         name: 'Condition',
         values: ['New'],
      },
      {
         id: 'gid://shopify/ProductOption/8466995806298',
         name: 'Part or Kit',
         values: ['Part Only'],
      },
   ],
   variants: partProductVariants,
   isEnabled: true,
   iFixitProductId: 'IF457-000',
   productcode: '457000',
   redirectUrl: null,
   vendor: '',
   crossSellVariants: [],
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
               title: 'Samsung Galaxy A51 Screen Replacement',
               url: '/Guide/Samsung+Galaxy+A51+Screen+Replacement/135277',
               imageUrl:
                  'https://www.cominor.com/igi/RH2mIEknySwiMw5Z.thumbnail',
               summary: 'Use this guide to replace a cracked or broken...',
               difficulty: 'Moderate',
               timeRequired: '1 - 2 hours',
            },
         ],
      },
   ],
};

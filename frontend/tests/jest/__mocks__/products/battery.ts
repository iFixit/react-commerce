import type {
   Product,
   ProductVariant,
   ProductVariantImage,
} from '@pages/api/nextjs/cache/product';

const batteryProductImages: ProductVariantImage[] = [
   {
      id: 'gid://shopify/ProductImage/31667478593626',
      altText: 'Moto G7 Play Battery New',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/Q6EDGMTQM3yGyAgE_2c2debb6-12c5-4d42-9f3f-6f2e7bfc5218.jpg?v=1669273550',
      variantId: 'gid://shopify/ProductVariant/39333868634202',
   },
   {
      id: 'gid://shopify/ProductImage/31667478626394',
      altText: 'Moto G7 Play Battery New',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/FsQKrYKlBIjmfAlg_b68db7e6-40f2-4d78-b7a5-a22b86daa44f.jpg?v=1669273550',
      variantId: 'gid://shopify/ProductVariant/39333868634202',
   },
];

const batteryProductVariants: ProductVariant[] = [
   {
      id: 'gid://shopify/ProductVariant/39333868634202',
      sku: 'IF390-042-1',
      quantityAvailable: 462,
      image: {
         id: 'gid://shopify/ProductImage/31667478593626',
         altText: 'Moto G7 Play Battery New',
         height: 2000,
         width: 2000,
         url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/Q6EDGMTQM3yGyAgE_2c2debb6-12c5-4d42-9f3f-6f2e7bfc5218.jpg?v=1669273550',
         variantId: 'gid://shopify/ProductVariant/39333868634202',
      },
      price: {
         amount: 32.99,
         currencyCode: 'USD',
      },
      compareAtPrice: null,
      proPricesByTier: {
         pro_1: {
            amount: 29.69,
            currencyCode: 'USD',
         },
         pro_2: {
            amount: 28.04,
            currencyCode: 'USD',
         },
         pro_3: {
            amount: 26.39,
            currencyCode: 'USD',
         },
         pro_4: {
            amount: 24.74,
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
         "<p>This Moto G7 Play replacement battery is what you need to bring your dead smartphone back to life!</p>\n\n<ul><li>Repair with confidence! iFixit is an authorized Motorola parts reseller.</li></ul>\n\n<p>Battery degradation is an inevitable part of your Android phone's lifespan — extend it with this replacement battery compatible with the Moto G7 Play. If your phone won’t turn on, won’t hold a charge, or you simply experience poor battery life, this replacement battery may be what you need to fix it.</p>",
      kitContents: null,
      assemblyContents: null,
      note: '<p>For optimal performance, calibrate your newly installed battery: Charge it to 100% and keep charging it for at least 2 more hours. Then use your device until it shuts off due to low battery. Finally, charge it uninterrupted to 100%.</p>',
      disclaimer: null,
      warning:
         '<p><a href="https://www.cominor.com/Wiki/What_to_do_with_a_swollen_battery" target="_blank">Learn more</a> about safe lithium-ion battery handling and proper disposal.</p>',
      specifications:
         "<table class='specifications'><tr><th>Battery Model #</th><td>JE40</td></tr>\n<tr><th>Watt Hours</th><td> 11.4 Wh</td></tr>\n<tr><th>Voltage</th><td>3.8 V</td></tr>\n<tr><th>Milliamp Hours</th><td> 3000 mAh</td></tr>\n<tr><th>Manufacturer</th><td>Motorola</td></tr></table>",
      warranty: 'One year warranty',
      enabled: true,
      disableWhenOOS: false,
      internalDisplayName: 'Moto G7 Play Battery / Part Only',
      shippingRestrictions: ['is_battery'],
      productcode: '390042',
      optionid: '1',
      isDiscounted: false,
      discountPercentage: 0,
      title: 'New',
      crossSellVariantIds: [],
   },
];

export const mockedBatteryProduct: Product = {
   __typename: 'Product',
   id: 'gid://shopify/Product/6556284026970',
   title: 'Moto G7 Play Battery',
   handle: 'moto-g7-play-replacement-battery',
   noindex: false,
   descriptionHtml:
      "<p>This Moto G7 Play replacement battery is what you need to bring your dead smartphone back to life!</p>\n\n<ul><li>Repair with confidence! iFixit is an authorized Motorola parts reseller.</li></ul>\n\n<p>Battery degradation is an inevitable part of your Android phone's lifespan — extend it with this replacement battery compatible with the Moto G7 Play. If your phone won’t turn on, won’t hold a charge, or you simply experience poor battery life, this replacement battery may be what you need to fix it.</p>",
   tags: [
      'BATTERY',
      'Battery Model #:JE40',
      'Condition:New',
      'Device Brand:Motorola',
      'Device Category:Phone',
      'Device Type:Moto G',
      'Item Type:Batteries',
      'OS:Android',
      'Part',
      'Part or Kit:Part Only',
      'worksin:1884',
   ],
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
         label: 'Motorola Android Phone',
         url: '/Parts/Motorola_Android_Phone',
      },
      {
         label: 'Motorola Moto G',
         url: '/Parts/Motorola_Moto_G',
      },
      {
         label: 'Motorola Moto G7 Play',
         url: '/Parts/Motorola_Moto_G7_Play',
      },
      {
         label: 'Moto G7 Play Battery',
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
            imageUrl: 'https://www.cominor.com/igi/bb6Hsc4ZGHWZKlFi.thumbnail',
            deviceUrl: '/Device/Motorola_Moto_G7_Play',
            deviceName: 'Motorola Moto G7 Play',
            variants: ['XT1952-3 (USA)'],
         },
      ],
      hasMoreDevices: false,
   },
   compatibilityNotes: null,
   metaTitle: 'Moto G7 Play Battery',
   shortDescription:
      'Replace a JE40 model battery compatible with the Motorola Moto G7 Play smartphone.  3000 mAh. 11.4 Watt Hours (Wh). 3.8 Volts (V).',
   oemPartnership: {
      text: 'Genuine Motorola Part',
      code: 'motorola',
      url: '/Motorola',
   },
   enabledDomains: [
      {
         code: 'us',
         domain: 'https://www.ifixit.com',
         locales: ['en-US'],
      },
   ],
   images: batteryProductImages,
   fallbackImages: [],
   options: [
      {
         id: 'gid://shopify/ProductOption/8434015174746',
         name: 'Condition',
         values: ['New'],
      },
   ],
   variants: batteryProductVariants,
   isEnabled: true,
   iFixitProductId: 'IF390-042',
   productcode: '390042',
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

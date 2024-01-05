import type {
   Product,
   ProductVariant,
   ProductVariantImage,
} from '@pages/api/nextjs/cache/product';

const productImages: ProductVariantImage[] = [
   {
      id: 'gid://shopify/ProductImage/31263941197914',
      altText: 'iPhone 6s Plus Battery New Fix Kit',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/WNVDn4lvaMJpK33F.jpg?v=1656545132',
      variantId: 'gid://shopify/ProductVariant/32965718147162',
   },
   {
      id: 'gid://shopify/ProductImage/31263941230682',
      altText: 'iPhone 6s Plus Battery New Part Only',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/RIvaaHOkDZJTBCBM_6b73f13e-f9b2-4eee-887f-b699cfb66f29.jpg?v=1656545132',
      variantId: 'gid://shopify/ProductVariant/32965718179930',
   },
   {
      id: 'gid://shopify/ProductImage/31263941263450',
      altText: 'iPhone 6s Plus Battery New Part Only',
      height: 2000,
      width: 2000,
      url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/Z1Bdx4Xp52FOXtG2_e21190de-41a3-4952-9df0-f1630410dbae.jpg?v=1656545132',
      variantId: 'gid://shopify/ProductVariant/32965718179930',
   },
];

const productVariants: ProductVariant[] = [
   {
      id: 'gid://shopify/ProductVariant/32965718147162',
      sku: 'IF315-007-10',
      quantityAvailable: 63,
      image: {
         id: 'gid://shopify/ProductImage/31263941197914',
         altText: 'iPhone 6s Plus Battery New Fix Kit',
         height: 2000,
         width: 2000,
         url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/WNVDn4lvaMJpK33F.jpg?v=1656545132',
         variantId: 'gid://shopify/ProductVariant/32965718147162',
      },
      price: {
         amount: 23.99,
         currencyCode: 'USD',
      },
      compareAtPrice: {
         amount: 29.99,
         currencyCode: 'USD',
      },
      proPricesByTier: {
         pro_1: {
            amount: 29.99,
            currencyCode: 'USD',
         },
         pro_2: {
            amount: 29.99,
            currencyCode: 'USD',
         },
         pro_3: {
            amount: 29.99,
            currencyCode: 'USD',
         },
         pro_4: {
            amount: 29.99,
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
            value: 'Fix Kit',
         },
      ],
      description:
         '<p>This replacement battery is what you need to bring that dead smartphone back to life. The Fix Kit includes everything you need to swap in a new replacement battery.</p>\n\n<ul><li>This battery is brand new! Each one has been tested to confirm that there are no cycles on the cell and that the capacity is 95% or higher.</li><li>Make disassembly for future repairs easier, replace your pentalobe bottom screws with the Phillips screws included in the kit.</li></ul>',
      kitContents:
         '<ul><li>New Replacement Battery Compatible with iPhone 6s Plus with Adhesive Strips Preinstalled</li><li><a href="/products/iphone-6s-plus-display-assembly-adhesive">iPhone 6s Plus Display Assembly Adhesive</a></li><li><a href="/products/spudger">Spudger</a></li><li><a href="/products/suction-handle">Suction Handle</a></li><li><a href="/products/tweezers">Tweezers / Angled / Pro / ESD</a></li><li><a href="/products/ifixit-opening-tool">iFixit Opening Tool</a></li><li>Replacement Phillips Bottom Screws</li><li><a href="/products/ifixit-precision-bit-driver">Precision Bit Driver</a></li><li><a href="/products/ifixit-precision-4-mm-screwdriver-bit">4 mm Precision Bits</a>:<ul><li>Phillips #000</li><li>Pentalobe P2</li><li>Tri-point Y000</li></ul></li></ul>',
      assemblyContents: null,
      note: '<p>For optimal performance, calibrate your newly installed battery: Charge it to 100% and keep charging it for at least 2 more hours. Then use your device until it shuts off due to low battery. Finally, charge it uninterrupted to 100%.</p>',
      disclaimer:
         '<p>While not necessary, some fixers prefer to use additional tools to accomplish this repair: <a href="/products/iopener">iOpener</a> and <a href="/products/plastic-cards">Plastic Card</a>.</p>',
      warning:
         '<p><a href="https://mmcelvain.cominor.com/Wiki/What_to_do_with_a_swollen_battery" target="_blank">Learn more</a> about safe lithium-ion battery handling and proper disposal.</p>',
      specifications:
         "<table class='specifications'><tr><th>Part #</th><td>616-00045</td></tr>\n<tr><th>Watt Hours</th><td>10.45 Wh</td></tr>\n<tr><th>Voltage</th><td>3.8 V</td></tr>\n<tr><th>Milliamp Hours</th><td>2750 mAh</td></tr>\n<tr><th>Manufacturer</th><td>Aftermarket</td></tr></table>",
      warranty: 'One year warranty',
      enabled: true,
      disableWhenOOS: false,
      internalDisplayName: 'iPhone 6s Plus Battery / Fix Kit with Adhesive',
      shippingRestrictions: ['is_battery'],
      productcode: '315007',
      optionid: '10',
      isDiscounted: true,
      discountPercentage: 20,
      title: 'New / Fix Kit',
      crossSellVariantIds: [
         'gid://shopify/ProductVariant/32965720473690',
         'gid://shopify/ProductVariant/32965720178778',
      ],
   },
   {
      id: 'gid://shopify/ProductVariant/32965718179930',
      sku: 'IF315-007-9',
      quantityAvailable: 42,
      image: {
         id: 'gid://shopify/ProductImage/31263941230682',
         altText: 'iPhone 6s Plus Battery New Part Only',
         height: 2000,
         width: 2000,
         url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/RIvaaHOkDZJTBCBM_6b73f13e-f9b2-4eee-887f-b699cfb66f29.jpg?v=1656545132',
         variantId: 'gid://shopify/ProductVariant/32965718179930',
      },
      price: {
         amount: 24.99,
         currencyCode: 'USD',
      },
      compareAtPrice: null,
      proPricesByTier: {
         pro_1: {
            amount: 23.33,
            currencyCode: 'USD',
         },
         pro_2: {
            amount: 17.5,
            currencyCode: 'USD',
         },
         pro_3: {
            amount: 11,
            currencyCode: 'USD',
         },
         pro_4: {
            amount: 10,
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
         '<p>This replacement battery is what you need to bring that dead smartphone back to life.</p>\n\n<ul><li>This battery is brand new! Each one has been tested to confirm that there are no cycles on the cell and that the capacity is 95% or higher.</li></ul>',
      kitContents: null,
      assemblyContents:
         '<ul><li>New Replacement Battery Compatible with iPhone 6s Plus</li><li>Battery Adhesive Strips</li></ul>',
      note: '<p>For optimal performance, calibrate your newly installed battery: Charge it to 100% and keep charging it for at least 2 more hours. Then use your device until it shuts off due to low battery. Finally, charge it uninterrupted to 100%.</p>',
      disclaimer: null,
      warning:
         '<p><a href="https://mmcelvain.cominor.com/Wiki/What_to_do_with_a_swollen_battery" target="_blank">Learn more</a> about safe lithium-ion battery handling and proper disposal.</p>',
      specifications:
         "<table class='specifications'><tr><th>Part #</th><td>616-00045</td></tr>\n<tr><th>Watt Hours</th><td>10.45 Wh</td></tr>\n<tr><th>Voltage</th><td>3.8 V</td></tr>\n<tr><th>Milliamp Hours</th><td>2750 mAh</td></tr>\n<tr><th>Manufacturer</th><td>Aftermarket</td></tr></table>",
      warranty: 'One year warranty',
      enabled: true,
      disableWhenOOS: false,
      internalDisplayName: 'iPhone 6s Plus Battery / Part and Adhesive',
      shippingRestrictions: ['is_battery'],
      productcode: '315007',
      optionid: '9',
      isDiscounted: false,
      discountPercentage: 0,
      title: 'New / Part Only',
      crossSellVariantIds: [
         'gid://shopify/ProductVariant/39333786746970',
         'gid://shopify/ProductVariant/39333786583130',
      ],
   },
];

export const mockedProduct: Product = {
   __typename: 'Product',
   id: 'gid://shopify/Product/1231231231231',
   title: 'Mocked Product Title',
   handle: 'iphone-6s-plus-replacement-battery',
   noindex: false,
   descriptionHtml:
      '<p>This replacement battery is what you need to bring that dead smartphone back to life.</p>\n\n<ul><li>This battery is brand new! Each one has been tested to confirm that there are no cycles on the cell and that the capacity is 95% or higher.</li></ul>',
   tags: [
      'Apple Device=iPhone',
      'BATTERY',
      'Condition:New',
      'Device Brand:Apple',
      'Device Category:Phone',
      'Device Manufacturer=Apple',
      'Device Type:iPhone',
      'Device Type=Smartphones',
      'Item Type:Batteries',
      'Main Category=Parts',
      'Model Number=A1634',
      'Model Number=A1687',
      'Model=iPhone 6s Plus',
      'OS:iOS',
      'Part',
      'Part or Kit:Fix Kit',
      'Part or Kit:Part Only',
      'Spare Part=Batteries',
      'Version=iPhone Repair Kits',
      'worksin:1059',
   ],
   reviews: {
      rating: 4.8,
      count: 41,
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
         label: 'iPhone',
         url: '/Parts/iPhone',
      },
      {
         label: 'iPhone 6s Plus',
         url: '/Parts/iPhone_6s_Plus',
      },
      {
         label: 'iPhone 6s Plus Battery',
         url: '#',
      },
   ],
   prop65WarningType: 'cancer and birth defects or other reproductive harm',
   prop65Chemicals: 'lead',
   productVideos:
      'https://www.youtube-nocookie.com/embed/4Kskal4s1sU?wmode=opaque',
   compatibility: {
      devices: [
         {
            imageUrl:
               'https://mmcelvain.cominor.com/igi/cMVbyIbIrTEbi2j5.thumbnail',
            deviceUrl: '/Device/iPhone_6s_Plus',
            deviceName: 'iPhone 6s Plus',
            variants: [
               'A1634 US AT&T Locked or SIM Free',
               'A1687 US Sprint/Verizon and Global',
               'A1699 Mainland China',
            ],
         },
      ],
      hasMoreDevices: false,
   },
   compatibilityNotes: null,
   metaTitle: 'iPhone 6s Plus Battery: Replacement Part / Repair Kit',
   shortDescription:
      'A new replacement 2750 mAh battery compatible with the iPhone 6s Plus. 3.80 Volts (V), 10.45 Watt Hours (Wh). This replacement does not require soldering and is compatible with all iPhone 6s Plus models (not iPhone 6, 6 Plus, or 6s).',
   oemPartnership: null,
   images: productImages,
   fallbackImages: [],
   options: [
      {
         id: 'gid://shopify/ProductOption/5958025085018',
         name: 'Condition',
         values: ['New'],
      },
      {
         id: 'gid://shopify/ProductOption/6267341635674',
         name: 'Part or Kit',
         values: ['Fix Kit', 'Part Only'],
      },
   ],
   variants: productVariants,
   isEnabled: true,
   iFixitProductId: 'IF315-007',
   productcode: '315007',
   productVideosJson: null,
   enabledDomains: null,
   vendor: '',
   crossSellVariants: [
      {
         id: 'gid://shopify/ProductVariant/32965720473690',
         sku: 'IF145-257-1',
         quantityAvailable: 186,
         handle: 'anti-static-project-tray',
         title: 'Anti-Static Project Tray',
         variantTitle: null,
         reviews: {
            rating: 4.8,
            count: 273,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30908161917018',
            altText: '*',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/xe2tWdmD14WfKdFS.jpg?v=1642620899',
         },
         price: {
            amount: 4.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 3.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 3.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 3.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 3.99,
               currencyCode: 'USD',
            },
         },
         isPro: false,
         hasLifetimeWarranty: true,
         enabled: true,
         shopifyVariantId: '32965720473690',
      },
      {
         id: 'gid://shopify/ProductVariant/32965720178778',
         sku: 'IF145-307-4',
         quantityAvailable: 607,
         handle: 'pro-tech-toolkit',
         title: 'Pro Tech Toolkit',
         variantTitle: null,
         reviews: {
            rating: 4.9,
            count: 1381,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/31392629260378',
            altText: 'IF145-307-4',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/p1IwUWSyQKngOgFn_0b395d12-94a4-40b6-932e-3cbc60cef003.jpg?v=1660832943',
         },
         price: {
            amount: 74.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 59.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 59.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 59.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 59.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
         enabled: true,
         shopifyVariantId: '32965720178778',
      },
      {
         id: 'gid://shopify/ProductVariant/39333786746970',
         sku: 'IF315-038-1',
         quantityAvailable: 25,
         handle: 'iphone-6s-plus-screen',
         title: 'iPhone 6s Plus Screen',
         variantTitle: null,
         reviews: {
            rating: 4.7,
            count: 27,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/31268982194266',
            altText: 'IF315-038-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/5VOJlrQqeBjCF3nF.jpg?v=1656622264',
         },
         price: {
            amount: 59.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 59.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 59.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 44.82,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 37.92,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
         enabled: true,
         shopifyVariantId: '39333786746970',
      },
      {
         id: 'gid://shopify/ProductVariant/39333786583130',
         sku: 'IF315-049-2',
         quantityAvailable: 46,
         handle: 'iphone-6s-plus-display-assembly-adhesive',
         title: 'iPhone 6s Plus Display Assembly Adhesive',
         variantTitle: null,
         reviews: {
            rating: 4.7,
            count: 20,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30908245409882',
            altText: 'IF315-049-2',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/BBYFChBH3BMOwJvp_6d0c34d9-eb5f-49e8-8c43-3a443b66fa14.jpg?v=1642621670',
         },
         price: {
            amount: 4.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 4.49,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 3.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 1.5,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 0.9,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
         enabled: true,
         shopifyVariantId: '39333786583130',
      },
   ],
   categories: [],
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
               title: 'iPhone 6s Plus Battery Replacement',
               url: '/Guide/iPhone+6s+Plus+Battery+Replacement/51380',
               imageUrl:
                  'https://mmcelvain.cominor.com/igi/LVQpdSdCEY1YxPkM.thumbnail',
               summary: 'Use this guide to bring life back to your...',
               difficulty: 'Moderate',
               timeRequired: '15 - 45 minutes',
            },
         ],
      },
   ],
};

import { CurrencyCode } from '@lib/shopify-storefront-sdk';
import type { FindProductQuery } from '@lib/shopify-storefront-sdk';
import { MenuItemType } from '@ifixit/menu';
import type { ProductSearchHit } from '@models/product-list';
import type { ProductReview } from '@models/product/reviews';
import type {
   Product,
   ProductVariant,
   ProductVariantImage,
} from '@pages/api/nextjs/cache/product';
import type { ProductTemplateProps } from '@templates/product/hooks/useProductTemplateProps';

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
   id: 'gid://shopify/Product/1231231231231',
   title: 'Mocked Product Title',
   handle: 'iphone-6s-plus-replacement-battery',
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
   rating: {
      scale_min: 1.0,
      scale_max: 5.0,
      value: 4.8,
   },
   reviewsCount: 41,
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
   faqs: [],
   prop65WarningType: 'cancer and birth defects or other reproductive harm',
   prop65Chemicals: 'lead',
   productVideos:
      'https://www.youtube-nocookie.com/embed/4Kskal4s1sU?wmode=opaque',
   replacementGuides: [
      {
         id: '0',
         title: 'iPhone 6s Plus Battery Replacement',
         guide_url: '/Guide/iPhone+6s+Plus+Battery+Replacement/51380',
         image_url:
            'https://mmcelvain.cominor.com/igi/LVQpdSdCEY1YxPkM.thumbnail',
         summary: 'Use this guide to bring life back to your...',
         difficulty: 'Moderate',
         time_required: '15 - 45 minutes',
      },
   ],
   featuredProductVariants: [
      {
         id: 'gid://shopify/ProductVariant/32965720178778',
         handle: 'pro-tech-toolkit',
         sku: 'IF145-307-4',
         title: 'Pro Tech Toolkit',
         reviews: {
            rating: 4.9,
            count: 1381,
         },
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
         oemPartnership: null,
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/39443942670426',
         handle: 'essential-electronics-toolkit',
         sku: 'IF145-348-5',
         title: 'Essential Electronics Toolkit',
         reviews: null,
         image: {
            id: 'gid://shopify/ProductImage/30147156082778',
            altText: 'IF145-348-5',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/6JwXuUWvBHYYrIRj_e1a5b3b5-3158-4bf2-bb38-85c53c6c9959.jpg?v=1629216720',
         },
         price: {
            amount: 24.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: null,
         hasLifetimeWarranty: true,
         oemPartnership: null,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965718147162',
         handle: 'iphone-6s-plus-replacement-battery',
         sku: 'IF315-007-10',
         title: 'iPhone 6s Plus Battery',
         reviews: {
            rating: 4.8,
            count: 41,
         },
         image: {
            id: 'gid://shopify/ProductImage/31263941197914',
            altText: 'IF315-007-10',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/WNVDn4lvaMJpK33F.jpg?v=1656545132',
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
         hasLifetimeWarranty: false,
         oemPartnership: null,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965713363034',
         handle: 'iphone-6s-plus-screen',
         sku: 'IF315-038-5',
         title: 'iPhone 6s Plus Screen',
         reviews: {
            rating: 4.7,
            count: 27,
         },
         image: {
            id: 'gid://shopify/ProductImage/31268982063194',
            altText: 'IF315-038-5',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/uvAlGKEBunYYDr3d_64fffe8c-26c4-4ece-ba71-9ee691281f23.jpg?v=1656622264',
         },
         price: {
            amount: 64.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 64.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 64.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 64.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 64.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         oemPartnership: null,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965719359578',
         handle: 'iphone-6s-plus-lightning-connector-and-headphone-jack',
         sku: 'IF315-001-10',
         title: 'iPhone 6s Plus Lightning Connector and Headphone Jack',
         reviews: {
            rating: 5,
            count: 7,
         },
         image: {
            id: 'gid://shopify/ProductImage/30908225880154',
            altText: 'IF315-001-10',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/YxAoEm2PB226SQqA.jpg?v=1642621510',
         },
         price: {
            amount: 29.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
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
         hasLifetimeWarranty: true,
         oemPartnership: null,
         isPro: false,
      },
   ],
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
   metaTitle: 'iPhone 6s Plus Battery: Replacement Part / Repair Kit',
   shortDescription:
      'A new replacement 2750 mAh battery compatible with the iPhone 6s Plus. 3.80 Volts (V), 10.45 Watt Hours (Wh). This replacement does not require soldering and is compatible with all iPhone 6s Plus models (not iPhone 6, 6 Plus, or 6s).',
   oemPartnership: null,
   images: productImages,
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
   enabledDomains: undefined,
   redirectUrl: null,
   vendor: '',
   crossSellVariants: [
      {
         id: 'gid://shopify/ProductVariant/32965720473690',
         sku: 'IF145-257-1',
         quantityAvailable: 186,
         product: {
            handle: 'anti-static-project-tray',
            title: 'Anti-Static Project Tray',
            tags: [
               'Condition:New',
               'ESD-safe:ESD-safe',
               'iFixit Exclusive:iFixit Exclusive',
               'Item Type:SIM',
               'Main Category=Tools',
               'Product Manufacturer=iFixit',
               'Tool',
               'Tool Category (Legacy):ESD Safe',
               'Tool Type=Organization Tools',
            ],
            rating: 4.8,
            reviewsCount: 273,
            oemPartnership: null,
         },
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
         warranty: 'Lifetime Guarantee',
         enabled: true,
      },
      {
         id: 'gid://shopify/ProductVariant/32965720178778',
         sku: 'IF145-307-4',
         quantityAvailable: 607,
         product: {
            handle: 'pro-tech-toolkit',
            title: 'Pro Tech Toolkit',
            tags: [
               'Condition:New',
               'iFixit Exclusive:iFixit Exclusive',
               'Item Type:Kits',
               'Item Type:SIM',
               'Main Category=Tools',
               'Product Manufacturer=iFixit',
               'Profile=Adapter',
               'Profile=Flathead',
               'Profile=Gamebit',
               'Profile=Hex',
               'Profile=iPhone Standoff',
               'Profile=JIS',
               'Profile=Magnetic Pickup',
               'Profile=Nut Driver',
               'Profile=Oval Bit',
               'Profile=Pentalobe',
               'Profile=Phillips',
               'Profile=SIM Eject',
               'Profile=Spanner',
               'Profile=Square',
               'Profile=Torx',
               'Profile=Torx Security',
               'Profile=Tri-point',
               'Profile=Triangle',
               'Screwdriver Type:Interchangeable Bits',
               'Tool',
               'Tool Category (Legacy):Drivers & Wrenches',
               'Tool Type=Toolkits',
            ],
            rating: 4.9,
            reviewsCount: 1381,
            oemPartnership: null,
         },
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
         warranty: 'Lifetime Guarantee',
         enabled: true,
      },
      {
         id: 'gid://shopify/ProductVariant/39333786746970',
         sku: 'IF315-038-1',
         quantityAvailable: 25,
         product: {
            handle: 'iphone-6s-plus-screen',
            title: 'iPhone 6s Plus Screen',
            tags: [
               'Apple Device=iPhone',
               'Condition:New',
               'Device Brand:Apple',
               'Device Category:Phone',
               'Device Manufacturer=Apple',
               'Device Type:iPhone',
               'Device Type=Smartphones',
               'Item Type:Screens',
               'Main Category=Parts',
               'Model Number=A1634',
               'Model Number=A1687',
               'Model=iPhone 6s Plus',
               'OS:iOS',
               'Part',
               'Part or Kit:Fix Kit',
               'Part or Kit:Part Only',
               'Spare Part=Screens',
               'Version=iPhone Repair Kits',
               'worksin:1059',
            ],
            rating: 4.7,
            reviewsCount: 27,
            oemPartnership: null,
         },
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
         warranty: 'Lifetime Warranty',
         enabled: true,
      },
      {
         id: 'gid://shopify/ProductVariant/39333786583130',
         sku: 'IF315-049-2',
         quantityAvailable: 46,
         product: {
            handle: 'iphone-6s-plus-display-assembly-adhesive',
            title: 'iPhone 6s Plus Display Assembly Adhesive',
            tags: [
               'Apple Device=iPhone',
               'Condition:New',
               'Device Brand:Apple',
               'Device Category:Phone',
               'Device Manufacturer=Apple',
               'Device Type:iPhone',
               'Device Type=Smartphones',
               'Item Type:Adhesives',
               'Main Category=Parts',
               'Model Number=A1634',
               'Model Number=A1687',
               'Model=iPhone 6s Plus',
               'OS:iOS',
               'Part',
               'Part or Kit:Part Only',
               'Spare Part=Adhesives',
               'worksin:1059',
            ],
            rating: 4.7,
            reviewsCount: 20,
            oemPartnership: null,
         },
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
         warranty: 'Sold as-is; no refunds or returns',
         enabled: true,
      },
   ],
};

export const mockedProductVariant: ProductVariant = {
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
};

export const mockedProductSearchHit: ProductSearchHit = {
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
   id: 'gid://shopify/Product/6556284026970',
   title: 'Moto G7 Play Battery',
   handle: 'moto-g7-play-replacement-battery',
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
   rating: {
      scale_min: 1.0,
      scale_max: 5.0,
      value: 5.0,
   },
   reviewsCount: 2,
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
   faqs: [],
   prop65WarningType: 'cancer and birth defects or other reproductive harm',
   prop65Chemicals: 'lead',
   productVideos: null,
   productVideosJson: null,
   replacementGuides: [
      {
         id: '0',
         title: 'Motorola Moto G7 Play Battery Replacement',
         guide_url: '/Guide/Motorola+Moto+G7+Play+Battery+Replacement/131323',
         image_url: 'https://www.cominor.com/igi/VccIYuMpooQRd6Od.thumbnail',
         summary: 'This guide will show each detailed step to...',
         difficulty: 'Moderate',
         time_required: '45 - 50 minutes',
      },
   ],
   featuredProductVariants: [
      {
         id: 'gid://shopify/ProductVariant/32965709037658',
         handle: 'moray-driver-kit',
         sku: 'IF145-475-1',
         title: 'Moray Driver Kit',
         reviews: {
            rating: 4.9,
            count: 76,
         },
         image: {
            id: 'gid://shopify/ProductImage/30908170797146',
            altText: 'IF145-475-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/GdLBXgihLH5iFnHZ.jpg?v=1642620989',
         },
         price: {
            amount: 19.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 15.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         oemPartnership: null,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/39443942670426',
         handle: 'essential-electronics-toolkit',
         sku: 'IF145-348-5',
         title: 'Essential Electronics Toolkit',
         reviews: null,
         image: {
            id: 'gid://shopify/ProductImage/30147156082778',
            altText: 'IF145-348-5',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/6JwXuUWvBHYYrIRj_e1a5b3b5-3158-4bf2-bb38-85c53c6c9959.jpg?v=1629216720',
         },
         price: {
            amount: 24.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: null,
         hasLifetimeWarranty: true,
         oemPartnership: null,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965709070426',
         handle: 'minnow-driver-kit',
         sku: 'IF145-474-1',
         title: 'Minnow Driver Kit',
         reviews: {
            rating: 4.9,
            count: 67,
         },
         image: {
            id: 'gid://shopify/ProductImage/30908169715802',
            altText: 'IF145-474-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/5lpZ4dPTlPLT1QrK.jpg?v=1642620980',
         },
         price: {
            amount: 14.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 11.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         oemPartnership: null,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965714182234',
         handle: 'mako-driver-kit-64-precision-bits',
         sku: 'IF145-299-4',
         title: 'Mako Driver Kit - 64 Precision Bits',
         reviews: {
            rating: 4.9,
            count: 430,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/31671538810970',
            altText: 'IF145-299-4',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/PO4uhbYhRmOcWPNV_f3088c21-0731-47f8-8ec6-88e40e7bf9a5.jpg?v=1669759131',
         },
         price: {
            amount: 5.0,
            currencyCode: 'USD',
         },
         compareAtPrice: {
            amount: 55.0,
            currencyCode: 'USD',
         },
         proPricesByTier: {
            pro_1: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 31.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
   ],
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
};

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
   id: 'gid://shopify/Product/6556235071578',
   title: 'Hakko 5B SA Curved Tweezers',
   handle: 'hakko-5b-sa-curved-tweezers',
   descriptionHtml:
      '<p>Very precise fine tipped tweezers for microsoldering and manipulating tiny parts.</p>',
   tags: ['Condition:New', 'Tool', 'Tool Category (Legacy):Soldering & Wiring'],
   rating: {
      scale_min: 1.0,
      scale_max: 5.0,
      value: 5.0,
   },
   reviewsCount: 2,
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
   faqs: [],
   prop65WarningType: null,
   prop65Chemicals: 'none',
   productVideos: null,
   productVideosJson: null,
   replacementGuides: [],
   featuredProductVariants: [
      {
         id: 'gid://shopify/ProductVariant/39443942670426',
         handle: 'essential-electronics-toolkit',
         sku: 'IF145-348-5',
         title: 'Essential Electronics Toolkit',
         reviews: null,
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30147156082778',
            altText: 'IF145-348-5',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/6JwXuUWvBHYYrIRj_e1a5b3b5-3158-4bf2-bb38-85c53c6c9959.jpg?v=1629216720',
         },
         price: {
            amount: 24.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: null,
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965709037658',
         handle: 'moray-driver-kit',
         sku: 'IF145-475-1',
         title: 'Moray Driver Kit',
         reviews: {
            rating: 4.9,
            count: 76,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30908170797146',
            altText: 'IF145-475-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/GdLBXgihLH5iFnHZ.jpg?v=1642620989',
         },
         price: {
            amount: 19.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 15.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965714182234',
         handle: 'mako-driver-kit-64-precision-bits',
         sku: 'IF145-299-4',
         title: 'Mako Driver Kit - 64 Precision Bits',
         reviews: {
            rating: 4.9,
            count: 430,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/31671538810970',
            altText: 'IF145-299-4',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/PO4uhbYhRmOcWPNV_f3088c21-0731-47f8-8ec6-88e40e7bf9a5.jpg?v=1669759131',
         },
         price: {
            amount: 5.0,
            currencyCode: 'USD',
         },
         compareAtPrice: {
            amount: 55.0,
            currencyCode: 'USD',
         },
         proPricesByTier: {
            pro_1: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 31.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965709070426',
         handle: 'minnow-driver-kit',
         sku: 'IF145-474-1',
         title: 'Minnow Driver Kit',
         reviews: {
            rating: 4.9,
            count: 67,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30908169715802',
            altText: 'IF145-474-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/5lpZ4dPTlPLT1QrK.jpg?v=1642620980',
         },
         price: {
            amount: 14.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 11.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
   ],
   compatibility: null,
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
         product: {
            handle: 'hakko-3-sa-tweezers',
            title: 'Hakko 3 SA Tweezers',
            tags: [
               'Condition:New',
               'Tool',
               'Tool Category (Legacy):Soldering & Wiring',
            ],
            rating: 5,
            reviewsCount: 3,
            oemPartnership: null,
         },
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
         warranty: 'One year warranty',
         enabled: true,
      },
   ],
};

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
   rating: {
      scale_min: 1.0,
      scale_max: 5.0,
      value: 5.0,
   },
   reviewsCount: 1,
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
   faqs: [],
   prop65WarningType: 'cancer and birth defects or other reproductive harm',
   prop65Chemicals: 'lead',
   productVideos: null,
   productVideosJson: null,
   replacementGuides: [
      {
         id: '0',
         title: 'Samsung Galaxy A51 Screen Replacement',
         guide_url: '/Guide/Samsung+Galaxy+A51+Screen+Replacement/135277',
         image_url: 'https://www.cominor.com/igi/RH2mIEknySwiMw5Z.thumbnail',
         summary: 'Use this guide to replace a cracked or broken...',
         difficulty: 'Moderate',
         time_required: '1 - 2 hours',
      },
   ],
   featuredProductVariants: [
      {
         id: 'gid://shopify/ProductVariant/39443942670426',
         handle: 'essential-electronics-toolkit',
         sku: 'IF145-348-5',
         title: 'Essential Electronics Toolkit',
         reviews: null,
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30147156082778',
            altText: 'IF145-348-5',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/6JwXuUWvBHYYrIRj_e1a5b3b5-3158-4bf2-bb38-85c53c6c9959.jpg?v=1629216720',
         },
         price: {
            amount: 24.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: null,
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965709070426',
         handle: 'minnow-driver-kit',
         sku: 'IF145-474-1',
         title: 'Minnow Driver Kit',
         reviews: {
            rating: 4.9,
            count: 67,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30908169715802',
            altText: 'IF145-474-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/5lpZ4dPTlPLT1QrK.jpg?v=1642620980',
         },
         price: {
            amount: 14.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 11.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 11.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965714182234',
         handle: 'mako-driver-kit-64-precision-bits',
         sku: 'IF145-299-4',
         title: 'Mako Driver Kit - 64 Precision Bits',
         reviews: {
            rating: 4.9,
            count: 430,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/31671538810970',
            altText: 'IF145-299-4',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/PO4uhbYhRmOcWPNV_f3088c21-0731-47f8-8ec6-88e40e7bf9a5.jpg?v=1669759131',
         },
         price: {
            amount: 5.0,
            currencyCode: 'USD',
         },
         compareAtPrice: {
            amount: 55.0,
            currencyCode: 'USD',
         },
         proPricesByTier: {
            pro_1: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 31.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 31.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
      {
         id: 'gid://shopify/ProductVariant/32965709037658',
         handle: 'moray-driver-kit',
         sku: 'IF145-475-1',
         title: 'Moray Driver Kit',
         reviews: {
            rating: 4.9,
            count: 76,
         },
         oemPartnership: null,
         image: {
            id: 'gid://shopify/ProductImage/30908170797146',
            altText: 'IF145-475-1',
            height: 2000,
            width: 2000,
            url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/GdLBXgihLH5iFnHZ.jpg?v=1642620989',
         },
         price: {
            amount: 19.99,
            currencyCode: 'USD',
         },
         compareAtPrice: null,
         proPricesByTier: {
            pro_1: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_2: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_3: {
               amount: 15.99,
               currencyCode: 'USD',
            },
            pro_4: {
               amount: 15.99,
               currencyCode: 'USD',
            },
         },
         hasLifetimeWarranty: true,
         isPro: false,
      },
   ],
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
};

export const mockedLayoutProps: Pick<ProductTemplateProps, 'layoutProps'> = {
   layoutProps: {
      globalSettings: {
         newsletterForm: {
            title: 'Stay in the loop',
            subtitle: 'Learn something new every month!',
            inputPlaceholder: 'Enter your email',
            callToActionButtonTitle: 'Subscribe',
         },
      },
      currentStore: {
         header: {
            menu: {
               title: 'US Main',
               items: [
                  {
                     type: MenuItemType.Submenu,
                     name: 'Fix Your Stuff',
                     submenu: {
                        title: 'Repair',
                        items: [
                           {
                              type: MenuItemType.Link,
                              name: 'Repair Guides',
                              url: 'https://www.ifixit.com/Guide',
                              description:
                                 'Learn how to fix just about anything with our step-by-step guides.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Answers Forum',
                              url: 'https://www.ifixit.com/Answers',
                              description:
                                 'Share solutions and get help from a friend.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Teardowns',
                              url: 'https://www.ifixit.com/Teardown',
                              description:
                                 'Get a sneak peek inside the latest gadgets.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Blog',
                              url: 'https://www.ifixit.com/News',
                              description:
                                 'Your destination for tech repair news.',
                           },
                        ],
                     },
                  },
                  {
                     type: MenuItemType.Submenu,
                     name: 'Community',
                     submenu: {
                        title: 'Community',
                        items: [
                           {
                              type: MenuItemType.Link,
                              name: 'Get Involved',
                              url: 'https://www.ifixit.com/Community',
                              description:
                                 'Help teach people to make their stuff work again.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Right to Repair',
                              url: 'https://www.ifixit.com/Right-to-Repair',
                              description:
                                 'Learn about the Right to Repair movement and how to be an advocate.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Repairability',
                              url: 'https://www.ifixit.com/Right-to-Repair/Repairable-Products',
                              description:
                                 'Learn why fixable products make sense.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Our Manifesto',
                              url: 'https://www.ifixit.com/Manifesto',
                              description: 'Join the repair revolution!',
                           },
                        ],
                     },
                  },
                  {
                     type: MenuItemType.Submenu,
                     name: 'Store',
                     submenu: {
                        title: 'US Store navigation',
                        items: [
                           {
                              type: MenuItemType.Link,
                              name: 'Featured',
                              url: '/Store',
                              description:
                                 'Quality parts and tools backed by our lifetime guarantee.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Tools',
                              url: '/Tools',
                              description:
                                 'Shop our wide selection of precision tools.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Parts',
                              url: '/Parts',
                              description:
                                 'Shop parts backed by our quality guarantee.',
                           },
                           {
                              type: MenuItemType.Link,
                              name: 'Fix Kits',
                              url: 'https://www.ifixit.com/Kits',
                              description:
                                 'Fix it the easy way with our all-in-one repair kits.',
                           },
                        ],
                     },
                  },
               ],
            },
         },
         footer: {
            partners: {
               title: 'US Partners',
               items: [
                  {
                     type: MenuItemType.ImageLink,
                     name: 'Apple Pay',
                     url: '/cart',
                     image: {
                        alternativeText: 'Apple pay.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Apple_pay_f3880a8a06.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Apple_pay_f3880a8a06.png',
                              name: 'thumbnail_Apple pay.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
                  {
                     type: MenuItemType.ImageLink,
                     name: 'Google Pay',
                     url: '/cart',
                     image: {
                        alternativeText: 'Google pay.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Google_pay_32cd2d40ef.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Google_pay_32cd2d40ef.png',
                              name: 'thumbnail_Google pay.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
                  {
                     type: MenuItemType.ImageLink,
                     name: 'PayPal',
                     url: '/cart',
                     image: {
                        alternativeText: 'Paypal.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Paypal_ae2326b8cd.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Paypal_ae2326b8cd.png',
                              name: 'thumbnail_Paypal.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
                  {
                     type: MenuItemType.ImageLink,
                     name: 'Visa',
                     url: '/cart',
                     image: {
                        alternativeText: 'Visa.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Visa_8931a93403.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Visa_8931a93403.png',
                              name: 'thumbnail_Visa.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
                  {
                     type: MenuItemType.ImageLink,
                     name: 'Mastercard',
                     url: '/cart',
                     image: {
                        alternativeText: 'Mastercard.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Mastercard_bd10aef2e0.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Mastercard_bd10aef2e0.png',
                              name: 'thumbnail_Mastercard.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
                  {
                     type: MenuItemType.ImageLink,
                     name: 'Discover',
                     url: '/cart',
                     image: {
                        alternativeText: 'Discover.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Discover_d997b5ef1e.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Discover_d997b5ef1e.png',
                              name: 'thumbnail_Discover.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
                  {
                     type: MenuItemType.ImageLink,
                     name: 'AMEX',
                     url: '/cart',
                     image: {
                        alternativeText: 'Amex.png',
                        url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/Amex_34591009eb.png',
                        formats: {
                           thumbnail: {
                              url: 'https://ifixit-strapi-uploads.s3.amazonaws.com/thumbnail_Amex_34591009eb.png',
                              name: 'thumbnail_Amex.png',
                              width: 245,
                              height: 98,
                           },
                        },
                     },
                  },
               ],
            },
            bottomMenu: {
               title: 'US Footer bottom',
               items: [
                  {
                     type: MenuItemType.Link,
                     name: 'Licensed under Creative Commons',
                     url: 'https://www.ifixit.com/Info/Licensing',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Privacy',
                     url: 'https://www.ifixit.com/Info/Privacy',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Legal',
                     url: 'https://www.ifixit.com/Info/Terms_of_Use',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Accessibility',
                     url: 'https://www.ifixit.com/Info/Accessibility',
                     description: null,
                  },
               ],
            },
            menu1: {
               title: 'iFixit',
               items: [
                  {
                     type: MenuItemType.Link,
                     name: 'About Us',
                     url: 'https://www.ifixit.com/Info/index',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Customer Support',
                     url: 'https://help.ifixit.com/',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Careers',
                     url: 'https://www.ifixit.com/Info/jobs',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Feedback',
                     url: 'https://meta.ifixit.com/',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Newsletter',
                     url: 'https://www.ifixit.com/Newsletter',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'API',
                     url: 'https://www.ifixit.com/api/2.0/doc',
                     description: null,
                  },
               ],
            },
            menu2: {
               title: 'Resources',
               items: [
                  {
                     type: MenuItemType.Link,
                     name: 'Press',
                     url: 'https://www.ifixit.com/Info/Media',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'News',
                     url: 'https://www.ifixit.com/News/all-categories',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Participate',
                     url: 'https://www.ifixit.com/Participate',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Pro Wholesale',
                     url: 'https://pro.ifixit.com',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Retail Locator',
                     url: 'https://www.ifixit.com/Retail',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'For Manufacturers',
                     url: 'https://www.ifixit.com/services',
                     description: null,
                  },
               ],
            },
            menu3: {
               title: 'Legal',
               items: [
                  {
                     type: MenuItemType.Link,
                     name: 'Accessibility',
                     url: 'https://www.ifixit.com/Info/Accessibility',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Privacy',
                     url: 'https://www.ifixit.com/Info/Privacy',
                     description: null,
                  },
                  {
                     type: MenuItemType.Link,
                     name: 'Terms',
                     url: 'https://www.ifixit.com/Info/Terms_of_Use',
                     description: null,
                  },
               ],
            },
         },
         socialMediaAccounts: {
            twitter: 'https://twitter.com/ifixit',
            tiktok: null,
            facebook: 'https://www.facebook.com/iFixit/',
            instagram: 'https://www.instagram.com/ifixit/',
            youtube: 'https://www.youtube.com/user/iFixitYourself',
            repairOrg: 'https://www.repair.org/',
         },
      },
      shopifyCredentials: {
         storefrontDomain: 'store.cominor.com',
         storefrontAccessToken: '',
      },
      stores: [
         {
            code: 'us',
            name: 'United States',
            url: 'https://www.ifixit.com/products/iphone-6s-plus-replacement-battery',
            currency: 'USD',
         },
         {
            code: 'eu',
            name: 'Europe',
            url: 'https://eustore.ifixit.com/products/iphone-6s-plus-replacement-battery',
            currency: 'EUR',
         },
         {
            code: 'test',
            name: 'Test',
            url: 'https://www.cominor.com/products/iphone-6s-plus-replacement-battery',
            currency: 'USD',
         },
      ],
   },
};

export const mockedReviews: ProductReview[] = [
   {
      reviewid: 37443,
      rating: 5,
      headline: 'Cool and useful at the same time',
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'As advertised and solved our problem.',
      date: '<time   title="Thu, 03 Nov 2022 04:19:46 -0700" datetime="2022-11-03T04:19:46-07:00">Nov 3, 2022</time>',
      created_date: 1667474386,
      modified_date: 1667474465,
      langid: 'en',
      author: {
         userid: 3081773,
         name: 'MARVIN STABLER',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-9.thumbnail',
         url: 'https://www.cominor.com/User/3081773/MARVIN+STABLER',
         canEdit: true,
      },
   },
   {
      reviewid: 37196,
      rating: 5,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'Absolutely amazing very hopeful for cleaning',
      date: '<time   title="Mon, 17 Oct 2022 05:33:22 -0700" datetime="2022-10-17T05:33:22-07:00">Oct 17, 2022</time>',
      created_date: 1666010002,
      modified_date: 1666010027,
      langid: 'en',
      author: {
         userid: 4188334,
         name: 'Tristan Johnson',
         avatar: 'https://www.cominor.com/igi/WAEVRfFYkudpZf61.thumbnail',
         url: 'https://www.cominor.com/User/4188334/Tristan+Johnson',
         canEdit: true,
      },
   },
   {
      reviewid: 35622,
      rating: 4,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'Gives you a lot of the necessities you would need to give items you are repairing a nice cleaning',
      date: '<time   title="Fri, 24 Jun 2022 07:51:29 -0700" datetime="2022-06-24T07:51:29-07:00">Jun 24, 2022</time>',
      created_date: 1656082289,
      modified_date: 1656082657,
      langid: 'en',
      author: {
         userid: 4145501,
         name: 'Quin',
         avatar: 'https://www.cominor.com/igi/m2cwXWJISrPR1k6T.thumbnail',
         url: 'https://www.cominor.com/User/4145501/Quin',
         canEdit: true,
      },
   },
   {
      reviewid: 37335,
      rating: 4,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: 'Amazing product',
      date: '<time   title="Wed, 26 Oct 2022 11:15:54 -0700" datetime="2022-10-26T11:15:54-07:00">Oct 26, 2022</time>',
      created_date: 1666808154,
      modified_date: 1666808154,
      langid: undefined,
      author: {
         userid: 4201790,
         name: 'donald perez',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-5.thumbnail',
         url: 'https://www.cominor.com/User/4201790/donald+perez',
         canEdit: true,
      },
   },
   {
      reviewid: 37175,
      rating: 4,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: undefined,
      date: '<time   title="Wed, 12 Oct 2022 15:28:05 -0700" datetime="2022-10-12T15:28:05-07:00">Oct 12, 2022</time>',
      created_date: 1665613685,
      modified_date: 1665613685,
      langid: undefined,
      author: {
         userid: 4174587,
         name: 'Mariano',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-9.thumbnail',
         url: 'https://www.cominor.com/User/4174587/Mariano',
         canEdit: true,
      },
   },
   {
      reviewid: 36735,
      rating: 5,
      headline: null,
      productName: 'Precision Cleaning Kit',
      productVariantName: 'New',
      body: undefined,
      date: '<time   title="Sat, 10 Sep 2022 10:34:03 -0700" datetime="2022-09-10T10:34:03-07:00">Sep 10, 2022</time>',
      created_date: 1662831243,
      modified_date: 1662831243,
      langid: undefined,
      author: {
         userid: 4181048,
         name: 'Melissa Goodwin',
         avatar:
            'https://www.cominor.com/static/images/avatars/User/ifixit/avatar-2.thumbnail',
         url: 'https://www.cominor.com/User/4181048/Melissa+Goodwin',
         canEdit: true,
      },
   },
];

export const mockedProductQuery: FindProductQuery = {
   product: {
      id: 'gid://shopify/Product/4562303156314',
      title: 'iPhone 6s Plus Battery',
      handle: 'iphone-6s-plus-replacement-battery',
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
      rating: {
         value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.8"}',
      },
      reviewsCount: {
         value: '231',
      },
      breadcrumbs: {
         value: '[{"label":"Home","url":"/Store"},{"label":"Parts","url":"/Parts"},{"label":"Electronics","url":"/Parts/Electronics"},{"label":"iPhone","url":"/Parts/iPhone"},{"label":"iPhone 6s Plus","url":"/Parts/iPhone_6s_Plus"}]',
      },
      faqs: null,
      prop65WarningType: {
         value: 'cancer and birth defects or other reproductive harm',
      },
      prop65Chemicals: {
         value: 'lead',
      },
      productVideos: {
         value: 'https://www.youtube-nocookie.com/embed/4Kskal4s1sU?wmode=opaque',
      },
      replacementGuides: {
         value: '[{"title":"iPhone 6s Plus Battery Replacement","guide_url":"/Guide/iPhone+6s+Plus+Battery+Replacement/51380","image_url":"https://mmcelvain.cominor.com/igi/LVQpdSdCEY1YxPkM.thumbnail","summary":"Use this guide to bring life back to your...","difficulty":"Moderate","time_required":"15 - 45 minutes"}]',
      },
      featuredProductVariants: {
         references: {
            nodes: [
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965714182234',
                  sku: 'IF145-299-4',
                  quantityAvailable: 3536,
                  product: {
                     handle: 'mako-driver-kit-64-precision-bits',
                     title: 'Mako Driver Kit - 64 Precision Bits',
                     tags: [
                        'Condition:New',
                        'iFixit Exclusive:iFixit Exclusive',
                        'Item Type:Kits',
                        'Item Type:SIM',
                        'Main Category=Tools',
                        'Product Manufacturer=iFixit',
                        'Profile=Adapter',
                        'Profile=Flathead',
                        'Profile=Gamebit',
                        'Profile=Hex',
                        'Profile=iPhone Standoff',
                        'Profile=JIS',
                        'Profile=Magnetic Pickup',
                        'Profile=Nut Driver',
                        'Profile=Oval Bit',
                        'Profile=Pentalobe',
                        'Profile=Phillips',
                        'Profile=SIM Eject',
                        'Profile=Spanner',
                        'Profile=Square',
                        'Profile=Torx',
                        'Profile=Torx Security',
                        'Profile=Tri-point',
                        'Profile=Triangle',
                        'Screwdriver Type:Interchangeable Bits',
                        'Tool',
                        'Tool Category (Legacy):Drivers & Wrenches',
                        'Tool Type=Toolkits',
                     ],
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.9"}',
                     },
                     reviewsCount: {
                        value: '430',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/31671538810970',
                     altText: 'IF145-299-4',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/PO4uhbYhRmOcWPNV_f3088c21-0731-47f8-8ec6-88e40e7bf9a5.jpg?v=1669759131',
                  },
                  price: {
                     amount: '5.0',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: {
                     amount: '55.0',
                     currencyCode: CurrencyCode.Usd,
                  },
                  proPricesByTier: {
                     value: '{"pro_1":31.99,"pro_2":31.99,"pro_3":31.99,"pro_4":31.99}',
                  },
                  warranty: {
                     value: 'Lifetime Guarantee',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965720178778',
                  sku: 'IF145-307-4',
                  quantityAvailable: 1002,
                  product: {
                     handle: 'pro-tech-toolkit',
                     title: 'Pro Tech Toolkit',
                     tags: [
                        'Condition:New',
                        'iFixit Exclusive:iFixit Exclusive',
                        'Item Type:Kits',
                        'Item Type:SIM',
                        'Main Category=Tools',
                        'Product Manufacturer=iFixit',
                        'Profile=Adapter',
                        'Profile=Flathead',
                        'Profile=Gamebit',
                        'Profile=Hex',
                        'Profile=iPhone Standoff',
                        'Profile=JIS',
                        'Profile=Magnetic Pickup',
                        'Profile=Nut Driver',
                        'Profile=Oval Bit',
                        'Profile=Pentalobe',
                        'Profile=Phillips',
                        'Profile=SIM Eject',
                        'Profile=Spanner',
                        'Profile=Square',
                        'Profile=Torx',
                        'Profile=Torx Security',
                        'Profile=Tri-point',
                        'Profile=Triangle',
                        'Screwdriver Type:Interchangeable Bits',
                        'Tool',
                        'Tool Category (Legacy):Drivers & Wrenches',
                        'Tool Type=Toolkits',
                     ],
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.9"}',
                     },
                     reviewsCount: {
                        value: '1470',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/31674254884954',
                     altText: 'IF145-307-4',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/p1IwUWSyQKngOgFn_1a1db931-d7d8-4bec-a8ef-739ed6bcba78.jpg?v=1670274750',
                  },
                  price: {
                     amount: '74.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: null,
                  proPricesByTier: {
                     value: '{"pro_1":59.99,"pro_2":59.99,"pro_3":59.99,"pro_4":59.99}',
                  },
                  warranty: {
                     value: 'Lifetime Guarantee',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/39443942670426',
                  sku: 'IF145-348-5',
                  quantityAvailable: 676,
                  product: {
                     handle: 'essential-electronics-toolkit',
                     title: 'Essential Electronics Toolkit',
                     tags: [
                        'iFixit Exclusive:iFixit Exclusive',
                        'Item Type:Kits',
                        'Item Type:SIM',
                        'Manufacturer=iFixit',
                        'SCHUON',
                        'Screwdriver Type:Interchangeable Bits',
                        'Tool',
                        'Tool Category:Drivers & Wrenches',
                        'Type=Toolkits',
                     ],
                     rating: null,
                     reviewsCount: null,
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/30147156082778',
                     altText: 'IF145-348-5',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/6JwXuUWvBHYYrIRj_e1a5b3b5-3158-4bf2-bb38-85c53c6c9959.jpg?v=1629216720',
                  },
                  price: {
                     amount: '24.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: null,
                  proPricesByTier: null,
                  warranty: {
                     value: 'Lifetime Warranty',
                  },
                  enabled: null,
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965709070426',
                  sku: 'IF145-474-1',
                  quantityAvailable: 354,
                  product: {
                     handle: 'minnow-driver-kit',
                     title: 'Minnow Driver Kit',
                     tags: [
                        'Condition:New',
                        'iFixit Exclusive:iFixit Exclusive',
                        'Item Type:Kits',
                        'Item Type:SIM',
                        'Main Category=Tools',
                        'Product Manufacturer=iFixit',
                        'Profile=Flathead',
                        'Profile=iPhone Standoff',
                        'Profile=Pentalobe',
                        'Profile=Phillips',
                        'Profile=Torx',
                        'Profile=Torx Security',
                        'Profile=Tri-point',
                        'Screwdriver Type:Interchangeable Bits',
                        'Tool',
                        'Tool Category (Legacy):Drivers & Wrenches',
                        'Tool Type=Toolkits',
                     ],
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.9"}',
                     },
                     reviewsCount: {
                        value: '67',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/30908169715802',
                     altText: 'IF145-474-1',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/5lpZ4dPTlPLT1QrK.jpg?v=1642620980',
                  },
                  price: {
                     amount: '14.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: null,
                  proPricesByTier: {
                     value: '{"pro_1":11.99,"pro_2":11.99,"pro_3":11.99,"pro_4":11.99}',
                  },
                  warranty: {
                     value: 'Lifetime Guarantee',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965709037658',
                  sku: 'IF145-475-1',
                  quantityAvailable: 3742,
                  product: {
                     handle: 'moray-driver-kit',
                     title: 'Moray Driver Kit',
                     tags: [
                        'Condition:New',
                        'iFixit Exclusive:iFixit Exclusive',
                        'Item Type:Kits',
                        'Item Type:SIM',
                        'Main Category=Tools',
                        'Product Manufacturer=iFixit',
                        'Profile=Flathead',
                        'Profile=Gamebit',
                        'Profile=Hex',
                        'Profile=iPhone Standoff',
                        'Profile=Nut Driver',
                        'Profile=Pentalobe',
                        'Profile=Phillips',
                        'Profile=Torx',
                        'Profile=Torx Security',
                        'Profile=Tri-point',
                        'Profile=Triangle',
                        'Screwdriver Type:Interchangeable Bits',
                        'Tool',
                        'Tool Category (Legacy):Drivers & Wrenches',
                        'Tool Type=Toolkits',
                     ],
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.9"}',
                     },
                     reviewsCount: {
                        value: '76',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/30908170797146',
                     altText: 'IF145-475-1',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/GdLBXgihLH5iFnHZ.jpg?v=1642620989',
                  },
                  price: {
                     amount: '19.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: null,
                  proPricesByTier: {
                     value: '{"pro_1":15.99,"pro_2":15.99,"pro_3":15.99,"pro_4":15.99}',
                  },
                  warranty: {
                     value: 'Lifetime Guarantee',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965719359578',
                  sku: 'IF315-001-10',
                  quantityAvailable: 24,
                  product: {
                     handle:
                        'iphone-6s-plus-lightning-connector-and-headphone-jack',
                     title: 'iPhone 6s Plus Lightning Connector and Headphone Jack',
                     tags: [
                        'Apple Device=iPhone',
                        'Condition:New',
                        'Condition:Used',
                        'Device Brand:Apple',
                        'Device Category:Phone',
                        'Device Manufacturer=Apple',
                        'Device Type:iPhone',
                        'Device Type=Smartphones',
                        'Item Type:Cables',
                        'Item Type:Headphone Jacks',
                        'Main Category=Parts',
                        'Model Number=A1634',
                        'Model Number=A1687',
                        'Model=iPhone 6s Plus',
                        'OS:iOS',
                        'Part',
                        'Part or Kit:Fix Kit',
                        'Part or Kit:Part Only',
                        'Spare Part=Cables',
                        'Spare Part=Ports',
                        'Version=iPhone Repair Kits',
                        'worksin:1059',
                     ],
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.8"}',
                     },
                     reviewsCount: {
                        value: '26',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/30908225880154',
                     altText: 'IF315-001-10',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/YxAoEm2PB226SQqA.jpg?v=1642621510',
                  },
                  price: {
                     amount: ' 29.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: null,
                  proPricesByTier: {
                     value: '{"pro_1":29.99,"pro_2":29.99,"pro_3":29.99,"pro_4":29.99}',
                  },
                  warranty: {
                     value: 'Lifetime Guarantee',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965718147162',
                  sku: 'IF315-007-10',
                  quantityAvailable: 67,
                  product: {
                     handle: 'iphone-6s-plus-replacement-battery',
                     title: 'iPhone 6s Plus Battery',
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
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.8"}',
                     },
                     reviewsCount: {
                        value: '231',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/31263941197914',
                     altText: 'IF315-007-10',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/WNVDn4lvaMJpK33F.jpg?v=1656545132',
                  },
                  price: {
                     amount: '23.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: {
                     amount: '29.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  proPricesByTier: {
                     value: '{"pro_1":29.99,"pro_2":29.99,"pro_3":29.99,"pro_4":29.99}',
                  },
                  warranty: {
                     value: 'One year warranty',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
               {
                  __typename: 'ProductVariant',
                  id: 'gid://shopify/ProductVariant/32965713363034',
                  sku: 'IF315-038-5',
                  quantityAvailable: 20,
                  product: {
                     handle: 'iphone-6s-plus-screen',
                     title: 'iPhone 6s Plus Screen',
                     tags: [
                        'Apple Device=iPhone',
                        'Condition:New',
                        'Device Brand:Apple',
                        'Device Category:Phone',
                        'Device Manufacturer=Apple',
                        'Device Type:iPhone',
                        'Device Type=Smartphones',
                        'Item Type:Screens',
                        'Main Category=Parts',
                        'Model Number=A1634',
                        'Model Number=A1687',
                        'Model=iPhone 6s Plus',
                        'OS:iOS',
                        'Part',
                        'Part or Kit:Fix Kit',
                        'Part or Kit:Part Only',
                        'Spare Part=Screens',
                        'Version=iPhone Repair Kits',
                        'worksin:1059',
                     ],
                     rating: {
                        value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.8"}',
                     },
                     reviewsCount: {
                        value: '116',
                     },
                     oemPartnership: null,
                  },
                  image: {
                     id: 'gid://shopify/ProductImage/31268982063194',
                     altText: 'IF315-038-5',
                     height: 2000,
                     width: 2000,
                     url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/uvAlGKEBunYYDr3d_64fffe8c-26c4-4ece-ba71-9ee691281f23.jpg?v=1656622264',
                  },
                  price: {
                     amount: '64.99',
                     currencyCode: CurrencyCode.Usd,
                  },
                  compareAtPrice: null,
                  proPricesByTier: {
                     value: '{"pro_1":64.99,"pro_2":64.99,"pro_3":64.99,"pro_4":64.99}',
                  },
                  warranty: {
                     value: 'Lifetime Guarantee',
                  },
                  enabled: {
                     value: 'true',
                  },
               },
            ],
         },
      },
      compatibility: {
         value: '{"devices":[{"imageUrl":"https://mmcelvain.cominor.com/igi/cMVbyIbIrTEbi2j5.thumbnail","deviceUrl":"/Device/iPhone_6s_Plus","deviceName":"iPhone 6s Plus","variants":["A1634 US AT&T Locked or SIM Free","A1687 US Sprint/Verizon and Global","A1699 Mainland China"]}],"hasMoreDevices":false}',
      },
      metaTitle: {
         value: 'iPhone 6s Plus Battery: Replacement Part / Repair Kit',
      },
      shortDescription: {
         value: 'A new replacement 2750 mAh battery compatible with the iPhone 6s Plus. 3.80 Volts (V), 10.45 Watt Hours (Wh). This replacement does not require soldering and is compatible with all iPhone 6s Plus models (not iPhone 6, 6 Plus, or 6s).',
      },
      oemPartnership: null,
      images: {
         nodes: [
            {
               id: 'gid://shopify/ProductImage/31263941197914',
               altText: 'IF315-007-10',
               height: 2000,
               width: 2000,
               url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/WNVDn4lvaMJpK33F.jpg?v=1656545132',
            },
            {
               id: 'gid://shopify/ProductImage/31263941230682',
               altText: 'IF315-007-9',
               height: 2000,
               width: 2000,
               url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/RIvaaHOkDZJTBCBM_6b73f13e-f9b2-4eee-887f-b699cfb66f29.jpg?v=1656545132',
            },
            {
               id: 'gid://shopify/ProductImage/31263941263450',
               altText: 'IF315-007-9',
               height: 2000,
               width: 2000,
               url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/Z1Bdx4Xp52FOXtG2_e21190de-41a3-4952-9df0-f1630410dbae.jpg?v=1656545132',
            },
         ],
      },
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
      variants: {
         nodes: [
            {
               id: 'gid://shopify/ProductVariant/32965718147162',
               title: 'New / Fix Kit',
               sku: 'IF315-007-10',
               quantityAvailable: 3,
               image: {
                  id: 'gid://shopify/ProductImage/31263941197914',
                  altText: 'IF315-007-10',
                  height: 2000,
                  width: 2000,
                  url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/WNVDn4lvaMJpK33F.jpg?v=1656545132',
               },
               price: {
                  amount: '23.99',
                  currencyCode: CurrencyCode.Usd,
               },
               compareAtPrice: {
                  amount: '29.99',
                  currencyCode: CurrencyCode.Usd,
               },
               proPricesByTier: {
                  value: '{"pro_1":29.99,"pro_2":29.99,"pro_3":29.99,"pro_4":29.99}',
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
               description: {
                  value: '<p>This replacement battery is what you need to bring that dead smartphone back to life. The Fix Kit includes everything you need to swap in a new replacement battery.</p>\n\n<ul><li>This battery is brand new! Each one has been tested to confirm that there are no cycles on the cell and that the capacity is 95% or higher.</li><li>Make disassembly for future repairs easier, replace your pentalobe bottom screws with the Phillips screws included in the kit.</li></ul>',
               },
               kitContents: {
                  value: '<ul><li>New Replacement Battery Compatible with iPhone 6s Plus with Adhesive Strips Preinstalled</li><li><a href="https://mmcelvain.cominor.com/products/iphone-6s-plus-display-assembly-adhesive">iPhone 6s Plus Display Assembly Adhesive</a></li><li><a href="https://mmcelvain.cominor.com/products/spudger">Spudger</a></li><li><a href="https://mmcelvain.cominor.com/products/suction-handle">Suction Handle</a></li><li><a href="https://mmcelvain.cominor.com/products/tweezers">Tweezers / Angled / Pro / ESD</a></li><li><a href="https://mmcelvain.cominor.com/products/ifixit-opening-tool">iFixit Opening Tool</a></li><li>Replacement Phillips Bottom Screws</li><li><a href="https://mmcelvain.cominor.com/products/ifixit-precision-bit-driver">Precision Bit Driver</a></li><li><a href="https://mmcelvain.cominor.com/products/ifixit-precision-4-mm-screwdriver-bit">4 mm Precision Bits</a>:<ul><li>Phillips #000</li><li>Pentalobe P2</li><li>Tri-point Y000</li></ul></li></ul>',
               },
               assemblyContents: null,
               note: {
                  value: '<p>For optimal performance, calibrate your newly installed battery: Charge it to 100% and keep charging it for at least 2 more hours. Then use your device until it shuts off due to low battery. Finally, charge it uninterrupted to 100%.</p>',
               },
               disclaimer: {
                  value: '<p>While not necessary, some fixers prefer to use additional tools to accomplish this repair: <a href="https://mmcelvain.cominor.com/products/iopener">iOpener</a> and <a href="https://mmcelvain.cominor.com/products/plastic-cards">Plastic Card</a>.</p>',
               },
               warning: {
                  value: '<p><a href="https://mmcelvain.cominor.com/Wiki/What_to_do_with_a_swollen_battery" target="_blank">Learn more</a> about safe lithium-ion battery handling and proper disposal.</p>',
               },
               specifications: {
                  value: "<table class='specifications'><tr><th>Part #</th><td>616-00045</td></tr>\n<tr><th>Watt Hours</th><td>10.45 Wh</td></tr>\n<tr><th>Voltage</th><td>3.8 V</td></tr>\n<tr><th>Milliamp Hours</th><td>2750 mAh</td></tr>\n<tr><th>Manufacturer</th><td>Aftermarket</td></tr></table>",
               },
               warranty: {
                  value: 'One year warranty',
               },
               enabled: {
                  value: 'true',
               },
               disableWhenOOS: {
                  value: 'false',
               },
               crossSell: {
                  references: {
                     nodes: [
                        {
                           __typename: 'ProductVariant',
                           id: 'gid://shopify/ProductVariant/32965720473690',
                           sku: 'IF145-257-1',
                           quantityAvailable: 261,
                           product: {
                              handle: 'anti-static-project-tray',
                              title: 'Anti-Static Project Tray',
                              tags: [
                                 'Condition:New',
                                 'ESD-safe:ESD-safe',
                                 'iFixit Exclusive:iFixit Exclusive',
                                 'Item Type:SIM',
                                 'Main Category=Tools',
                                 'Product Manufacturer=iFixit',
                                 'Tool',
                                 'Tool Category (Legacy):ESD Safe',
                                 'Tool Type=Organization Tools',
                              ],
                              rating: {
                                 value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.8"}',
                              },
                              reviewsCount: {
                                 value: '273',
                              },
                              oemPartnership: null,
                           },
                           image: {
                              id: 'gid://shopify/ProductImage/31676200616026',
                              altText: '*',
                              height: 2000,
                              width: 2000,
                              url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/xe2tWdmD14WfKdFS_86300a0a-2151-4f54-83df-378d583824df.jpg?v=1670617187',
                           },
                           price: {
                              amount: '4.99',
                              currencyCode: CurrencyCode.Usd,
                           },
                           compareAtPrice: null,
                           proPricesByTier: {
                              value: '{"pro_1":3.99,"pro_2":3.99,"pro_3":3.99,"pro_4":3.99}',
                           },
                           warranty: {
                              value: 'Lifetime Guarantee',
                           },
                           enabled: {
                              value: 'true',
                           },
                        },
                        {
                           __typename: 'ProductVariant',
                           id: 'gid://shopify/ProductVariant/32965720178778',
                           sku: 'IF145-307-4',
                           quantityAvailable: 1002,
                           product: {
                              handle: 'pro-tech-toolkit',
                              title: 'Pro Tech Toolkit',
                              tags: [
                                 'Condition:New',
                                 'iFixit Exclusive:iFixit Exclusive',
                                 'Item Type:Kits',
                                 'Item Type:SIM',
                                 'Main Category=Tools',
                                 'Product Manufacturer=iFixit',
                                 'Profile=Adapter',
                                 'Profile=Flathead',
                                 'Profile=Gamebit',
                                 'Profile=Hex',
                                 'Profile=iPhone Standoff',
                                 'Profile=JIS',
                                 'Profile=Magnetic Pickup',
                                 'Profile=Nut Driver',
                                 'Profile=Oval Bit',
                                 'Profile=Pentalobe',
                                 'Profile=Phillips',
                                 'Profile=SIM Eject',
                                 'Profile=Spanner',
                                 'Profile=Square',
                                 'Profile=Torx',
                                 'Profile=Torx Security',
                                 'Profile=Tri-point',
                                 'Profile=Triangle',
                                 'Screwdriver Type:Interchangeable Bits',
                                 'Tool',
                                 'Tool Category (Legacy):Drivers & Wrenches',
                                 'Tool Type=Toolkits',
                              ],
                              rating: {
                                 value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.9"}',
                              },
                              reviewsCount: {
                                 value: '1470',
                              },
                              oemPartnership: null,
                           },
                           image: {
                              id: 'gid://shopify/ProductImage/31674254884954',
                              altText: 'IF145-307-4',
                              height: 2000,
                              width: 2000,
                              url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/p1IwUWSyQKngOgFn_1a1db931-d7d8-4bec-a8ef-739ed6bcba78.jpg?v=1670274750',
                           },
                           price: {
                              amount: '74.99',
                              currencyCode: CurrencyCode.Usd,
                           },
                           compareAtPrice: null,
                           proPricesByTier: {
                              value: '{"pro_1":59.99,"pro_2":59.99,"pro_3":59.99,"pro_4":59.99}',
                           },
                           warranty: {
                              value: 'Lifetime Guarantee',
                           },
                           enabled: {
                              value: 'true',
                           },
                        },
                     ],
                  },
               },
               internalDisplayName: {
                  value: 'iPhone 6s Plus Battery / Fix Kit with Adhesive',
               },
               shippingRestrictions: {
                  value: '["is_battery"]',
               },
            },
            {
               id: 'gid://shopify/ProductVariant/32965718179930',
               title: 'New / Part Only',
               sku: 'IF315-007-9',
               quantityAvailable: 42,
               image: {
                  id: 'gid://shopify/ProductImage/31263941230682',
                  altText: 'IF315-007-9',
                  height: 2000,
                  width: 2000,
                  url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/RIvaaHOkDZJTBCBM_6b73f13e-f9b2-4eee-887f-b699cfb66f29.jpg?v=1656545132',
               },
               price: {
                  amount: '24.99',
                  currencyCode: CurrencyCode.Usd,
               },
               compareAtPrice: null,
               proPricesByTier: {
                  value: '{"pro_1":23.33,"pro_2":17.5,"pro_3":11,"pro_4":10}',
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
               description: {
                  value: '<p>This replacement battery is what you need to bring that dead smartphone back to life.</p>\n\n<ul><li>This battery is brand new! Each one has been tested to confirm that there are no cycles on the cell and that the capacity is 95% or higher.</li></ul>',
               },
               kitContents: null,
               assemblyContents: {
                  value: '<ul><li>New Replacement Battery Compatible with iPhone 6s Plus</li><li>Battery Adhesive Strips</li></ul>',
               },
               note: {
                  value: '<p>For optimal performance, calibrate your newly installed battery: Charge it to 100% and keep charging it for at least 2 more hours. Then use your device until it shuts off due to low battery. Finally, charge it uninterrupted to 100%.</p>',
               },
               disclaimer: null,
               warning: {
                  value: '<p><a href="https://mmcelvain.cominor.com/Wiki/What_to_do_with_a_swollen_battery" target="_blank">Learn more</a> about safe lithium-ion battery handling and proper disposal.</p>',
               },
               specifications: {
                  value: "<table class='specifications'><tr><th>Part #</th><td>616-00045</td></tr>\n<tr><th>Watt Hours</th><td>10.45 Wh</td></tr>\n<tr><th>Voltage</th><td>3.8 V</td></tr>\n<tr><th>Milliamp Hours</th><td>2750 mAh</td></tr>\n<tr><th>Manufacturer</th><td>Aftermarket</td></tr></table>",
               },
               warranty: {
                  value: 'One year warranty',
               },
               enabled: {
                  value: 'true',
               },
               disableWhenOOS: {
                  value: 'false',
               },
               crossSell: {
                  references: {
                     nodes: [
                        {
                           __typename: 'ProductVariant',
                           id: 'gid://shopify/ProductVariant/39333786746970',
                           sku: 'IF315-038-1',
                           quantityAvailable: 25,
                           product: {
                              handle: 'iphone-6s-plus-screen',
                              title: 'iPhone 6s Plus Screen',
                              tags: [
                                 'Apple Device=iPhone',
                                 'Condition:New',
                                 'Device Brand:Apple',
                                 'Device Category:Phone',
                                 'Device Manufacturer=Apple',
                                 'Device Type:iPhone',
                                 'Device Type=Smartphones',
                                 'Item Type:Screens',
                                 'Main Category=Parts',
                                 'Model Number=A1634',
                                 'Model Number=A1687',
                                 'Model=iPhone 6s Plus',
                                 'OS:iOS',
                                 'Part',
                                 'Part or Kit:Fix Kit',
                                 'Part or Kit:Part Only',
                                 'Spare Part=Screens',
                                 'Version=iPhone Repair Kits',
                                 'worksin:1059',
                              ],
                              rating: {
                                 value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.8"}',
                              },
                              reviewsCount: {
                                 value: '116',
                              },
                              oemPartnership: null,
                           },
                           image: {
                              id: 'gid://shopify/ProductImage/31268982194266',
                              altText: 'IF315-038-1',
                              height: 2000,
                              width: 2000,
                              url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/5VOJlrQqeBjCF3nF.jpg?v=1656622264',
                           },
                           price: {
                              amount: '59.99',
                              currencyCode: CurrencyCode.Usd,
                           },
                           compareAtPrice: null,
                           proPricesByTier: {
                              value: '{"pro_1":59.99,"pro_2":59.99,"pro_3":44.82,"pro_4":37.92}',
                           },
                           warranty: {
                              value: 'Lifetime Guarantee',
                           },
                           enabled: {
                              value: 'true',
                           },
                        },
                        {
                           __typename: 'ProductVariant',
                           id: 'gid://shopify/ProductVariant/39333786583130',
                           sku: 'IF315-049-2',
                           quantityAvailable: 46,
                           product: {
                              handle:
                                 'iphone-6s-plus-display-assembly-adhesive',
                              title: 'iPhone 6s Plus Display Assembly Adhesive',
                              tags: [
                                 'Apple Device=iPhone',
                                 'Condition:New',
                                 'Device Brand:Apple',
                                 'Device Category:Phone',
                                 'Device Manufacturer=Apple',
                                 'Device Type:iPhone',
                                 'Device Type=Smartphones',
                                 'Item Type:Adhesives',
                                 'Main Category=Parts',
                                 'Model Number=A1634',
                                 'Model Number=A1687',
                                 'Model=iPhone 6s Plus',
                                 'OS:iOS',
                                 'Part',
                                 'Part or Kit:Part Only',
                                 'Spare Part=Adhesives',
                                 'worksin:1059',
                              ],
                              rating: {
                                 value: '{"scale_min":"1.0","scale_max":"5.0","value":"4.7"}',
                              },
                              reviewsCount: {
                                 value: '30',
                              },
                              oemPartnership: null,
                           },
                           image: {
                              id: 'gid://shopify/ProductImage/30908245409882',
                              altText: 'IF315-049-2',
                              height: 2000,
                              width: 2000,
                              url: 'https://cdn.shopify.com/s/files/1/2429/5121/products/BBYFChBH3BMOwJvp_6d0c34d9-eb5f-49e8-8c43-3a443b66fa14.jpg?v=1642621670',
                           },
                           price: {
                              amount: '4.99',
                              currencyCode: CurrencyCode.Usd,
                           },
                           compareAtPrice: null,
                           proPricesByTier: {
                              value: '{"pro_1":4.49,"pro_2":3.99,"pro_3":1.5,"pro_4":0.9}',
                           },
                           warranty: {
                              value: 'Sold as-is; no refunds or returns',
                           },
                           enabled: {
                              value: 'true',
                           },
                        },
                     ],
                  },
               },
               internalDisplayName: {
                  value: 'iPhone 6s Plus Battery / Part and Adhesive',
               },
               shippingRestrictions: {
                  value: '["is_battery"]',
               },
            },
         ],
      },
      vendor: '',
   },
};

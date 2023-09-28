import type { ProductTemplateProps } from '@templates/product/hooks/useProductTemplateProps';
import { MenuItemType } from '@ifixit/menu';

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
                     url: 'https://www.ifixit.com/about-us/careers',
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

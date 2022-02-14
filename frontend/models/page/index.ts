export * from './types';
import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCTS_INDEX_NAME,
} from '@config/env';
import { assertNever, filterNullableItems } from '@helpers/application-helpers';
import pressLogo1 from '@images/9to5.svg';
import storeHomeContentImage1 from '@images/store-home-content-1.jpg';
import storeHomeContentImage2 from '@images/store-home-content-2.jpg';
import storeHomeHeroImage from '@images/store-home-hero.jpeg';
import storeHomeSearchImage from '@images/store-home-search-background.jpeg';
import {
   Enum_Banner_Template,
   Enum_Componentpagesplitwithimage_Imageposition,
   PublicationState,
   strapi,
} from '@lib/strapi-sdk';
import algoliasearch from 'algoliasearch';
import {
   BannerTemplate,
   FeaturedProduct,
   FeaturedProductList,
   NavigationActionType,
   Page,
   PageSection,
   PageSectionType,
   TestimonialQuote,
   SocialPost,
   SplitImagePosition,
} from './types';

function genId() {
   return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
   );
}

export async function findPageByPath(path: string): Promise<Page | null> {
   // return mockGetPageByPath(path);
   const response = await strapi.findPage({
      filters: {
         path: {
            eq: path,
         },
      },
      publicationState: PublicationState.Live,
      pagination: {
         limit: 1,
      },
   });

   const page = response.pages?.data?.[0]?.attributes;
   if (page == null) {
      return null;
   }
   const rawSections = filterNullableItems(page.sections);
   const sections = await Promise.all(
      rawSections.map(
         async (section, index): Promise<PageSection | null> => {
            switch (section.__typename) {
               case 'ComponentPageHero': {
                  const image = section.image?.data?.attributes;
                  return {
                     type: PageSectionType.Hero,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     callToAction: section.callToAction
                        ? {
                             type: NavigationActionType.Link,
                             title: section.callToAction.title || '',
                             url: section.callToAction.url || '#',
                          }
                        : null,
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                  };
               }
               case 'ComponentPageBrowse': {
                  const productLists = section.featuredProductLists?.data;
                  const image = section.image?.data?.attributes;
                  const featuredProductLists = productLists?.map<FeaturedProductList | null>(
                     (productList) => {
                        if (productList.attributes == null) {
                           return null;
                        }
                        const image =
                           productList.attributes.image?.data?.attributes;
                        return {
                           handle: productList.attributes.handle,
                           title: productList.attributes.title,
                           image: image
                              ? {
                                   alternativeText:
                                      image.alternativeText || null,
                                   url: image.url,
                                   formats: image.formats || null,
                                }
                              : null,
                        };
                     }
                  );
                  return {
                     type: PageSectionType.Browse,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     featuredProductLists: filterNullableItems(
                        featuredProductLists
                     ),
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                  };
               }
               case 'ComponentPageWorkbench': {
                  return {
                     type: PageSectionType.Workbench,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                  };
               }
               case 'ComponentPageStats': {
                  const stats = filterNullableItems(section.stats);
                  return {
                     type: PageSectionType.Stats,
                     id: `${section.__typename}-${index}`,
                     stats: stats.map((statItem) => {
                        return {
                           label: statItem.label,
                           value: statItem.value,
                        };
                     }),
                  };
               }
               case 'ComponentPageSplitWithImage': {
                  const image = section.image?.data?.attributes;
                  return {
                     type: PageSectionType.SplitWithImageContent,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     callToAction: section.callToAction
                        ? {
                             type: NavigationActionType.Link,
                             title: section.callToAction.title || '',
                             url: section.callToAction.url || '#',
                          }
                        : null,
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                     imagePosition:
                        section.imagePosition ===
                        Enum_Componentpagesplitwithimage_Imageposition.Left
                           ? SplitImagePosition.Left
                           : SplitImagePosition.Right,
                  };
               }
               case 'ComponentPagePress': {
                  const quotes = filterNullableItems(section.pressQuotes);
                  return {
                     type: PageSectionType.Press,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     callToAction: section.callToAction
                        ? {
                             type: NavigationActionType.Link,
                             title: section.callToAction.title || '',
                             url: section.callToAction.url || '#',
                          }
                        : null,
                     quotes: quotes.map((quote) => {
                        const image = quote.logo?.data?.attributes;
                        return {
                           name: quote.name || null,
                           logo: image
                              ? {
                                   alternativeText:
                                      image.alternativeText || null,
                                   url: image.url,
                                   formats: image.formats || null,
                                }
                              : null,
                           text: quote.text || null,
                        };
                     }),
                  };
               }
               case 'ComponentPageFeaturedProductList': {
                  const productList = section.productList?.data?.attributes;
                  let products: FeaturedProduct[] = [];
                  if (productList != null) {
                     products = await findFeaturedProducts(
                        productList.handle,
                        10
                     );
                  }
                  return {
                     type: PageSectionType.FeaturedProductList,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     products,
                  };
               }
               case 'ComponentPageSocialGallery': {
                  const rawPosts = filterNullableItems(section.posts);
                  return {
                     type: PageSectionType.SocialGallery,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     posts: rawPosts.map(
                        (post): SocialPost => {
                           const image = post.image?.data?.attributes;
                           return {
                              username: post.author || null,
                              url: post.url || null,
                              image: image
                                 ? {
                                      alternativeText:
                                         image.alternativeText || null,
                                      url: image.url,
                                      formats: image.formats || null,
                                   }
                                 : null,
                           };
                        }
                     ),
                  };
               }
               case 'ComponentPageBanner': {
                  const banner = section.banner?.data?.attributes;
                  if (banner == null) {
                     return null;
                  }
                  const image = banner?.image?.data?.attributes;
                  return {
                     type: PageSectionType.Banner,
                     id: `${section.__typename}-${index}`,
                     template: getBannerTemplate(banner.template),
                     title: banner?.title || null,
                     description: banner.description || null,
                     image: image
                        ? {
                             alternativeText: image.alternativeText || null,
                             url: image.url,
                             formats: image.formats || null,
                          }
                        : null,
                     callToAction: banner.callToAction
                        ? {
                             type: NavigationActionType.Link,
                             title: banner.callToAction.title || '',
                             url: banner.callToAction.url || '#',
                          }
                        : null,
                  };
               }
               case 'ComponentPageTestimonials': {
                  const quotes = filterNullableItems(section.quotes);
                  return {
                     type: PageSectionType.Testimonials,
                     id: `${section.__typename}-${index}`,
                     title: section.title || null,
                     description: section.description || null,
                     testimonials: quotes.map((quote) => {
                        const avatar = quote.avatar?.data?.attributes;
                        return {
                           richText: quote.text,
                           author: quote.author,
                           headline: quote.headline || null,
                           avatar: avatar
                              ? {
                                   alternativeText:
                                      avatar.alternativeText || null,
                                   url: avatar.url,
                                   formats: avatar.formats || null,
                                }
                              : null,
                        };
                     }),
                  };
               }
               case 'Error': {
                  return null;
               }
               default:
                  return assertNever(section);
            }
         }
      )
   );
   return {
      path: page.path,
      title: page.title,
      sections: filterNullableItems(sections),
   };
}

function getBannerTemplate(cmsTemplate: Enum_Banner_Template): BannerTemplate {
   switch (cmsTemplate) {
      case Enum_Banner_Template.Warranty:
         return BannerTemplate.Warranty;
      default:
         return assertNever(cmsTemplate);
   }
}

async function mockGetPageByPath(path: string): Promise<Page> {
   const featuredProducts = await findFeaturedProducts('parts', 10);
   return {
      path: path,
      title: 'Store',
      sections: [
         {
            id: genId(),
            type: PageSectionType.Hero,
            title: 'For You and Your Favorite Fixers',
            description: 'Our best sale of the year with exclusive bundles.',
            callToAction: {
               type: NavigationActionType.Link,
               title: 'Save now',
               url: '/store/parts',
            },
            image: {
               url: storeHomeHeroImage.src,
               alternativeText: '',
               formats: {},
            },
         },
         {
            type: PageSectionType.Browse,
            id: genId(),
            title: 'What are you fixing?',
            description:
               'Search from hundreds of devices and thousands of replacement parts',
            image: {
               url: storeHomeSearchImage.src,
               alternativeText: '',
               formats: {},
            },
            featuredProductLists: [
               {
                  handle: 'pc-desktop',
                  title: 'PC Desktop Parts',
                  image: null,
               },
               {
                  handle: 'amazon-kindle',
                  title: 'Amazon Kindle Parts',
                  image: null,
               },
               {
                  handle: 'vacuum',
                  title: 'Vacuum Parts',
                  image: null,
               },
               {
                  handle: 'smart-home-devices',
                  title: 'Smart Home Devices Parts',
                  image: null,
               },
               {
                  handle: 'dell-laptop',
                  title: 'Dell Laptop Parts',
                  image: null,
               },
               {
                  handle: 'sony-laptop',
                  title: 'Sony Laptop Parts',
                  image: null,
               },
               {
                  handle: 'hp-laptop',
                  title: 'HP Laptop Parts',
                  image: null,
               },
               {
                  handle: 'samsung-laptop',
                  title: 'Samsung Laptop Parts',
                  image: null,
               },
               {
                  handle: 'microsoft-surfce-parts',
                  title: 'Microsoft Surface Parts',
                  image: null,
               },
               {
                  handle: 'samsung-television',
                  title: 'Samsung Television Parts',
                  image: null,
               },
               {
                  handle: 'lumia-phone',
                  title: 'Lumia Phone Parts',
                  image: null,
               },
               {
                  handle: 'apple-watch',
                  title: 'Apple Watch Parts',
                  image: null,
               },
               {
                  handle: 'drone',
                  title: 'Drone Parts',
                  image: null,
               },
            ],
         },
         {
            type: PageSectionType.Workbench,
            id: genId(),
            title: null,
         },
         {
            type: PageSectionType.Stats,
            id: genId(),
            stats: [
               {
                  value: '76.834',
                  label: 'Free manuals',
               },
               {
                  value: '181.097',
                  label: 'Solutions',
               },
               {
                  value: '34.672',
                  label: 'Devices',
               },
               {
                  value: '100M+',
                  label: 'Successful repairs',
               },
            ],
         },
         {
            type: PageSectionType.SplitWithImageContent,
            id: genId(),
            title: 'Fix Kits for Every repair',
            description:
               "Our comprehensive kits have everything you need to replace your own battery, upgrade your RAM, swap in a SSD, or anything else you need to fix. Plus, we've got a step-by-step repair guide for every kit.",
            callToAction: {
               title: 'Refresh your battery',
               type: NavigationActionType.Link,
               url: '/store/parts',
            },
            image: {
               url: storeHomeContentImage1.src,
               alternativeText: '',
               formats: {},
            },
            imagePosition: SplitImagePosition.Right,
         },
         {
            type: PageSectionType.Press,
            id: genId(),
            title: 'Praise from the Press',
            description:
               'How shall we sing the praises of the dedicated team of lunatics over at iFixit?',
            callToAction: {
               type: NavigationActionType.Link,
               title: 'See more',
               url: 'https://ifixit.com/Quotes',
            },
            quotes: [
               {
                  logo: {
                     url: pressLogo1.src,
                     alternativeText: '',
                     formats: {},
                  },
                  name: '9to5Mac',
                  text:
                     'iFixit is the best way to get the parts you need to fix your device.',
               },
               {
                  logo: {
                     url: pressLogo1.src,
                     alternativeText: '',
                     formats: {},
                  },
                  name: 'iMore',
                  text:
                     'iFixit is the best way to get the parts you need to fix your device.',
               },
               {
                  logo: {
                     url: pressLogo1.src,
                     alternativeText: '',
                     formats: {},
                  },
                  name: 'Inc.',
                  text:
                     'iFixit is the best way to get the parts you need to fix your device.',
               },
               {
                  logo: {
                     url: pressLogo1.src,
                     alternativeText: '',
                     formats: {},
                  },
                  name: 'MacRumors',
                  text:
                     'iFixit is the best way to get the parts you need to fix your device.',
               },
            ],
         },
         {
            type: PageSectionType.SplitWithImageContent,
            id: genId(),
            title: 'The Most Comprehensive Electronics Toolkit',
            description: `Our flagship Pro Tech Toolkit is all you need for most repairs. Armed with the data from hundreds of teardowns and thousands of repair guides, our engineers built the most effective toolkits for your practical repair needs.

               We've engineered this toolkit from the ground up—from the custom opening tools and spudgers to the iFixit-designed aluminum driver with knurled handle and swivel top.
               `,
            callToAction: {
               title: 'Get Your Own Pro Tech',
               type: NavigationActionType.Link,
               url: '/store/parts',
            },
            image: {
               url: storeHomeContentImage2.src,
               alternativeText: '',
               formats: {},
            },
            imagePosition: SplitImagePosition.Left,
         },
         {
            type: PageSectionType.SplitWithImageContent,
            id: genId(),
            title: 'All the tools you need to start your repair business.',
            description: `Everything you need to start a repair business—in one handy messenger bag. Use these tools with the free technical training and business development resources on iFixit.com and you'll have a business fixing iPhones, iPads, iPods, Android smartphones like Samsung Galaxy and Google Pixel devices, iMacs, MacBook Pros, MacBook Airs, and much, much more.
`,
            callToAction: {
               title: 'Level up Your Toolbox',
               type: NavigationActionType.Link,
               url: '/store/parts',
            },
            image: {
               url: storeHomeContentImage1.src,
               alternativeText: '',
               formats: {},
            },
            imagePosition: SplitImagePosition.Right,
         },
         {
            type: PageSectionType.FeaturedProductList,
            id: genId(),
            title: 'Best Sellers',
            description: `Not all parts or sellers are created equal. And sometimes it's hard to tell apart the good, the bad, and the inconsistent. We've spent more than a decade vetting sources and suppliers.`,
            products: featuredProducts,
         },
         {
            type: PageSectionType.SocialGallery,
            id: genId(),
            title: 'Repair Around the World',
            description: `No one knows how to fix everything, but everyone knows how to fix something. Teach us what you know and make sure things work longer! The easier it is to fix something, the more people will do it.`,
            posts,
         },
         {
            type: PageSectionType.Banner,
            id: genId(),
            template: BannerTemplate.Warranty,
            title: 'Lifetime Guarantee',
            description: `We stand behind our tools. If something breaks, we’ll replace it—for as long as you own the iFixit tool.`,
            callToAction: {
               type: NavigationActionType.Link,
               title: 'Learn More',
               url: 'https://www.ifixit.com/Info/Warranty',
            },
            image: null,
         },
         {
            type: PageSectionType.Testimonials,
            id: genId(),
            title: 'Our customers are the smartest people in the world.',
            description: `It's fun to take stuff apart. It's interesting to see what's inside that magic iPod you carry around every day. It's gratifying to fix it with your own hands. Don't believe us? Try it! Fix your Mac yourself. Show a friend how to fix something.`,
            testimonials: quotes,
         },
      ],
   };
}

const quotes: TestimonialQuote[] = [
   {
      author: 'Kyle Wiens',
      headline: 'CEO iFixit',
      richText: `Today i received my  @iFixit classic bundle. I was so happy when I opened the box and found a small pack of Haribo inside. Nice move @iFixitDE, who doesn’t love Haribo?`,
      avatar: {
         url:
            'https://pbs.twimg.com/profile_images/1102978040328466432/uSaX8_gE_400x400.png',
         alternativeText: '',
         formats: {},
      },
   },
   {
      author: 'Kyle Wiens',
      headline: 'CEO iFixit',
      richText: `@iFixit has the parts, the tools, and most importantly, the guides to replace the battery yourself. They even have a nice sale going on for their tool sets! https://ifixit.com`,
      avatar: {
         url:
            'https://pbs.twimg.com/profile_images/1102978040328466432/uSaX8_gE_400x400.png',
         alternativeText: '',
         formats: {},
      },
   },
   {
      author: 'Kyle Wiens',
      headline: 'CEO iFixit',
      richText: `.@iFixit can help you repair (almost) anything!
      With over 70,000 manuals and Fix Kits for TONS of devices, you can find the right tool for the job at http://ifixit.com/LTT`,
      avatar: {
         url:
            'https://pbs.twimg.com/profile_images/1102978040328466432/uSaX8_gE_400x400.png',
         alternativeText: '',
         formats: {},
      },
   },
   {
      author: 'John Doe',
      headline: 'CEO Apple',
      richText: `Today i received my  @iFixit classic bundle. I was so happy when I opened the box and found a small pack of Haribo inside. Nice move @iFixitDE, who doesn’t love Haribo?`,
      avatar: null,
   },
   {
      author: 'John Doe',
      headline: 'CEO Apple',
      richText: `@iFixit has the parts, the tools, and most importantly, the guides to replace the battery yourself. They even have a nice sale going on for their tool sets! https://ifixit.com`,
      avatar: null,
   },
   {
      author: 'John Doe',
      headline: 'CEO Apple',
      richText: `.@iFixit can help you repair (almost) anything!
      With over 70,000 manuals and Fix Kits for TONS of devices, you can find the right tool for the job at http://ifixit.com/LTT`,
      avatar: null,
   },
];

const posts: SocialPost[] = [
   {
      url: 'https://twitter.com/proscriptus/status/1490388575120248836',
      username: 'proscriptus',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FK7sgm8X0AYUjui?format=jpg&name=large',
         formats: {},
      },
   },
   {
      url: 'https://twitter.com/xavigutierrezm/status/1487942754676187139',
      username: 'xavigutierrezm23e23e23e23e23e23',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FKY8DAQXsAIkhAz?format=jpg&name=medium',
         formats: {},
      },
   },
   {
      url: 'https://twitter.com/in_sympathy/status/1483847160412217346',
      username: 'in_sympathy',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FJevHr4WQAMZmIv?format=jpg&name=large',
         formats: {},
      },
   },
   {
      url: 'https://twitter.com/bamsemesteren/status/1483536262074089474',
      username: 'bamsemesteren',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FJaUWqmWUAUr8c7?format=jpg&name=large',
         formats: {},
      },
   },
   {
      url: 'https://twitter.com/in_sympathy/status/1477044686728708113',
      username: 'in_sympathy',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FH-ETKwWQAICuHC?format=jpg&name=4096x4096',
         formats: {},
      },
   },
   {
      url: 'https://twitter.com/ActualRaptuno/status/1477030374928699400',
      username: 'ActualRaptuno',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FH93S0bUcAITsul?format=jpg&name=large',
         formats: {},
      },
   },
   {
      url: 'https://twitter.com/anime_bootleg/status/1477019154708320260',
      username: 'anime_bootleg',
      image: {
         alternativeText: '',
         url:
            'https://pbs.twimg.com/media/FH9tF3NWUAIaynn?format=jpg&name=large',
         formats: {},
      },
   },
];

async function findFeaturedProducts(
   productListHandle: string,
   limit: number
): Promise<FeaturedProduct[]> {
   const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
   const index = client.initIndex(ALGOLIA_PRODUCTS_INDEX_NAME);
   const result = await index.search<ProductSearchHit>('', {
      filters: `collections:${productListHandle}`,
      hitsPerPage: limit,
   });
   return result.hits.map((hit) => {
      return {
         id: hit.objectID,
         title: hit.title,
         sku: hit.sku,
         handle: hit.handle,
         rating: 4,
         ratingCount: 102,
         image: {
            alternativeText: '',
            url: hit.product_image,
            formats: {},
         },
         price: hit.price,
         compareAtPrice: hit.compare_at_price || null,
         inventoryQuantity: hit.inventory_quantity,
      };
   });
}

interface ProductSearchHit {
   title: string;
   handle: string;
   price: number;
   compare_at_price?: number;
   sku: string;
   product_image: string;
   body_html_safe?: string;
   inventory_quantity: number;
}

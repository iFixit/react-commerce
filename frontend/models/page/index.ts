export * from './types';
import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCTS_INDEX_NAME,
} from '@config/env';
import pressLogo1 from '@images/9to5.svg';
import storeHomeContentImage1 from '@images/store-home-content-1.jpg';
import storeHomeContentImage2 from '@images/store-home-content-2.jpg';
import storeHomeHeroImage from '@images/store-home-hero.jpeg';
import storeHomeSearchImage from '@images/store-home-search-background.jpeg';
import algoliasearch from 'algoliasearch';
import {
   FeaturedProduct,
   NavigationActionType,
   Page,
   PageSectionType,
   SplitImagePosition,
} from './types';

function genId() {
   return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
   );
}

export async function getPageByPath(path: string): Promise<Page> {
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
               type: NavigationActionType.InternalLink,
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
         },
         {
            type: PageSectionType.Stats,
            id: genId(),
            stats: [
               {
                  number: '76.834',
                  label: 'Free manuals',
               },
               {
                  number: '181.097',
                  label: 'Solutions',
               },
               {
                  number: '34.672',
                  label: 'Devices',
               },
               {
                  number: '2M+',
                  label: 'Product sale/Year',
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
               type: NavigationActionType.InternalLink,
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
               type: NavigationActionType.InternalLink,
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
               type: NavigationActionType.InternalLink,
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
               type: NavigationActionType.InternalLink,
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
      ],
   };
}

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

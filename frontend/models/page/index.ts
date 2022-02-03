export * from './types';
import { Page, PageActionType, PageSectionType } from './types';
import storeHomeHeroImage from '@images/store-home-hero.jpeg';
import storeHomeSearchImage from '@images/store-home-search-background.jpeg';
import storeHomeContentImage1 from '@images/store-home-content-1.jpg';

function genId() {
   return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
   );
}

export async function getPageByPath(path: string): Promise<Page> {
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
               type: PageActionType.InternalLink,
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
            featuredProductList: [
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
               type: PageActionType.InternalLink,
               url: '/store/parts',
            },
            image: {
               url: storeHomeContentImage1.src,
               alternativeText: '',
               formats: {},
            },
            imagePosition: 'left',
         },
      ],
   };
}

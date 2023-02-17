import type { FooterType } from './Shared';
import { MenuItemType } from '../../ui/menu';

export const getGuideFooterMenus = (supportUrl: string): FooterType => {
   return {
      menu1: {
         title: 'iFixit',
         items: [
            {
               type: MenuItemType.Link,
               name: 'About Us',
               url: '/Info/index',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "About Us" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Customer Support',
               url: supportUrl,
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction:
                     'Footer iFixit Link - "Customer Support" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Careers',
               url: '/Info/jobs',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Careers" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Feedback',
               url: 'https://meta.ifixit.com',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Feedback" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Newsletter',
               url: '/Newsletter',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Newsletter" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'API',
               url: '/api/2.0/doc',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "API" - Click',
               },
            },
         ],
      },
      menu2: {
         title: 'Resources',
         items: [
            {
               type: MenuItemType.Link,
               name: 'Press',
               url: '/Info/Media',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Press" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'News',
               url: '/News/all-categories',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "News" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Participate',
               url: '/Participate',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Participate" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Pro Wholesale',
               url: 'https://pro.ifixit.com/',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Pro Wholesale" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'Retail Locator',
               url: '/Retail',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Retail Locator" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               name: 'For Manufacturers',
               url: '/services',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction:
                     'Footer iFixit Link - "For Manufacturers" - Click',
               },
            },
         ],
      },
      menu3: {
         title: 'Legal',
         items: [
            {
               type: MenuItemType.Link,
               url: '/Info/Accessibility',
               name: 'Accessibility',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Accessibility" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               url: '/Info/Privacy',
               name: 'Privacy',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Privacy" - Click',
               },
            },
            {
               type: MenuItemType.Link,
               url: '/Info/Terms_of_Use',
               name: 'Terms',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction: 'Footer iFixit Link - "Terms" - Click',
               },
            },
         ],
      },
      partners: null,
      bottomMenu: {
         title: 'Licensing',
         items: [
            {
               type: MenuItemType.Link,
               url: '/Info/Licensing',
               name: 'Licensed under Creative Commons',
               description: null,
               trackingData: {
                  eventCategory: 'Footer iFixit Link',
                  eventAction:
                     'Footer iFixit Link - "Licensed under Creative Commons" - Click',
               },
            },
         ],
      },
   };
};

import { Store } from '@models/store';
import { MenuItemType } from '@models/menu';

const baseUrl = 'https://www.ifixit.com/';

export const getGuideSocialMediaAccounts = () => {
   return {
      facebook: 'https://www.facebook.com/iFixit/',
      twitter: 'https://twitter.com/ifixit',
      instagram: 'https://www.instagram.com/ifixit/',
      youtube: 'https://www.youtube.com/user/iFixitYourself',
      repairOrg: 'https://www.repair.org/',
   };
};

export const getGuideFooterMenus = (): Store['footer'] => {
   return {
      menu1: {
         title: 'iFixit',
         items: [
            {
               type: MenuItemType.Link,
               name: 'About Us',
               url: baseUrl + 'index',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Customer Support',
               url: 'https://help.ifixit.com',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Careers',
               url: baseUrl + 'Info/jobs',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Feedback',
               url: 'https://meta.ifixit.com',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Newsletter',
               url: baseUrl + 'Newsletter',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'API',
               url: baseUrl + 'api/2.0/doc',
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
               url: baseUrl + 'Info/Media',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'News',
               url: baseUrl + 'Page/all-categories',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Contribute',
               url: baseUrl + 'Contribute',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Pro Wholesale',
               url: 'https://pro.ifixit.com/',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'Retail Locator',
               url: baseUrl + 'Retail',
               description: null,
            },
            {
               type: MenuItemType.Link,
               name: 'For Manufacturers',
               url: baseUrl + 'Page/services',
               description: null,
            },
         ],
      },
      menu3: {
         title: 'Legal',
         items: [
            {
               type: MenuItemType.Link,
               url: baseUrl + 'Info/Accessibility',
               name: 'Accessibility',
               description: null,
            },
            {
               type: MenuItemType.Link,
               url: baseUrl + 'Info/Privacy',
               name: 'Privacy',
               description: null,
            },
            {
               type: MenuItemType.Link,
               url: baseUrl + 'Info/Terms_of_Use',
               name: 'Terms',
               description: null,
            },
         ],
      },
      partners: null,
      bottomMenu: {
         title: 'Licensing',
         items: [
            {
               type: MenuItemType.Link,
               url: baseUrl + 'Info/Licensing',
               name: 'Licensed under Creative Commons',
               description: null,
            },
         ],
      },
   };
};

export const getNewsletterForm = () => {
   return {
      title: 'Stay in the loop',
      subtitle: 'Learn something new every month!',
      callToActionButtonTitle: 'Subscribe',
      inputPlaceholder: 'Enter your email',
   };
};

export const getStores = () => {
   return [
      {
         code: 'us',
         name: 'United States',
         url: 'https://www.ifixit.com/Store',
         currency: 'USD',
      },
      {
         code: 'eu',
         name: 'Europe',
         url: 'https://eustore.ifixit.com/',
         currency: 'EUR',
      },
   ];
};

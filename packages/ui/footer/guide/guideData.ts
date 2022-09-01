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

export const getGuideFooterMenus = () => {
   return {
      menu1: {
         title: 'iFixit',
         items: [
            { type: 'link', name: 'About Us', url: baseUrl + 'index' },
            {
               type: 'link',
               name: 'Customer Support',
               url: 'https://help.ifixit.com',
            },
            { type: 'link', name: 'Careers', url: baseUrl + 'Info/jobs' },
            { type: 'link', name: 'Feedback', url: 'https://meta.ifixit.com' },
            { type: 'link', name: 'Newsletter', url: baseUrl + 'Newsletter' },
            { type: 'link', name: 'API', url: baseUrl + 'api/2.0/doc' },
         ],
      },
      menu2: {
         title: 'Resources',
         items: [
            { type: 'link', name: 'Press', url: baseUrl + 'Info/Media' },
            {
               type: 'link',
               name: 'News',
               url: baseUrl + 'Page/all-categories',
            },
            { type: 'link', name: 'Contribute', url: baseUrl + 'Contribute' },
            {
               type: 'link',
               name: 'Pro Wholesale',
               url: 'https://pro.ifixit.com/',
            },
            { type: 'link', name: 'Retail Locator', url: baseUrl + 'Retail' },
            {
               type: 'link',
               name: 'For Manufacturers',
               url: baseUrl + 'Page/services',
            },
         ],
      },
      menu3: {
         title: 'Legal',
         items: [
            {
               type: 'link',
               url: baseUrl + 'Info/Accessibility',
               name: 'Accessibility',
            },
            { type: 'link', url: baseUrl + 'Info/Privacy', name: 'Privacy' },
            { type: 'link', url: baseUrl + 'Info/Terms_of_Use', name: 'Terms' },
         ],
      },
      partners: undefined,
      bottomMenu: {
         title: 'Licensing',
         items: [
            {
               type: 'link',
               url: baseUrl + 'Info/Licensing',
               name: 'Licensed under Creative Commons',
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

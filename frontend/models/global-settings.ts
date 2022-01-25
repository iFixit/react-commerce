import { strapi } from '@lib/strapi-sdk';

export interface GlobalSettings {
   newsletterForm: {
      title: string;
      subtitle: string;
      inputPlaceholder: string;
      callToActionButtonTitle: string;
   };
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
   const result = await strapi.getGlobalSettings();
   const newsletterForm =
      result.global?.data?.attributes?.newsletterForm || null;
   if (newsletterForm == null) {
      throw new Error('Global settings not found');
   }
   return {
      newsletterForm,
   };
}

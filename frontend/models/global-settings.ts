import { strapi } from '@lib/strapi-sdk';
import { cache } from '@lib/cache';

export interface GlobalSettings {
   newsletterForm: {
      title: string;
      subtitle: string;
      inputPlaceholder: string;
      callToActionButtonTitle: string;
   };
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
   return cache('globalSettings', getGlobalSettingsFromStrapi, 60 * 60);
}

async function getGlobalSettingsFromStrapi(): Promise<GlobalSettings> {
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

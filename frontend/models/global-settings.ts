import { SentryError } from '@ifixit/sentry';
import { strapi } from '@lib/strapi-sdk';
import { cache } from '@lib/cache';
import { timeAsync } from '@ifixit/helpers';

export interface GlobalSettings {
   newsletterForm: {
      title: string;
      subtitle: string;
      inputPlaceholder: string;
      callToActionButtonTitle: string;
   };
}

type GetGlobalSettingsOptions = {
   forceMiss?: boolean;
};

export async function getGlobalSettings({
   forceMiss,
}: GetGlobalSettingsOptions = {}): Promise<GlobalSettings> {
   return cache('globalSettings', getGlobalSettingsFromStrapi, {
      ttl: 60 * 60,
      forceMiss,
   });
}

async function getGlobalSettingsFromStrapi(): Promise<GlobalSettings> {
   const result = await timeAsync(
      'strapi.getGlobalSettings',
      strapi.getGlobalSettings
   );
   const newsletterForm =
      result.global?.data?.attributes?.newsletterForm || null;
   if (newsletterForm == null) {
      throw new SentryError('Global settings not found');
   }
   return {
      newsletterForm,
   };
}

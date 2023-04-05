import { filterFalsyItems } from '@helpers/application-helpers';
import type { BannersSectionFieldsFragment } from '@lib/strapi-sdk';
import {
   bannerFromStrapiFragment,
   BannerSchema,
} from '@models/components/banner';
import { z } from 'zod';

export type BannersSection = z.infer<typeof BannersSectionSchema>;

export const BannersSectionSchema = z.object({
   type: z.literal('Banners'),
   id: z.string(),
   banners: z.array(BannerSchema),
});

export function bannersSectionFromStrapi(
   fragment: BannersSectionFieldsFragment | null | undefined,
   sectionId: string
): BannersSection | null {
   const strapiBanners = fragment?.banners?.data ?? [];
   const banners = filterFalsyItems(
      strapiBanners.map(bannerFromStrapiFragment)
   );

   return {
      type: 'Banners',
      id: sectionId,
      banners,
   };
}

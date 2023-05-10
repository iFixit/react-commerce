import type { Banner as SingleBannerSection } from '@models/components/banner';
import { MultipleBanners } from './MultipleBanners';
import { SingleBanner } from './SingleBanner';

export interface BannersSectionProps {
   id: string;
   banners: SingleBannerSection[];
}

export function BannersSection({ id, banners }: BannersSectionProps) {
   if (banners.length === 0) return null;

   if (banners.length === 1) {
      return <SingleBanner id={id} banner={banners[0]} />;
   }

   return <MultipleBanners id={id} banners={banners} />;
}

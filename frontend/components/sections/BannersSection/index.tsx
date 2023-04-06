import type { Banner as SingleBannerSection } from '@models/components/banner';
import { MultipleBanners } from './MultipleBanners';
import { SingleBanner } from './SingleBanner';

export interface BannersSectionProps {
   banners: SingleBannerSection[];
}

export function BannersSection({ banners }: BannersSectionProps) {
   if (banners.length === 0) return null;

   if (banners.length === 1) {
      return <SingleBanner banner={banners[0]} />;
   }

   return <MultipleBanners banners={banners} />;
}

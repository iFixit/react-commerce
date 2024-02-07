import { BannersSection } from '@components/sections/BannersSection';
import { FeaturedProductsSection } from '@components/sections/FeaturedProductsSection';
import { IFixitStatsSection } from '@components/sections/IFixitStatsSection';
import { LifetimeWarrantySection } from '@components/sections/LifetimeWarrantySection';
import { QuoteGallerySection } from '@components/sections/QuoteGallerySection';
import { SocialGallerySection } from '@components/sections/SocialGallerySection';
import { SplitWithImageContentSection } from '@components/sections/SplitWithImageSection';
import { IFIXIT_ORIGIN } from '@config/env';
import { ensureIFixitSuffix } from '@helpers/metadata-helpers';
import { joinPaths } from '@helpers/path-helpers';
import { assertNever, invariant } from '@ifixit/helpers';
import { BrowseSection } from '@templates/page/sections/BrowseSection';
import { HeroSection } from '@templates/page/sections/HeroSection';
import { PressQuotesSection } from '@templates/page/sections/PressQuotesSection';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findPageByPath } from './data';

export const fetchCache = 'default-no-store';

export interface StorePageProps {
   params: {
      slug?: string[];
   };
}

export default async function StorePage({ params }: StorePageProps) {
   const page = await findPageByPath(pathFor(params.slug));

   if (page == null) notFound();

   return (
      <div>
         {page.sections.map((section) => {
            switch (section.type) {
               case 'Hero': {
                  return <HeroSection key={section.id} data={section} />;
               }
               case 'Browse': {
                  return <BrowseSection key={section.id} data={section} />;
               }
               case 'IFixitStats': {
                  return <IFixitStatsSection key={section.id} data={section} />;
               }
               case 'SplitWithImage': {
                  return (
                     <SplitWithImageContentSection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        description={section.description}
                        image={section.image}
                        imagePosition={section.imagePosition}
                        callToAction={section.callToAction}
                     />
                  );
               }
               case 'PressQuotes': {
                  return (
                     <PressQuotesSection
                        key={section.id}
                        title={section.title}
                        description={section.description}
                        callToAction={section.callToAction}
                        quotes={section.quotes}
                     />
                  );
               }
               case 'FeaturedProducts': {
                  return (
                     <FeaturedProductsSection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        description={section.description}
                        background={section.background}
                        products={section.products}
                     />
                  );
               }
               case 'SocialGallery': {
                  return (
                     <SocialGallerySection
                        key={section.id}
                        title={section.title}
                        description={section.description}
                        posts={section.posts}
                     />
                  );
               }
               case 'LifetimeWarranty': {
                  return (
                     <LifetimeWarrantySection
                        key={section.id}
                        title={section.title}
                        description={section.description}
                     />
                  );
               }
               case 'Banners': {
                  return (
                     <BannersSection
                        key={section.id}
                        id={section.id}
                        banners={section.banners}
                     />
                  );
               }
               case 'QuoteGallery': {
                  return (
                     <QuoteGallerySection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        description={section.description}
                        quotes={section.quotes}
                     />
                  );
               }

               default:
                  return assertNever(section);
            }
         })}
      </div>
   );
}

export async function generateMetadata({
   params,
}: StorePageProps): Promise<Metadata> {
   const page = await findPageByPath(pathFor(params.slug));

   if (page == null) return {};

   return {
      title: page.metaTitle ? ensureIFixitSuffix(page.metaTitle) : undefined,
      description: page.metaDescription,
      openGraph: {
         title: page.metaTitle ?? undefined,
         description: page.metaDescription ?? undefined,
         type: 'website',
         url: joinPaths(IFIXIT_ORIGIN, page.path),
         images: ogImage(),
      },
   };

   function ogImage() {
      invariant(page);
      for (const section of page.sections) {
         switch (section.type) {
            case 'Hero': {
               if (section.image?.url) return { url: section.image.url };
               break;
            }
            case 'Browse': {
               if (section.image?.url) return { url: section.image.url };
               break;
            }
         }
      }
      return undefined;
   }
}

function pathFor(slug: string[] | undefined) {
   const pathSegments = slug ?? [];
   pathSegments.unshift('Store');
   return `/${pathSegments.join('/')}`;
}

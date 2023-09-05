import { Metadata } from 'next';
import PageTemplate from './components/pageTemplate';
import { RestrictRobots } from '@helpers/next-helpers';
import { notFound } from 'next/navigation';
import { flags } from '@config/flags';

export type PageParams = {
   device: string;
};

export type PageProps = {
   params: PageParams;
   searchParams: Record<string, string>;
};

export default function Page({ params, searchParams }: PageProps) {
   ensureFlag();

   const pageProps = getPageProps({ params, searchParams });
   return <PageTemplate {...pageProps} />;
}

function ensureFlag() {
   if (!flags.TROUBLESHOOTING_COLLECTIONS_ENABLED) {
      notFound();
   }
}

function getPageProps({
   params,
   searchParams: _searchParams,
}: PageProps): PageParams {
   const { device } = params;
   return {
      device,
   };
}

export async function generateMetadata({
   params,
   searchParams: _searchParams,
}: PageProps): Promise<Metadata> {
   const { device } = params;

   const ifixitOrigin = 'https://www.ifixit.com';
   const canonicalUrl = `${ifixitOrigin}/Troubleshooting/${device}`;

   const metaTitle = `Troubleshooting Collection for ${device} - iFixit`;
   const metaDescription =
      'Uses the App Router to render a page with a dynamic path.';

   return {
      metadataBase: new URL(ifixitOrigin),
      alternates: {
         canonical: canonicalUrl,
         languages: {
            'en-US': canonicalUrl,
            'de-DE': canonicalUrl,
         },
      },
      robots: RestrictRobots.RESTRICT_ALL,
      title: metaTitle,
      description: metaDescription,
      openGraph: {
         type: 'website',
         url: canonicalUrl,
         title: metaTitle,
         description: metaDescription,
      },
   };
}

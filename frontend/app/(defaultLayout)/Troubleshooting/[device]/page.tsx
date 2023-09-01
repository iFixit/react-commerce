import { Metadata } from 'next';
import PageTemplate from './pageTemplate';
import { RestrictRobots } from '@helpers/next-helpers';

export type PageParams = {
   text: string;
};

export type PageProps = {
   params: PageParams;
   searchParams: Record<string, string>;
};

export default function Page({ params, searchParams }: PageProps) {
   const pageProps = getPageProps({ params, searchParams });
   return <PageTemplate {...pageProps} />;
}

function getPageProps({
   params,
   searchParams: _searchParams,
}: PageProps): PageParams {
   const { text } = params;
   return {
      text: `Hello ${text}!`,
   };
}

export async function generateMetadata({
   params,
   searchParams: _searchParams,
}: PageProps): Promise<Metadata> {
   const { text } = params;

   const ifixitOrigin = 'https://www.ifixit.com';
   const canonicalUrl = `${ifixitOrigin}/HelloWorld/${text}`;

   const metaTitle = 'HelloWorld';
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

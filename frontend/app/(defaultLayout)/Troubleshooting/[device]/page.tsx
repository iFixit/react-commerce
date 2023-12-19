import { flags } from '@config/flags';
import { RestrictRobots } from '@helpers/next-helpers';
import { getiFixitOrigin } from '@helpers/path-helpers';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import TroubleshootingProblems, {
   TroubleshootingProblemsProps,
} from './components/troubleshootingProblems';
import {
   IFixitAPIClient,
   VarnishBypassHeader,
} from '@ifixit/ifixit-api-client';

export type PageParams = {
   device: string;
};

export type PageProps = {
   params: PageParams;
   searchParams: Record<string, string>;
};

export default async function Page({ params, searchParams }: PageProps) {
   ensureFlag();

   const pageProps = await getPageProps({ params, searchParams });
   return <TroubleshootingProblems {...pageProps} />;
}

function ensureFlag() {
   if (!flags.TROUBLESHOOTING_COLLECTIONS_ENABLED) {
      notFound();
   }
}

async function getPageProps({
   params,
   searchParams: _searchParams,
}: PageProps): Promise<TroubleshootingProblemsProps> {
   const { device } = params;
   const data = await getTroubleshootingProblemsData(device);
   return data;
}

async function getTroubleshootingProblemsData(
   device: string
): Promise<TroubleshootingProblemsProps> {
   const nextHeaders = headers();
   const ifixitOrigin = getiFixitOrigin(nextHeaders);

   const client = new IFixitAPIClient({
      origin: ifixitOrigin,
      headers: VarnishBypassHeader,
   });
   const encodedDevice = encodeURIComponent(device);
   const url = `Troubleshooting/Collection/${encodedDevice}`;

   try {
      return await client.get<TroubleshootingProblemsProps>(
         url,
         'troubleshootingProblems'
      );
   } catch (e) {
      notFound();
   }
}

export async function generateMetadata({
   params,
   searchParams: _searchParams,
}: PageProps): Promise<Metadata> {
   const { device } = params;

   const nextHeaders = headers();
   const ifixitOrigin = getiFixitOrigin(nextHeaders);
   const canonicalUrl = `${ifixitOrigin}/Troubleshooting/${device}`;

   const metaTitle = `Troubleshooting Collection for ${device} - iFixit`;
   const metaDescription =
      'Uses the App Router to render a page with a dynamic path.';

   return {
      metadataBase: new URL(ifixitOrigin),
      alternates: {
         canonical: canonicalUrl,
      },
      robots: flags.TROUBLESHOOTING_COLLECTIONS_ENABLED
         ? RestrictRobots.ALLOW_ALL
         : RestrictRobots.RESTRICT_ALL,
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

import { flags } from '@config/flags';
import { RestrictRobots } from '@helpers/next-helpers';
import { getiFixitOrigin } from '@helpers/path-helpers';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import TroubleshootingProblems from './components/troubleshootingProblems';
import { TroubleshootingProblemsApiData } from './hooks/useTroubleshootingProblemsProps';
import {
   IFixitAPIClient,
   VarnishBypassHeader,
} from '@ifixit/ifixit-api-client';

export type AnswersProps = {
   allAnswersUrl: string;
   allAnswersCount: number;
};

export type PageParams = {
   device: string;
   answersProps: AnswersProps;
};

export type PageProps = {
   params: PageParams;
   searchParams: Record<string, string>;
};

export default async function Page({ params, searchParams }: PageProps) {
   const pageProps = await getPageProps({
      params,
      searchParams,
   });

   return <TroubleshootingProblems {...pageProps} />;
}

async function getPageProps({
   params,
   searchParams: _searchParams,
}: PageProps): Promise<TroubleshootingProblemsApiData> {
   const { device } = params;
   const data = await getTroubleshootingProblemsData(device);
   return data;
}

async function getTroubleshootingProblemsData(
   device: string
): Promise<TroubleshootingProblemsApiData> {
   const nextHeaders = headers();
   const ifixitOrigin = getiFixitOrigin(nextHeaders);

   const client = new IFixitAPIClient({
      origin: ifixitOrigin,
      headers: VarnishBypassHeader,
   });
   const encodedDevice = encodeURIComponent(device);
   const url = `Troubleshooting/Collection/${encodedDevice}`;

   try {
      return await client.get<TroubleshootingProblemsApiData>(
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

   const metaTitle = `Troubleshooting Problems for ${device} - iFixit`;
   const metaDescription = `Is your ${device} not working? You are not alone. View common problems and explore potential solutions. Learn the steps you can take to troubleshoot and fix the problem yourself.`;

   return {
      metadataBase: new URL(ifixitOrigin),
      alternates: {
         canonical: canonicalUrl,
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

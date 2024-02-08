import { flags } from '@config/flags';
import { notFound, redirect } from 'next/navigation';
import { findProblemWiki } from './data';
import { invariant } from '@ifixit/helpers';
import type { Metadata } from 'next';

export const fetchCache = 'default-no-store';

interface ProblemWikiPageProps {
   params: {
      device: string;
      problem: string;
      wikiid: string;
   };
   searchParams: Record<string, any>;
}

export default async function ProblemWikiPage({
   params,
   searchParams,
}: ProblemWikiPageProps) {
   if (!flags.APP_ROUTER_TROUBLESHOOTING_PAGE_ENABLED) notFound();

   const problemWiki = await findProblemWiki(params.wikiid);

   if (problemWiki == null) notFound();

   if (currentPath() !== canonicalPath())
      redirect(canonicalPath() + currentSearchParams());

   return (
      <div>
         <h1>{problemWiki.title}</h1>
      </div>
   );

   function currentPath() {
      return `/Troubleshooting/${params.device}/${problemHandle()}/${
         params.wikiid
      }`;
   }

   function canonicalPath() {
      invariant(problemWiki);
      return new URL(problemWiki.canonicalUrl).pathname;
   }

   function problemHandle() {
      return decodeURIComponent(params.problem);
   }

   function currentSearchParams() {
      if (Object.keys(searchParams).length === 0) return '';
      return `?${new URLSearchParams(searchParams)}`;
   }
}

export async function generateMetadata({
   params,
}: ProblemWikiPageProps): Promise<Metadata> {
   const problemWiki = await findProblemWiki(params.wikiid);

   if (problemWiki == null) return {};

   return {
      title: `${problemWiki.title} - iFixit Troubleshooting`,
      description: problemWiki.metaDescription,
      keywords: problemWiki.metaKeywords,
      robots: { index: true, follow: true },
      alternates: {
         canonical: problemWiki.canonicalUrl,
         languages: problemWiki.hreflangUrls,
      },
   };
}

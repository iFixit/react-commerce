import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { Product } from '@models/product';

export type Section = {
   heading: string;
   id: string;
   body: string;
};

export type Author = {
   userid: number;
   percent: number;
   username: string;
   avatar: string;
   profileUrl: string;
};

export type Problem = {
   url: string;
   imageUrl: string;
   title: string;
   deviceTitle: string;
};

export type ApiSolutionSection = Section & {
   guides: SectionGuide[];
   products: string[];
};

export type SolutionSection = Omit<
   ApiSolutionSection,
   'guides' | 'products'
> & {
   guides: SectionGuide[];
   products: Array<Product>;
};

export type SectionGuide = {
   guideid: number;
   url: string;
   title: string;
   image: { thumbnail: string };
   time_required: string;
   difficulty: string;
   introduction_rendered: string;
};

export type TroubleshootingApiData = {
   title: string;
   id: number;
   toc: string;
   introduction: Section[];
   solutions: ApiSolutionSection[];
   conclusion: Section[];
   editUrl: string;
   historyUrl: string;
   answersUrl: string;
   deviceGuideUrl?: string;
   devicePartsUrl?: string;
   canonicalUrl: string;
   lastUpdatedDate: number;
   authors: Author[];
   hreflangUrls: Record<string, string>;
   breadcrumbs: BreadcrumbEntry[];
   metaDescription: string;
   metaKeywords: string;
   linkedProblems: Problem[];
   mainImageUrl: string;
   mainImageUrlLarge: string;
};

export type TroubleshootingData = Omit<TroubleshootingApiData, 'solutions'> & {
   solutions: SolutionSection[];
};

export type BreadcrumbEntry = {
   title: string;
   url: string;
};

type TroubleshootingPageProps = {
   wikiData: TroubleshootingData;
};
export type TroubleshootingProps = WithProvidersProps<
   WithLayoutProps<TroubleshootingPageProps>
>;

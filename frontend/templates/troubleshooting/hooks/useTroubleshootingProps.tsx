import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { Product } from '@models/product';
import { Guide } from './GuideModel';

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
   imageUrlThumbnail: string;
   title: string;
   deviceTitle: string;
};

export type ApiSolutionSection = Section & {
   guides: number[];
   products: string[];
};

export type SolutionSection = Omit<
   ApiSolutionSection,
   'guides' | 'products'
> & {
   guides: Guide[];
   products: Array<Product>;
};

export type TroubleshootingApiData = {
   title: string;
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

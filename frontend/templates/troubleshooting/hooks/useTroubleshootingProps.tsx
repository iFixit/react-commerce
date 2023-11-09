import { WithProvidersProps } from '@components/common';
import { ViewStatsProps } from '@components/common/ViewStats';
import type { WithLayoutProps } from '@layouts/default/server';

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
   products: SectionProduct[];
};

export type SectionProduct = {
   image: string;
   thumbnailUrl: string;
   url: string;
   title: string;
   price: {
      amount: number;
      currencyCode: string;
   };
   reviews: {
      rating: number;
      count: number;
   };
};

export type SolutionSection = Omit<
   ApiSolutionSection,
   'guides' | 'products'
> & {
   guides: SectionGuide[];
   products: Array<SectionProduct>;
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

export type CategoryInfo = {
   displayTitle: string;
   imageUrl: string;
   viewUrl: string;
   description: string;
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
   viewStats?: ViewStatsProps;
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
   relatedProblems: Problem[];
   countOfAssociatedProblems: number;
   mainImageUrl: string;
   mainImageUrlLarge: string;
   category: CategoryInfo;
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

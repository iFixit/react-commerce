import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { Guide } from './GuideModel';

export type Section = {
   heading: string;
   body: string;
};

export type Author = {
   userid: number;
   percent: number;
   username: string;
   avatar: string;
};

export type ApiSolutionSection = Section & {
   guides: number[];
};

export type SolutionSection = Omit<ApiSolutionSection, 'guides'> & {
   guides: Guide[];
};

export type TroubleshootingApiData = {
   title: string;
   toc: string;
   introduction: Section[];
   solutions: ApiSolutionSection[];
   conclusion: Section[];
   editUrl: string;
   historyUrl: string;
   deviceGuideUrl?: string;
   devicePartsUrl?: string;
   canonicalUrl: string;
   lastUpdatedDate: number;
   authors: Author[];
   hreflangUrls: Record<string, string>;
   breadcrumbs: BreadcrumbEntry[];
   metaDescription: string;
   metaKeywords: string;
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

import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { FaIconProps } from '@ifixit/icons';

export type TroubleshootingProblemsApiData = {
   editUrl: string;
   historyUrl: string;
   answersUrl: string;
   deviceGuideUrl?: string;
   devicePartsUrl?: string;
   breadcrumbs: BreadcrumbEntry[];
   id: number;
   problems: Problems[];
   answers: Answers[];
   allAnswersUrl: string;
   title: string;
};

export type Problems = {
   problemTitle: string;
   deviceTitle: string;
   description: string;
   altText: string;
   imageSrcLg?: string;
   imageSrcThumb?: string;
   problemTypeIcon?: FaIconProps;
   badges?: string[];
};

export type Answers = {
   url: string;
   imageUrl: string;
   title: string;
   deviceTitle: string;
};

export type BreadcrumbEntry = {
   title: string;
   url: string;
};

export type TroubleshootingProblemsData = {
   problems: TroubleshootingProblemsApiData['problems'];
   answers: TroubleshootingProblemsApiData['answers'];
};

type TroubleshootingProblemsPageProps = {
   problemsData: TroubleshootingProblemsData;
};

export type TroubleshootingProblemsProps = WithProvidersProps<
   WithLayoutProps<TroubleshootingProblemsPageProps>
>;

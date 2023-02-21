import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';

export type Section = {
   heading: string;
   body: string;
};

export type TroubleshootingData = {
   title: string;
   toc: string;
   introduction: Section[];
   solutions: Section[];
   conclusion: Section[];
   editUrl: string;
   historyUrl: string;
};

type TroubleshootingPageProps = {
   wikiData: TroubleshootingData;
};
export type TroubleshootingProps = WithProvidersProps<
   WithLayoutProps<TroubleshootingPageProps>
>;

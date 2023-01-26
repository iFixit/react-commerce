import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';

export type Problem = {
   heading: string;
   body: string;
};

export type TroubleshootingData = {
   title: string;
   toc: string;
   introduction: Problem[];
   solutions: Problem[];
   conclusion: Problem[];
};

type TroubleshootingPageProps = {
   wikiData: TroubleshootingData;
};
export type TroubleshootingProps = WithProvidersProps<
   WithLayoutProps<TroubleshootingPageProps>
>;

import { WithProvidersProps } from '@components/common';
import { WithLayoutProps } from '@layouts/default';
import { useServerSideProps } from '@lib/server-side-props';
import { Page } from '@models/page';

export type PageTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      page: Page;
   }>
>;

export const usePageTemplateProps = () =>
   useServerSideProps<PageTemplateProps>();

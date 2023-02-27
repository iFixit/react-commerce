import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { useServerSideProps } from '@lib/server-side-props';
import type { Page } from '@models/page';

export type PageTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      page: Page;
   }>
>;

export const usePageTemplateProps = () =>
   useServerSideProps<PageTemplateProps>();

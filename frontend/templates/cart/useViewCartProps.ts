import { WithProvidersProps } from '@components/common';
import type { WithLayoutProps } from '@layouts/default/server';
import { useServerSideProps } from '@lib/server-side-props';

export type ViewCartTemplateProps = WithProvidersProps<WithLayoutProps<{}>>;

export const useViewCartProps = () =>
   useServerSideProps<ViewCartTemplateProps>();

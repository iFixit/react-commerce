import { WithProvidersProps } from '@components/common';
import { WithLayoutProps } from '@layouts/default';
import { useServerSideProps } from '@lib/server-side-props';

export type LandingTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      // ..
   }>
>;

export const useLandingTemplateProps = () =>
   useServerSideProps<LandingTemplateProps>();

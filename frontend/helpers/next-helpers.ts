import { GetServerSideProps } from 'next';
import { logAsync } from '@ifixit/helpers';
import { setSentryPageContext } from '@ifixit/sentry';

export function serverSidePropsWrapper<T>(
   getServerSidePropsInternal: GetServerSideProps<T>
): GetServerSideProps<T> {
   return async (context) => {
      return logAsync('getServerSideProps', () =>
         getServerSidePropsInternal(context)
      ).catch((err) => {
         setSentryPageContext(context);
         throw err;
      });
   };
}

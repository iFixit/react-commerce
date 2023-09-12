import { AppProviders } from '@components/common/AppProviders';
import { DEFAULT_STORE_CODE } from '@config/env';
import { getLayoutServerSideProps } from '@layouts/default/server';
import IFixitPageFrame from './components/IFixitPageFrame';

export default async function NotFound() {
   const layoutPropsPromise = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });

   const layoutProps = await layoutPropsPromise;

   return (
      <AppProviders>
         <IFixitPageFrame {...layoutProps}>
            <div className="flex flex-col flex-grow items-center justify-center px-5 pt-4 pb-16">
               <div className="flex flex-col items-center">
                  <h2 className="text-4xl md:text-5xl font-medium">404</h2>
                  <span className="pb-3 font-medium uppercase ">
                     Page not found
                  </span>
                  <hr className="border border-red-500 w-[50px] opacity-60" />
                  <span className="pt-3 break-words text-center max-w-[360px]">
                     We can&apos;t find the page you&apos;re looking for.
                     Whoops.
                  </span>
               </div>
            </div>
         </IFixitPageFrame>
      </AppProviders>
   );
}

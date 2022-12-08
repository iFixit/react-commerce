declare module '*.svg' {
   const value: any;
   export default value;
}

declare type NextPageWithLayout<P = {}, IP = P> = import('next').NextPage<
   P,
   IP
> & {
   getLayout?: (
      page: import('react').ReactElement,
      pageProps: P
   ) => import('react').ReactNode;
};

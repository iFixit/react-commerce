import { GetServerSideProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type GetServerSidePropsMiddleware = <
   P extends { [key: string]: any } = { [key: string]: any },
   Q extends ParsedUrlQuery = ParsedUrlQuery,
   D extends PreviewData = PreviewData
>(
   next: GetServerSideProps<P, Q, D>
) => GetServerSideProps<P, Q, D>;

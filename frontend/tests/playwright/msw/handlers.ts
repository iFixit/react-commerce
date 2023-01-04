import { RequestHandler, graphql } from 'msw';
import { mockedProductQuery } from '@tests/jest/__mocks__/products';

export const handlers: RequestHandler[] = [
   graphql.query('findProduct', async (req, res, ctx) => {
      return res(ctx.data(mockedProductQuery));
   }),
];

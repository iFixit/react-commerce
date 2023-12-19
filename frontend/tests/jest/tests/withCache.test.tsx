import { SentryError } from '@ifixit/sentry';
import { withCache } from '@lib/swr-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

jest.mock('node-fetch');

describe('withCache', () => {
   it('bubbles up thrown errors', async () => {
      const getHandler = async () => {
         const req = {
            body: '',
         } as NextApiRequest;
         const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockResolvedValue({}),
         } as unknown as NextApiResponse;
         const handler = withCache({
            endpoint: 'https://test.myshopify.com/api/graphql',
            statName: 'test_stat_name',
            variablesSchema: z.any(),
            valueSchema: z.any(),
            getFreshValue() {
               throw new SentryError('Expected error!');
            },
         });
         return await handler(req, res);
      };

      try {
         await getHandler();
         expect(true).toBe('Expected error to be thrown');
      } catch (error) {
         expect(error).toBeInstanceOf(SentryError);
      }
   });
});

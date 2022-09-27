import { useRequest } from './request';
import type { SeedResult } from '../../../server/services/seed';

type Input = {
   strapiOrigin: string;
};

type ResponseData = {
   success: boolean;
};

export function useSeed() {
   return useRequest<SeedResult, Input>({
      url: '/addons/seed',
      method: 'POST',
   });
}

import { QueryClient } from '@tanstack/react-query';
import { addonsAPI } from './addons-api';

const defaultQueryFn = async ({ queryKey }) => {
   return addonsAPI.get(queryKey[0]);
};

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         queryFn: defaultQueryFn,
      },
   },
});

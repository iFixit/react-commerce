import React from 'react';
import axiosInstance from '../utils/axiosInstance';
import type { AxiosRequestConfig } from 'axios';

type RequestState = {
   isLoading: boolean;
   error: string | null;
   data: any;
};

type RequestFn = {
   (strapiOrigin?: string): Promise<any>;
};

export function useRequest<T = any>(
   config: AxiosRequestConfig
): [RequestState, RequestFn] {
   const [state, setState] = React.useState<RequestState>({
      isLoading: false,
      error: null,
      data: null,
   });
   const request = React.useCallback(async () => {
      try {
         setState((current) => ({ ...current, isLoading: true }));
         // const result = await axiosInstance.get(endpoint);
         const result = await axiosInstance.request(config);
         setState((current) => {
            return {
               ...current,
               isLoading: false,
               error: null,
               data: result.data,
            };
         });
      } catch (error) {
         setState((current) => ({
            ...current,
            isLoading: false,
            error: error.message,
         }));
      }
   }, []);
   return [state, request];
}

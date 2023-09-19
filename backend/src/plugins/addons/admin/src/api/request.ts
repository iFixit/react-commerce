import React from 'react';
import axiosInstance from '../utils/axiosInstance';
import type { AxiosRequestConfig } from 'axios';

export type RequestState<Data = any> = {
   isLoading: boolean;
   error: string | null;
   data: Data;
};

export type RequestFn<Data = any, Input = any> = {
   (input: Input): Promise<Data>;
};

export function useRequest<Data = any, Input = any>(
   config: AxiosRequestConfig
): [RequestState<Data>, RequestFn<Data, Input>] {
   const [state, setState] = React.useState<RequestState>({
      isLoading: false,
      error: null,
      data: null,
   });
   const request = React.useCallback(async (input: Input) => {
      try {
         setState((current) => ({ ...current, isLoading: true, error: null }));
         const result = await axiosInstance.request({
            ...config,
            data: input,
         });
         setState((current) => {
            return {
               ...current,
               isLoading: false,
               error: null,
               data: result.data,
            };
         });
         return result.data;
      } catch (error: any) {
         setState((current) => ({
            ...current,
            isLoading: false,
            error:
               typeof error.response?.data === 'string'
                  ? error.response.data
                  : error.message,
         }));
      }
   }, []);
   return [state, request];
}

/**
 * This is a custom widget that is used to refresh the search results.
 * The implementation is based on this comment https://github.com/algolia/react-instantsearch/discussions/3483#discussioncomment-2832728.
 * Eventually this widget will make it into the official react-instantsearch
 * package, and we can drop this implementation in favor of the official one.
 */
import { useConnector } from 'react-instantsearch';

type UseSearchCacheState = {
   refresh: () => void;
   widgetParams: any;
};

export function useSearchCache(): UseSearchCacheState {
   return useConnector(connectSearchCache) as any;
}

function connectSearchCache(renderFn: Function, unmountFn = () => {}) {
   return (widgetParams: any) => {
      return {
         $$type: 'custom.cache',
         render(renderOptions: any) {
            const { instantSearchInstance } = renderOptions;

            renderFn(
               {
                  ...this.getWidgetRenderState(renderOptions),
                  instantSearchInstance,
               },
               false
            );
         },
         getWidgetRenderState({
            instantSearchInstance,
         }: any): UseSearchCacheState {
            return {
               refresh: instantSearchInstance.refresh.bind(
                  instantSearchInstance
               ),
               widgetParams,
            };
         },
         dispose() {
            unmountFn();
         },
      };
   };
}

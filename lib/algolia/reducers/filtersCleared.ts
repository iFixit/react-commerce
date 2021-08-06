import { Draft } from 'immer';
import { FiltersClearedAction, SearchState } from '../types';

export function filtersCleared(
   draftState: Draft<SearchState>,
   action: FiltersClearedAction
) {
   clearFilters(draftState, action.filterIds);
}

function clearFilters(draft: Draft<SearchState>, filtersIds?: string[]) {
   if (filtersIds == null) {
      draft.params.filters.allIds = [];
      draft.params.filters.rootIds = [];
      draft.params.filters.byId = {};
   } else {
      draft.params.page = 1;
      filtersIds.forEach((filterId) => {
         const filter = draft.params.filters.byId[filterId];
         if (filter != null) {
            // If it is a list filter then remove also its children
            if (filter.type === 'and' || filter.type === 'or') {
               clearFilters(draft, filter.filterIds);
            }
            // If it has a parent that is a list filter that remove the filter reference from the parent
            if (filter.parentId) {
               const parentFilter = draft.params.filters.byId[filter.parentId];
               if (parentFilter.type === 'and' || parentFilter.type === 'or') {
                  parentFilter.filterIds = parentFilter.filterIds.filter(
                     (id) => id !== filterId
                  );
               }
            }
            draft.params.filters.allIds = draft.params.filters.allIds.filter(
               (id) => id !== filterId
            );
            draft.params.filters.rootIds = draft.params.filters.rootIds.filter(
               (id) => id !== filterId
            );
            delete draft.params.filters.byId[filterId];
         }
      });
   }
}

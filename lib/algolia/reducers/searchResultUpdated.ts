import { Draft } from 'immer';
import {
   FacetValueState,
   SearchState,
   SearchResultUpdatedAction,
} from '../types';
import { generateId, mergeUnique } from '../utils';

export function searchResultUpdated(
   draftState: Draft<SearchState>,
   action: SearchResultUpdatedAction
) {
   const responseFacets = action.data.facets || {};
   const newFacetNames = Object.keys(responseFacets);
   draftState.isLoaded = true;
   draftState.numberOfPages = action.data.nbPages;
   draftState.numberOfHits = action.data.nbHits;
   draftState.hits.allIds = [];
   action.data.hits.forEach((hit) => {
      draftState.hits.byId[hit.objectID] = hit as any;
      draftState.hits.allIds.push(hit.objectID);
   });
   // Update facets
   newFacetNames.forEach((facetName) => {
      const newValues = Object.keys(responseFacets[facetName]);
      const newValueStates = newValues.map<FacetValueState>((value) => {
         const id = generateId(facetName, value);
         const count = responseFacets[facetName][value];
         return {
            id,
            facetId: facetName,
            value,
            filteredHitCount: count,
            totalHitCount:
               draftState.facetValues.byId[id]?.totalHitCount || count,
         };
      });
      const newValueIds = newValueStates.map((valueState) => valueState.id);
      if (draftState.facets.byId[facetName] == null) {
         draftState.facets.byId[facetName] = {
            name: facetName,
            valueIds: newValueIds,
         };
         draftState.facets.allIds.push(facetName);
      } else {
         draftState.facets.byId[facetName].valueIds = mergeUnique(
            draftState.facets.byId[facetName].valueIds,
            newValueIds
         );
      }
      newValueStates.forEach((newValueState) => {
         draftState.facetValues.byId[newValueState.id] = newValueState;
         if (!draftState.facetValues.allIds.includes(newValueState.id)) {
            draftState.facetValues.allIds.push(newValueState.id);
         }
      });
   });
   draftState.facetValues.allIds.forEach((id) => {
      const facetValue = draftState.facetValues.byId[id];
      if (
         action.data.facets?.[facetValue.facetId]?.[facetValue.value] == null
      ) {
         facetValue.filteredHitCount = 0;
      }
   });
}

import type { Reducer } from 'react';

export function withMultipleActions<State = any, Action = any>(
   reducer: Reducer<State, Action>
): Reducer<State, Action | Action[]> {
   return (state, actions) => {
      if (Array.isArray(actions)) {
         return actions.reduce((state, action) => {
            return reducer(state, action);
         }, state);
      }
      return reducer(state, actions);
   };
}

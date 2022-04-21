// The statechart can be visualized here: https://stately.ai/viz?id=1a78f924-f329-4b6c-af20-c0952399409b
import { createMachine, StateMachine } from '@xstate/fsm';
import * as React from 'react';

export interface VirtualAccordionContext<Item = any> {
   items: Item[];
   areRefined: boolean;
   sizeMap: Record<string, number>;
   expandedItemsIds: string[];
   toggledItemId?: string;
   toggledItemDelta?: number;
   shouldResetSizeMap?: boolean;
}

export type VirtualAccordionEvent<Item = any> =
   | { type: 'ITEM_SIZE_UPDATED'; id: string; size: number }
   | { type: 'TOGGLE_ITEM'; id: string }
   | { type: 'TOGGLE_ITEM_ANIMATION_END' }
   | { type: 'ITEMS_CHANGED'; items: Item[]; areRefined: boolean }
   | { type: 'ITEMS_ANIMATION_END' };

export type VirtualAccordionState<Item = any> =
   | {
        value: 'idle';
        context: VirtualAccordionContext<Item> & {
           toggledItemId: undefined;
           toggledItemDelta: undefined;
        };
     }
   | {
        value: 'updateItemSize';
        context: VirtualAccordionContext<Item> & {
           toggledItemId: string;
           toggledItemDelta: undefined;
        };
     }
   | {
        value: 'toggleItemAnimation';
        context: VirtualAccordionContext<Item> & {
           toggledItemId: string;
           toggledItemDelta: number;
        };
     };

export type VirtualAccordionMachineState<Item = any> = StateMachine.State<
   VirtualAccordionContext<Item>,
   VirtualAccordionEvent<Item>,
   VirtualAccordionState<Item>
>;

export interface VirtualAccordionSend<Item = any> {
   (event: VirtualAccordionEvent<Item>): void;
}

export const createVirtualAccordionMachine = <Item = any>(
   context: VirtualAccordionContext<Item>
) =>
   createMachine<
      VirtualAccordionContext<Item>,
      VirtualAccordionEvent<Item>,
      VirtualAccordionState<Item>
   >({
      id: 'virtualAccordion',
      initial: 'idle',
      context,
      states: {
         idle: {
            on: {
               TOGGLE_ITEM: {
                  target: 'updateItemSize',
                  actions: ['toggleItem'],
               },
               ITEMS_CHANGED: {
                  actions: ['setItems'],
               },
               ITEM_SIZE_UPDATED: {
                  actions: ['setItemSize'],
               },
            },
         },
         updateItemSize: {
            on: {
               ITEM_SIZE_UPDATED: [
                  {
                     cond: function isToggledItem(ctx, event) {
                        return ctx.toggledItemId === event.id;
                     },
                     target: 'toggleItemAnimation',
                     actions: ['setItemSize'],
                  },
                  {
                     actions: ['setItemSize'],
                  },
               ],
            },
         },
         toggleItemAnimation: {
            on: {
               TOGGLE_ITEM_ANIMATION_END: {
                  target: 'idle',
               },
               ITEM_SIZE_UPDATED: {
                  actions: ['setItemSize'],
               },
            },
         },
      },
   });

export function useVirtualAccordionMachine<Item = any>(
   context: VirtualAccordionContext<Item>
) {
   const searchMachineRef =
      React.useRef<
         StateMachine.Machine<
            VirtualAccordionContext<Item>,
            VirtualAccordionEvent<Item>,
            VirtualAccordionState<Item>
         >
      >();

   if (searchMachineRef.current == null) {
      searchMachineRef.current = createVirtualAccordionMachine(context);
   }

   return searchMachineRef.current;
}

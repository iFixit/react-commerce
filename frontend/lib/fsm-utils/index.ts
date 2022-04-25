import * as React from 'react';
import {
   EventObject,
   StateMachine,
   Typestate,
   interpret,
   createMachine,
   assign as xstateAssign,
} from '@xstate/fsm';
import produce, { Draft } from 'immer';
import { useIsomorphicLayoutEffect } from '@ifixit/ui';

export type ImmerAssigner<TContext, TEvent extends EventObject> = (
   context: Draft<TContext>,
   event: TEvent
) => void;

export function immerAssign<
   TContext extends object,
   TEvent extends EventObject = EventObject
>(
   recipe: ImmerAssigner<TContext, TEvent>
): StateMachine.AssignActionObject<TContext, TEvent> {
   return xstateAssign((context, event) => {
      return produce(context, (draft) => recipe(draft, event));
   });
}

export function useInterpret<
   TContext extends object,
   TEvent extends EventObject,
   TState extends Typestate<TContext>
>(
   machine: StateMachine.Machine<TContext, TEvent, TState>,
   options?: {
      actions?: StateMachine.ActionMap<TContext, TEvent>;
   }
) {
   const service = useService(machine, options);

   useIsomorphicLayoutEffect(() => {
      service.start();
      return () => {
         service.stop();
      };
   }, []);

   return service;
}

function useService<
   TContext extends object,
   TEvent extends EventObject,
   TState extends Typestate<TContext>
>(
   machine: StateMachine.Machine<TContext, TEvent, TState>,
   options?: {
      actions?: StateMachine.ActionMap<TContext, TEvent>;
   }
) {
   const serviceRef =
      React.useRef<StateMachine.Service<TContext, TEvent, TState>>();

   if (serviceRef.current == null) {
      serviceRef.current = interpret(
         options ? createMachine(machine.config, options) : machine
      );
   }

   React.useEffect(() => {
      if (options) {
         (serviceRef.current as any)._machine._options = options;
      }
   });

   return serviceRef.current;
}

const defaultCompare = <T>(a: T, b: T): boolean => a === b;

export function useSelector<
   TContext extends object,
   TEvent extends EventObject,
   TState extends Typestate<TContext>,
   T
>(
   service: StateMachine.Service<TContext, TEvent, TState>,
   selector: (state: StateMachine.State<TContext, TEvent, TState>) => T,
   compare: (a: T, b: T) => boolean = defaultCompare,
   getSnapshot: (
      a: StateMachine.Service<TContext, TEvent, TState>
   ) => StateMachine.State<TContext, TEvent, TState> = getServiceState
): T {
   const [selected, setSelected] = React.useState(() =>
      selector(getSnapshot(service))
   );
   const selectedRef = React.useRef<T>(selected);

   React.useEffect(() => {
      const updateSelectedIfChanged = (nextSelected: T) => {
         if (!compare(selectedRef.current, nextSelected)) {
            setSelected(nextSelected);
            selectedRef.current = nextSelected;
         }
      };

      const initialSelected = selector(getSnapshot(service));
      updateSelectedIfChanged(initialSelected);

      const sub = service.subscribe((emitted) => {
         const nextSelected = selector(emitted);
         updateSelectedIfChanged(nextSelected);
      });

      return () => sub.unsubscribe();
   }, [compare, getSnapshot, selector, service]);

   return selected;
}

const getServiceState = <
   TContext extends object,
   TEvent extends EventObject = EventObject,
   TState extends Typestate<TContext> = { value: any; context: TContext }
>(
   service: StateMachine.Service<TContext, TEvent, TState>
): StateMachine.State<TContext, TEvent, TState> => {
   let currentValue: StateMachine.State<TContext, TEvent, TState>;
   service
      .subscribe((state) => {
         currentValue = state;
      })
      .unsubscribe();
   return currentValue!;
};

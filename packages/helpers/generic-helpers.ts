import { log } from './logger';

export function assertNever(x: never): never {
   throw new Error('Unexpected object: ' + x);
}

export function isRecord(val: any): val is Record<string, unknown> {
   return val != null && typeof val === 'object';
}

const isProduction = process.env.NODE_ENV === 'production';
const enableLogging = Boolean(process.env.NEXT_PUBLIC_LOGGING);
const prefix = 'invariant failed';

export function invariant(
   condition: any,
   message?: string | (() => string)
): asserts condition {
   if (condition) {
      return;
   }

   if (isProduction) {
      throw new Error(prefix);
   }

   const provided: string | undefined =
      typeof message === 'function' ? message() : message;

   const value: string = provided ? `${prefix}: ${provided}` : prefix;
   throw new Error(value);
}

export function isError(x: any): x is Error {
   return x instanceof Error;
}

export function timeAsync<T>(
   name: string,
   asyncFunction: () => Promise<T>
): Promise<T> {
   const done = time(name);
   return asyncFunction().finally(done);
}

export function timeSync<T>(name: string, syncFunction: () => T): T {
   const done = time(name);
   const response = syncFunction();
   done();
   return response;
}

export function withTiming<ARGS extends Array<any>, RETURN>(
   name: string,
   promiseFunction: (...args: ARGS) => Promise<RETURN>
) {
   return (...args: ARGS) => {
      const done = time(name);
      return promiseFunction(...args).finally(done);
   };
}

export function withSyncTiming<ARGS extends Array<any>, RETURN>(
   name: string,
   syncFunction: (...args: ARGS) => RETURN
) {
   return (...args: ARGS) => {
      const done = time(name);
      const ret = syncFunction(...args);
      done();
      return ret;
   };
}

function noOp() {}
const silentTimer = function (timerName: string) {
   return noOp;
};

const loggingTimer = (timerName: string) => {
   const t = performance.now();
   return () => {
      const taken = performance.now() - t;
      log.info.timing(timerName, taken);
   };
};

type Timer = (name: string) => () => void;
const time: Timer = !isProduction || enableLogging ? loggingTimer : silentTimer;

export function isBlank(value: unknown): boolean {
   return (
      value == null ||
      isBlankString(value) ||
      isBlankArray(value) ||
      isBlankObject(value)
   );
}

function isBlankString(value: unknown): boolean {
   return typeof value === 'string' && value.trim() === '';
}

function isBlankArray(value: unknown): boolean {
   return Array.isArray(value) && value.length === 0;
}

function isBlankObject(value: unknown): boolean {
   return (
      typeof value === 'object' &&
      value != null &&
      Object.keys(value).length === 0
   );
}

export function isPresent(text: string | null | undefined): text is string {
   return typeof text === 'string' && text.length > 0;
}

export function presence(text: string | null | undefined): string | null {
   return isPresent(text) ? text : null;
}

export function filterNullableItems<I>(
   items?: I[] | undefined | null
): NonNullable<I>[] {
   return (items?.filter((item) => item != null) as any) || [];
}

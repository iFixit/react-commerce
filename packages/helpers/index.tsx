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

export function logAsync<T>(
   name: string,
   asyncFunction: () => Promise<T>
): Promise<T> {
   const done = time(name);
   return asyncFunction().finally(done);
}

/**
 * Wrap a promise-returning function and logs the time it takes to resolve
 * the promise.
 */
export function logAsyncWrap<Args extends any[], T>(
   name: string,
   asyncFunction: (...args: Args) => Promise<T>
): (...args: Args) => Promise<T> {
   return (...args) => {
      const done = time(name);
      return asyncFunction(...args).finally(done);
   };
}

export function logSync<T>(name: string, syncFunction: () => T): T {
   const done = time(name);
   const response = syncFunction();
   done();
   return response;
}

function noOp() {}
const silentTimer = function (timerName: string) {
   return noOp;
};

const loggingTimer = (timerName: string) => {
   const t = Date.now();
   return () => {
      const taken = Date.now() - t;
      console.log(`${timerName}: ${taken}ms`);
   };
};

type Timer = (name: string) => () => void;
const time: Timer = !isProduction || enableLogging ? loggingTimer : silentTimer;

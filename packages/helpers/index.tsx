export function assertNever(x: never): never {
   throw new Error('Unexpected object: ' + x);
}

export function isRecord(val: any): val is Record<string, unknown> {
   return val != null && typeof val === 'object';
}

const isProduction = process.env.NODE_ENV === 'production';
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

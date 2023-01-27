export interface Logger {
   info: (message: string) => void;
   success: (message: string) => void;
   warning: (message: string) => void;
   error: (message: string) => void;
   timing: (statName: string, ms: number) => void;
   event: (statName: string) => void;
}

export const log: Logger = {
   info: (message) => console.log(message),
   success: (message) => console.log(`\x1b[32m${message}\x1b[0m`),
   warning: (message) => console.log(`\x1b[33m${message}\x1b[0m`),
   error: (message) => console.log(`\x1b[31m${message}\x1b[0m`),
   timing: (statName: string, ms: number) =>
      console.log(`${statName} => ${ms.toFixed(2)}ms`),
   event: (eventName: string) => console.log(`event ${eventName} -> 1`),
};

export const nullLog: Logger = {
   info: () => {},
   success: () => {},
   warning: () => {},
   error: () => {},
   timing: () => {},
   event: () => {},
};

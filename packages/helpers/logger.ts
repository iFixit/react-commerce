type Log = typeof console.log;
type ExtendedLog = Log & {
   timing: (statName: string, ms: number) => void;
   event: (statName: string) => void;
};

export interface Logger {
   info: ExtendedLog;
   success: ExtendedLog;
   warning: ExtendedLog;
   error: ExtendedLog;
}

const colorless = Boolean(process.env.COLORLESS_LOGS);

const colorlessLogger = withExtensions(console.log);

export const log: Logger = colorless
   ? {
        info: colorlessLogger,
        success: colorlessLogger,
        warning: colorlessLogger,
        error: colorlessLogger,
     }
   : {
        info: colorlessLogger,
        success: withExtensions((message: string) =>
           console.log(`\x1b[32m${message} \x1b[0m`)
        ),
        warning: withExtensions((message: string) =>
           console.log(`\x1b[33m${message} \x1b[0m`)
        ),
        error: withExtensions((message: string) =>
           console.log(`\x1b[31m${message} \x1b[0m`)
        ),
     };

function withExtensions(logger: Log): ExtendedLog {
   const extendedLog = (message: string) => logger(message);
   extendedLog.timing = (statName: string, ms: number) =>
      logger(`${statName} => ${ms.toFixed(2)}ms`);
   extendedLog.event = (eventName: string) => logger(`event ${eventName} -> 1`);
   return extendedLog;
}

import { format } from 'util';

process.on('exit', flush);

const buffer = {
   info: {
      logger: console.info.bind(console),
      data: [] as string[],
   },
   log: {
      logger: console.log.bind(console),
      data: [] as string[],
   },
   warn: {
      logger: console.warn.bind(console),
      data: [] as string[],
   },
   error: {
      logger: console.error.bind(console),
      data: [] as string[],
   },
};
const methods = Object.keys(buffer) as Array<keyof typeof buffer>;

methods.forEach((method) => {
   console[method] = function () {
      // @ts-ignore
      buffer[method].data.push(format.apply(this, arguments));
   };
});

export function flush() {
   methods.forEach((method) => {
      if (buffer[method].data.length) {
         buffer[method].logger(buffer[method].data.join('\n'));
      }
      buffer[method].data = [];
   });
}

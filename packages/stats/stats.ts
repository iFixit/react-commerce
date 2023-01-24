import StatsD from 'hot-shots';

import { withLogging } from '@ifixit/helpers';

const STATSD_HOST = process.env.STATSD_HOST;

export const stats = new StatsD({
   // When unset, will just log the stats
   mock: !STATSD_HOST,
   host: STATSD_HOST || '127.0.0.1',
   protocol: 'udp',
   port: 8125,
   cacheDns: true,
});

if (!STATSD_HOST) {
   console.log('Mocking stats. Will log instead of send');
   setInterval(() => {
      if (!stats.mockBuffer?.length) {
         return;
      }

      stats.mockBuffer.forEach((line) => {
         console.log(`Stat: ${line}`);
      });
      stats.mockBuffer = [];
   }, 500);
} else {
   console.log(`Sending statsd stats to ${STATSD_HOST}`);
}

export function timeAsync<Return>(
   statName: string,
   promiseFunc: () => Promise<Return>
): Promise<Return> {
   return withTiming(statName, promiseFunc)();
}

export function withTiming<Args extends unknown[], Return>(
   statName: string,
   promiseFunc: (...args: Args) => Promise<Return>
) {
   return withLogging(statName, stats.asyncTimer(promiseFunc, statName));
}

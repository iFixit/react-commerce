import StatsD from 'hot-shots';

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
   console.log("Mocking stats. Will log instead of send");
   setInterval(() => {
      if (!stats.mockBuffer?.length) {
         return;
      }

      stats.mockBuffer.forEach((line) => {
         console.log(`Stat: ${line}`);
      });
      stats.mockBuffer = [];
   }, 500);
}

export function timeAsync<T>(statName: string, promiseFunc: () => Promise<T>): Promise<T> {
   const t = Date.now();
   const result = promiseFunc();
   result.then(() => {
      stats.distribution(statName, (Date.now() - t) / 1e3);
   });
   return result;
}

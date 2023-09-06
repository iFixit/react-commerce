/*
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { HttpsAgent } from 'agentkeepalive';

const proxy = httpProxy.createProxyServer({
   secure: true,
   changeOrigin: true,
   agent: new HttpsAgent(),
});

const handler: NextApiHandler = async (
   req: NextApiRequest,
   res: NextApiResponse
) => {
   const dest = `https://proxy-us-east.ifixit.com/health-check${req.url}`;
   proxy.web(req, res, { target: dest });
};

export const config = {
   api: {
      bodyParser: false,
      externalResolver: true,
   },
};

export default handler;

*/

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (
   req: NextApiRequest,
   _res: NextApiResponse
) => {
   const headers = getFetchHeaders(
      // @ts-ignore
      Array.from(req.headers.entries()) as [string, string][]
   );
   //headers.push(['host', 'proxy-us-east.ifixit.com']);
   const fetchOpts = {
      method: req.method,
      body: req.body,
      keepalive: true,
      headers: headers,
   };
   console.log(fetchOpts);
   const dest = `https://proxy-us-east.ifixit.com/health-check${req.url}`;
   return fetch(dest, fetchOpts);
};

function getFetchHeaders(reqHeaders: Generator<string, void, void>) {
   const result: Array<[string, string]> = [];
   // @ts-ignore
   for (const [key, value] of reqHeaders) {
      if (key === 'host') {
         continue;
      }
      result.push([key, value]);
   }
   return result;
}

export const config = {
   api: {
      externalResolver: true,
      bodyParser: false,
   },
   runtime: 'edge',
};

export default handler;

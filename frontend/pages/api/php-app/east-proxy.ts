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

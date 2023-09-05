import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
   secure: true,
   changeOrigin: true,
});

const handler: NextApiHandler = async (
   req: NextApiRequest,
   res: NextApiResponse
) => {
   const dest = `https://proxy-us-east.ifixit.com/health-check${req.url}`;
   proxy.web(req, res, { target: dest });
};

export default handler;

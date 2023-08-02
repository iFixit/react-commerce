import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
   res.status(200).json({ version: '3.0' });
};

export default handler;

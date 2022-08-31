import { NextApiRequest, NextApiResponse } from 'next';
import checkMePost from '@utils/api/me.post';

const checkMeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') return checkMePost(req, res);
    return res.status(405).json({ message: 'Method not allowed' });
};

export default checkMeHandler;

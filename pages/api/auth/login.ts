import { NextApiRequest, NextApiResponse } from 'next';
import loginPost from '@utils/api/login.post';

const loginHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') return loginPost(req, res);
    return res.status(405).json({ message: 'Method not allowed' });
};

export default loginHandler;

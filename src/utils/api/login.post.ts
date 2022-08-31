import checkCredentials from '@utils/api/checkCredentials';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const loginPost = (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error('No credentials');
        }
        if (checkCredentials({ username, password })) {
            const token = jwt.sign(username, process.env.SECRET as string);
            req.headers.authorization = `Bearer ${token}`;

            return res.status(200).json({
                message: 'Login successful',
                isAuth: true,
                token,
            });
        }

        throw new Error('Invalid credentials');
    } catch (error) {
        return res.status(500).json({ errors: (error as Error).message });
    }
};

export default loginPost;

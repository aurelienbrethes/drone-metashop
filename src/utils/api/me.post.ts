import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const checkMePost = (req: NextApiRequest, res: NextApiResponse) => {
    let token = req.headers.authorization?.split(' ')[1];

    try {
        if (!token) throw new Error('No token provided');
        jwt.verify(token, process.env.SECRET as string);
    } catch (error) {
        token = jwt.sign(
            { username: 'Metashop' },
            process.env.SECRET as string,
            {
                expiresIn:
                    process.env.NEXT_PUBLIC_JWT_EXPIRATION_TIME || 60 * 30,
            },
        );
    }

    return res.status(200).json({
        message: 'Check successful',
        isAuth: true,
        token,
    });
};

export default checkMePost;

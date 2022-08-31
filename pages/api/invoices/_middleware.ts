/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: NextRequest) => {
    const token = req.headers.get('Authorization');

    const next = NextResponse.next();

    if (token) {
        const decoded = jwt.verify(
            token.split(' ')[1],
            process.env.SECRET as string,
        );
        if (!decoded) return new Response('Unauthorized', { status: 403 });
        return next;
    }
    return new Response('Unauthorized', { status: 403 });
};

export default authMiddleware;

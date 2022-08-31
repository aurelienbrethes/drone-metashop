/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: NextRequest) => {
    try {
        const authorization = req.headers.get('Authorization');

        if (!authorization) throw new Error('No Authorization Header');

        const token = authorization.split(' ')[1];

        if (!token) throw new Error('No token');

        const decoded = jwt.verify(token, process.env.SECRET as string);
        if (!decoded) return new Error('Unreadable token');

        return NextResponse.next();
    } catch (e) {
        return new Response(JSON.stringify({ message: (e as Error).message }), {
            status: 401,
        });
    }
};

export default authMiddleware;

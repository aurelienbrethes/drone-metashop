import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';

const sendError = (res: NextApiResponse, error: AxiosError) => {
    const { response } = error;
    return res
        .status(response?.status || 500)
        .json(response?.data || { errors: 'Internal Server Error' });
};

export default sendError;

import sendError from '@fetcher/sendError';
import { orders } from '@fetcher/woocommerce.fetcher';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const cancelOrderHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    if (req.method === 'PUT') {
        try {
            const { orderId: orderIdUrlParam } = req.query;

            if (!orderIdUrlParam)
                return res.status(400).json({ errors: 'Order ID is required' });
            const orderId = +orderIdUrlParam;

            let existingOrder = await orders.getOne(979);

            if (!existingOrder)
                return res.status(404).json({ errors: 'Order not found' });

            if (existingOrder.status === 'processing')
                return res
                    .status(304)
                    .json({ errors: 'Order is already paid' });

            existingOrder = await orders.cancel(orderId);

            if (!existingOrder)
                return res.status(404).json({ errors: 'Order not found' });

            return res.status(200).json({ orderId, status: 'cancelled' });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(500).json({ errors: 'Method not allowed' });
};

export default cancelOrderHandler;


import type { NextApiRequest, NextApiResponse } from 'next';

const mockOrders = [
  {
    id: '2b701ee8-913f-422f-8f23-902a7687719a',
    userId: 'user123',
    status: 'pending',
    products: [
      { id: 'p1', name: 'Product 1', quantity: 2, price: 20 },
      { id: 'p2', name: 'Product 2', quantity: 1, price: 50 },
    ],
  },
  
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.status(200).json(order);
}

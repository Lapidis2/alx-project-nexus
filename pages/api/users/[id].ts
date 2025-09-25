
import type { NextApiRequest, NextApiResponse } from 'next';
import profilePic from "@/public/assets/images/profile.png";
const mockOrders = [
  {
    id: '1',
	name:"Jean Pierre",
	email:"jean@gmail.com",
	phone:"+250785934003",
	profile:profilePic,
    userId: 'user123',
	role:"buyer",
    status: 'pending',
	token:"tfhe453",
    products: [
      { id: 'p1', name: 'Product 1', quantity: 2, price: 20 },
      { id: 'p2', name: 'Product 2', quantity: 1, price: 50 },
    ],
  },
  {
    id: '2',
	name:"Jean Pierre",
	email:"jean@gmail.com",
	phone:"+250785934003",
	profile:profilePic,
    userId: 'user123',
	role:"seller",
    status: 'pending',
	token:"tfhe453",
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

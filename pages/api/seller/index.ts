// pages/api/seller/products.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Product = {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

const products: Product[] = [
  {
    id: 'prod1',
    sellerId: 'seller1',
    name: 'Smart Watch',
    description: 'A cool smartwatch with many features.',
    price: 199.99,
    stock: 10,
    image: '/assets/images/products/watch1.jpg',
  },
  {
    id: 'prod2',
    sellerId: 'seller1',
    name: 'Wireless Earbuds',
    description: 'High quality wireless earbuds.',
    price: 99.99,
    stock: 25,
    image: '/assets/images/products/headphone.png',
  },
  {
    id: 'prod3',
    sellerId: 'seller2',
    name: '4K TV',
    description: 'Ultra HD 4K television.',
    price: 499.99,
    stock: 5,
    image: '/assets/images/products/tv.png',
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { message: string }>
) {
  if (req.method === 'GET') {
    const { sellerId } = req.query;

    if (typeof sellerId === 'string') {
 
      const sellerProducts = products.filter(
        (product) => product.sellerId === sellerId
      );
      res.status(200).json(sellerProducts);
    } else {
  
      res.status(200).json(products);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  productId: string;
  name: string;
  totalRevenue: number;
};

const topProducts: Product[] = [
  { productId: "1", name: "Wireless Headphones", totalRevenue: 1500 },
  { productId: "2", name: "Smart Watch", totalRevenue: 1200 },
  { productId: "3", name: "Gaming Mouse", totalRevenue: 950 },
  { productId: "4", name: "Mechanical Keyboard", totalRevenue: 800 },
  { productId: "5", name: "USB-C Hub", totalRevenue: 650 },
  { productId: "6", name: "4K Monitor", totalRevenue: 500 },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {

  setTimeout(() => {
    res.status(200).json(topProducts);
  }, 500);
}

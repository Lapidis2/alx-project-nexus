import type { NextApiRequest, NextApiResponse } from "next";

const products = [
  { id: "1", name: "Headphone", category: "Electronics" },
  { id: "2", name: "Phone", category: "Electronics" },
  { id: "3", name: "Tablet", category: "Electronics" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id);
  res.status(200).json(similar);
}

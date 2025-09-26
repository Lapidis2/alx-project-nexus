import type { NextApiRequest, NextApiResponse } from "next";

interface Review {
  id: number;
  user: string;
  comment: string;
}

const reviews: Record<string, Review[]> = {
  "1": [
    { id: 1, user: "Alice", comment: "Great product!" },
    { id: 2, user: "Bob", comment: "Good value for money." },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing product id" });
  }

  const productId = Array.isArray(id) ? id[0] : id; 

  if (!reviews[productId]) {
    return res.status(404).json({ message: "Reviews not found" });
  }

  res.status(200).json(reviews[productId]);
}

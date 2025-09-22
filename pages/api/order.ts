import type { NextApiRequest, NextApiResponse } from "next";


const orders = [
  { id: 1, status: "pending", total: 100, date: "2025-09-22" },
  { id: 2, status: "delivered", total: 250, date: "2025-09-21" },
  { id: 3, status: "cancelled", total: 50, date: "2025-09-20" },
  { id: 4, status: "delivered", total: 400, date: "2025-09-18" },
  { id: 5, status: "pending", total: 75, date: "2025-09-15" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).json(orders);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

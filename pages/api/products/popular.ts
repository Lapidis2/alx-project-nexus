import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db("shopDB");

    const popularProducts = await db
      .collection("products")
      .find({ isPopular: true }) 
      .limit(8) 
      .toArray();

    const mapped = popularProducts.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return res.status(200).json(mapped);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return res.status(500).json({ error: "Failed to fetch popular products" });
  }
}

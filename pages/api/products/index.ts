import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("shopDB");

  if (req.method === "GET") {
    const products = await db.collection("products").find({}).toArray();

    
    const mapped = products.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return res.status(200).json(mapped);
  }

  if (req.method === "POST") {
    const newProduct = req.body;
    if (!newProduct.images) newProduct.images = [];

    const result = await db.collection("products").insertOne(newProduct);

    return res.status(201).json({
      id: result.insertedId.toString(),
      ...newProduct,
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

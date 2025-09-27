
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("shopDB");

  if (req.method === "GET") {
    const products = await db.collection("products").find({}).toArray();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const newProduct = req.body;
    if (!newProduct.images) newProduct.images = [];
    const result = await db.collection("products").insertOne(newProduct);
    return res.status(201).json({ ...newProduct, _id: result.insertedId });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

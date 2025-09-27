import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("lapidis");

    if (req.method === "POST") {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await db.collection("products").insertOne({
        name,
        description: description || "",
        createdAt: new Date(),
      });

      return res.status(201).json({ message: "Product created", productId: result.insertedId });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

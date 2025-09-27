
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("shopDB");
  const { id } = req.query;

  if (!ObjectId.isValid(id as string)) return res.status(400).json({ message: "Invalid ID" });

  switch (req.method) {
    case "GET":
      const product = await db.collection("products").findOne({ _id: new ObjectId(id as string) });
      return res.status(200).json(product);

    case "PUT":
      const updated = req.body;
      if (!updated.images) updated.images = [];
      await db.collection("products").updateOne(
        { _id: new ObjectId(id as string) },
        { $set: updated }
      );
      return res.status(200).json({ message: "Updated" });

    case "DELETE":
      await db.collection("products").deleteOne({ _id: new ObjectId(id as string) });
      return res.status(200).json({ message: "Deleted" });

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

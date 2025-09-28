import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db("shopDB");
  const { id } = req.query;


  if (!ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const objectId = new ObjectId(id as string);

  try {
    switch (req.method) {
      case "GET": {
        const rawProduct = await db.collection("products").findOne({ _id: objectId });

        if (!rawProduct) {
          return res.status(404).json({ message: "Product not found" });
        }

        const { _id, ...rest } = rawProduct;

        const product = {
          ...rest,
          id: _id.toString(), 
        };

        return res.status(200).json(product);
      }

      case "PUT": {
        const updated = req.body;

       
        if ("_id" in updated) {
          delete updated._id;
        }

        await db.collection("products").updateOne(
          { _id: objectId },
          { $set: updated }
        );

        return res.status(200).json({ message: "Product updated successfully" });
      }

      case "DELETE": {
        await db.collection("products").deleteOne({ _id: objectId });
        return res.status(200).json({ message: "Product deleted successfully" });
      }

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

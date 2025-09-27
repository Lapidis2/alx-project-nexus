import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo";
import { CartItem, Cart } from "@/interfaces";
import { getUserFromToken } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userId = user.userId;
    const userEmail = user.email; 

    const client = await clientPromise;
    const db = client.db("lapidis");
    const carts = db.collection<Cart>("carts");


    if (req.method === "GET") {
      const cart = await carts.findOne({ userId });
      return res.status(200).json(cart || { userId, email: userEmail, items: [] });
    }


    if (req.method === "POST") {
      const { item } = req.body;
      if (!item || !item.productId || !item.quantity)
        return res.status(400).json({ message: "Missing item.productId or item.quantity" });

      const productId = String(item.productId);
      const quantity = Number(item.quantity);

    
      const incResult = await carts.updateOne(
        { userId, "items.productId": productId },
        { $inc: { "items.$.quantity": quantity }, $set: { updatedAt: new Date(), email: userEmail } }
      );

  
      if (incResult.matchedCount === 0) {
        const newItem: CartItem = {
          productId,
          quantity,
          name: item.name || "",
          price: item.price || 0,
          img: item.img || "/placeholder.png",
          addedAt: new Date().toISOString(), 
        };

        await carts.updateOne(
          { userId },
          { $push: { items: newItem }, $set: { updatedAt: new Date(), email: userEmail } },
          { upsert: true }
        );
      }

      const updatedCart = await carts.findOne({ userId });
      return res.status(200).json({ message: "Cart updated", cart: updatedCart });
    }

  
    if (req.method === "DELETE") {
      const productIdParam = req.query.productId || req.body?.productId;

      if (productIdParam) {
        const productId = String(productIdParam);

        await carts.updateOne(
          { userId },
          { $pull: { items: { productId } }, $set: { updatedAt: new Date(), email: userEmail } }
        );
        return res.status(200).json({ message: "Item removed" });
      } else {
        const del = await carts.deleteOne({ userId });
        return res.status(200).json({ message: "Cart deleted", deletedCount: del.deletedCount });
      }
    }

    
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    console.error("Cart API error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

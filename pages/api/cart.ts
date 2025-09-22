import type { NextApiRequest, NextApiResponse } from "next";

let cart = [
  { id: 1, name: "HeadPhones", price: 2000, quantity: 2, img: "/assets/images/products/headphone.jpg" },
  { id: 2, name: "Phone", price: 5000, quantity: 1, img: "/assets/images/products/phone.png" }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(cart);
  } else if (req.method === "POST") {
    const newItem = req.body;
    cart.push(newItem);
    res.status(201).json(newItem);
  } else if (req.method === "PATCH") {
    const { id, quantity } = req.body;
    cart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    res.status(200).json({ success: true });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    cart = cart.filter((item) => item.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

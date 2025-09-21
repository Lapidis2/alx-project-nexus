
import type { NextApiRequest, NextApiResponse } from "next";
const products = [
	{ id: "1", name: "HeadPhones", price: 1200, image: "/assets/images/products/headphone.jpg", description: "High-end laptop", quantity: 10, Vendor: { storeName: "Tech Store" } },
	{ id: "2", name: "Phone", price: 800, image: "/assets/images/products/phone.png", description: "Latest smartphone", quantity: 15, Vendor: { storeName: "Phone World" } },
	{ id: "3", name: "Tablet", price: 500, image: "/assets/images/products/shoes.jpg", description: "Lightweight tablet", quantity: 8, Vendor: { storeName: "Gadget Shop" } },
	{ id: "4", name: "Phone", price: 800, image: "/assets/images/products/phone.png", description: "Latest smartphone", quantity: 15, Vendor: { storeName: "Phone World" } }
  ];
  

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products);
}

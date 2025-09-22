import type { NextApiRequest, NextApiResponse } from "next";
let order = {
	id: "12345",
	status: "pending",
	createdAt: "2025-09-22T10:00:00Z",
	expectedDeliveryDate: "2025-09-29T10:00:00Z",
	deliveryAddress: {
	  city: "Kigali",
	  street: "KG 7 Ave",
	},
	contactName: "Jean Pierre",
	email: "jean@example.com",
	phoneNumber: "+250788123456",
	products: [
	  { productName: "Chicken Feed", quantity: 2, price: 20, total: 40 },
	  { productName: "Egg Incubator", quantity: 1, price: 150, total: 150 },
	],
  };
  
  export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method, query } = req;
	const { id } = query;
  
	switch (method) {
	  case "GET":
		if (id !== order.id) {
		  return res.status(404).json({ message: "Order not found" });
		}
		return res.status(200).json(order);
  
	  case "PATCH":
		const { status } = req.body;
		if (!status) {
		  return res.status(400).json({ message: "Status is required" });
		}
  
		const validStatuses = ["pending", "processing", "shipped", "delivered"];
		if (!validStatuses.includes(status)) {
		  return res.status(400).json({ message: "Invalid status" });
		}
  
		order.status = status;
		console.log(`Order ${order.id} status updated to ${status}`);
  
		return res.status(200).json({ message: "Status updated", status });
  
	  default:
		res.setHeader("Allow", ["GET", "PATCH"]);
		return res.status(405).end(`Method ${method} Not Allowed`);
	}
  }
  
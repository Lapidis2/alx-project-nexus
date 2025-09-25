import type { NextApiRequest, NextApiResponse } from "next";

const mockOrders = [
	{
	  orderId: "01",
	  orderDate: "2025-09-24",
	  expectedDeliveryDate: "2025-09-24",
	  status: "pending",
	  items: [
		{ name: "Product A", qty: 2, price: 200 },
		{ name: "Product B", qty: 1, price: 100 },
	  ],
	},
	{
	  orderId: "02",
	  orderDate: "2025-09-24",
	  expectedDeliveryDate: "2025-09-27",
	  status: "processing",
	  items: [{ name: "Car", qty: 1, price: "150" }],
	},
	{
		orderId: "03",
		orderDate: new Date("2025-09-24"),
		expectedDeliveryDate: new Date("2025-09-26"),
		status: "delivered",
		items: [
			{ name: "shoes", qty: 2, price: 200 },
			{ name: "watch ", qty: 1, price: 100 },
		  ],
	  },
	  {
		orderId: "04",
		orderDate: new Date("2025-09-20"),
		expectedDeliveryDate: new Date("2025-09-23"),
		status: "cancelled",
		items: [
			{ name: "Phone", qty: 2, price: 200 },
			{ name: "Shoes", qty: 1, price: 100 },
		  ],
	  },
  ];
  

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const order = mockOrders.find((o) => o.orderId === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(order);
}

import React from "react";
import OrderTable from "./OrderComponent";

interface Order {
  orderId: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  status: "pending" | "processing" | "cancelled" | "delivered";
  imageUrl?: string;
}

const OrderComponent: React.FC = () => {
  const orders: Order[] = [
    {
      orderId: "01",
      orderDate: new Date("2025-09-24"),
      expectedDeliveryDate: new Date("2025-09-24"),
      status: "pending",
    },
    {
      orderId: "02",
      orderDate: new Date("2025-09-24"),
      expectedDeliveryDate: new Date("2025-09-27"),
      status: "processing",
    },
    {
      orderId: "03",
      orderDate: new Date("2025-09-24"),
      expectedDeliveryDate: new Date("2025-09-26"),
      status: "delivered",
    },
    {
      orderId: "04",
      orderDate: new Date("2025-09-20"),
      expectedDeliveryDate: new Date("2025-09-23"),
      status: "cancelled",
    },
  ];


  const ordersFromApi = orders.map((order) => ({
    ...order,
    orderDate: order.orderDate.toISOString(),
    expectedDeliveryDate: order.expectedDeliveryDate.toISOString(),
  }));

  return (
	<main className="font-outfit px-4 md:px-8 py-6 w-full max-w-5xl mx-auto">
	<h1 className="text-2xl md:text-3xl font-semibold mb-6">My Orders</h1>
  
	<section aria-label="User Orders">
	  <OrderTable orders={ordersFromApi} />
	</section>
  </main>
  
  );
};

export default OrderComponent;

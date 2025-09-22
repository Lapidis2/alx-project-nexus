import React from "react";
import OrderTable from "./OrderComponent";

interface Order {
  orderId: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  status: "pending" | "processing" | "shipped" | "delivered";
}

const OrderComponent: React.FC = () => {
  const orders: Order[] = [
    {
      orderId: "01",
      orderDate: new Date("2024-05-24"),
      expectedDeliveryDate: new Date("2024-05-24"),
      status: "pending",
    },
    {
      orderId: "02",
      orderDate: new Date("2024-05-24"),
      expectedDeliveryDate: new Date("2024-05-25"),
      status: "processing",
    },
    {
      orderId: "03",
      orderDate: new Date("2024-05-24"),
      expectedDeliveryDate: new Date("2024-05-26"),
      status: "delivered",
    },
  ];

  return (
    <main className="font-outfit px-4 md:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">My Orders</h1>
      <section aria-label="User Orders">
        <OrderTable orders={orders} />
      </section>
    </main>
  );
};

export default OrderComponent;

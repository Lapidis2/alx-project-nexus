"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface StatusProps {
  status: "pending" | "processing" | "cancelled" | "delivered";
}

const StatusIndicator: React.FC<StatusProps> = ({ status }) => {
  const colorClass =
    status === "pending"
      ? "bg-yellow-400"
      : status === "processing"
      ? "bg-blue-400"
      : status === "cancelled"
      ? "bg-red-600"
      : status === "delivered"
      ? "bg-green-400"
      : "bg-gray-500";

  return <span className={`inline-block w-3 h-3 rounded-full ${colorClass} mr-2`} />;
};


interface OrderProps {
  orderId: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  status: "pending" | "processing" | "cancelled" | "delivered";
  imageUrl?: string;
}

const Order: React.FC<OrderProps> = ({
  orderId,
  orderDate,
  expectedDeliveryDate,
  status,
  imageUrl,
}) => {
 

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(
      date
    );

  return (
    <article className="bg-gray-50 hover:shadow-md rounded-lg p-6 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full items-start md:items-center">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`Order ${orderId}`}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
        )}

        <div>
          <p className="text-xs text-gray-400">Order No.</p>
          <p className="font-medium">{orderId}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Order Date</p>
          <time dateTime={orderDate.toISOString()}>{formatDate(orderDate)}</time>
        </div>

        <div>
          <p className="text-xs text-gray-400">Expected Delivery</p>
          <time dateTime={expectedDeliveryDate.toISOString()}>{formatDate(expectedDeliveryDate)}</time>
        </div>

        <div className="flex items-center gap-2">
          <StatusIndicator status={status} />
          <span className="capitalize">{status}</span>
        </div>
      </div>

      <div className="mt-4 md:mt-0">
	  <Link href={`/orders/${orderId}`}>
  <button className="text-blue-500 hover:underline text-sm">
    View Details
  </button>
</Link>
      </div>
    </article>
  );
};

// OrderTable component
interface OrderFromApi {
  orderId: string;
  orderDate: string;
  expectedDeliveryDate: string;
  status: "pending" | "processing" | "cancelled" | "delivered";
  imageUrl?: string;
}

interface OrderTableProps {
  orders: OrderFromApi[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  if (!orders.length) {
    return <p className="text-center py-10 text-gray-500">No orders found.</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {orders.map((order) => (
        <Order
          key={order.orderId}
          orderId={order.orderId}
          orderDate={new Date(order.orderDate)}
          expectedDeliveryDate={new Date(order.expectedDeliveryDate)}
          status={order.status}
          imageUrl={order.imageUrl}
        />
      ))}
    </section>
  );
};

export default OrderTable;

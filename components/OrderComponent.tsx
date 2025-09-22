import React from "react";
import Image from "next/image";

interface Props {
  status: "pending" | "processing" | "shipped" | "delivered";
}

const StatusIndicator: React.FC<Props> = ({ status }) => {
  const colorClass =
    status === "pending"
      ? "bg-yellow-400"
      : status === "processing"
      ? "bg-blue-400"
      : status === "shipped"
      ? "bg-orange-400"
      : status === "delivered"
      ? "bg-green-400"
      : "bg-gray-500";

  return <span className={`inline-block w-3 h-3 rounded-full ${colorClass} mr-2`} />;
};

interface OrderProps {
  status: "pending" | "processing" | "shipped" | "delivered";
  orderId: string;
  expectedDeliveryDate: Date;
  orderDate: Date;
  imageUrl?: string; // optional order image
}

const Order: React.FC<OrderProps> = ({
  orderId,
  orderDate,
  expectedDeliveryDate,
  status,
  imageUrl,
}) => {
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);

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
        <button className="text-blue-500 hover:underline text-sm">View Details</button>
      </div>
    </article>
  );
};

interface Order {
  status: "pending" | "processing" | "shipped" | "delivered";
  orderId: string;
  expectedDeliveryDate: Date;
  orderDate: Date;
  imageUrl?: string;
}

interface OrderTableProps {
  orders: Order[];
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
          orderDate={order.orderDate}
          expectedDeliveryDate={order.expectedDeliveryDate}
          status={order.status}
          imageUrl={order.imageUrl}
        />
      ))}
    </section>
  );
};

export default OrderTable;

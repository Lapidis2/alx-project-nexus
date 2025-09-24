import React, { useEffect, useState } from "react";

interface Order {
  id: string;
  status: string;
  createdAt: string;
  expectedDeliveryDate: string | null;
}

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Order not found");
        const data: Order = await res.json();
        setOrder(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!order) return <p>No order details available</p>;

  return (
    <div className="font-poppins">
      <div className="font-bold pb-4">Order #{order.id}</div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div>
          <p className="text-gray-500">Placed On</p>
          <p>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Expected Delivery Date</p>
          <p>
            {order.expectedDeliveryDate
              ? new Date(order.expectedDeliveryDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <p>{order.status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

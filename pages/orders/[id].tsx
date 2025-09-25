import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Order {
  orderId: string;
  orderDate: string;
  expectedDeliveryDate: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  items: { name: string; qty: number; price: number }[];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/orders/${id}`)
        .then((res) => res.json())
        .then((data) => setOrder(data))
        .catch(() => setOrder(null));
    }
  }, [id]);

  if (!order) return <p className="p-6">Loading order details...</p>;

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Order:{order.orderId}</h2>

      <div className="mb-4">
        <p>
          <span className="font-semibold">Order Date:</span>{" "}
          {formatDate(order.orderDate)}
        </p>
        <p>
          <span className="font-semibold">Expected Delivery:</span>{" "}
          {formatDate(order.expectedDeliveryDate)}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className="capitalize">{order.status}</span>
        </p>
      </div>

      <h3 className="font-semibold mb-2">Items</h3>
      {order.items?.length ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.qty}</td>
                <td className="p-2">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in this order.</p>
      )}
    </div>
  );
}

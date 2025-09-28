"use client";

import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Circles } from "react-loader-spinner";

interface Order {
  id: string;
  status: "pending" | "delivered" | "cancelled";
}

interface PieData {
  name: "pending" | "delivered" | "cancelled";
  value: number;
  actualValue: number;
  color: string;
  [key: string]: string | number;
}

const colors: Record<Order["status"], string> = {
  pending: "#FFC632",
  delivered: "#17BF6B",
  cancelled: "#ED3333",
};

const validStatuses: Order["status"][] = ["pending", "delivered", "cancelled"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: PieData }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { name, actualValue } = payload[0].payload;

  return (
    <div className="bg-white p-2 rounded shadow text-sm font-medium">
      {name}: {actualValue}
    </div>
  );
};

const OrderStatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<Order["status"], number> = {
      pending: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      if (validStatuses.includes(order.status)) {
        counts[order.status] += 1;
      }
    });

    return counts;
  }, [orders]);

  const datas: PieData[] = useMemo(
    () =>
      validStatuses.map((status) => ({
        name: status,
        value: statusCounts[status] === 0 ? 0.1 : statusCounts[status], // Prevent 0 value in pie chart
        actualValue: statusCounts[status],
        color: colors[status],
      })),
    [statusCounts]
  );

  if (isLoading) {
    return (
      <section aria-busy="true" className="flex justify-center items-center h-64">
        <Circles visible height="80" width="80" color="#C9974C" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center h-64 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="font-poppins w-full bg-white rounded-xl shadow-md p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Order Status</h1>
        <p className="text-gray-700 text-sm">Total order status distribution</p>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={datas} innerRadius={60} outerRadius={80} dataKey="value">
                {datas.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <aside className="flex flex-col items-start gap-3">
          {datas.map(({ name, actualValue, color }) => (
            <div key={name} className="flex items-center gap-2 text-sm md:text-base">
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">
                {name} ({actualValue})
              </span>
            </div>
          ))}
        </aside>
      </main>
    </section>
  );
};

export default OrderStatus;

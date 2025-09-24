"use client";

import React, { useEffect, useState } from "react";
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
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white p-2 rounded shadow text-sm font-medium">
      {data.name}: {data.actualValue}
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
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <section
        aria-busy="true"
        className="flex justify-center items-center h-64"
      >
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

  const statusCounts: Record<Order["status"], number> = {
    pending: 0,
    delivered: 0,
    cancelled: 0,
  };

  orders.forEach((order) => {
    if (validStatuses.includes(order.status)) {
      statusCounts[order.status] += 1;
    }
  });

  const datas: PieData[] = validStatuses.map((status) => ({
    name: status,
    value: statusCounts[status] === 0 ? 0.1 : statusCounts[status],
    actualValue: statusCounts[status],
    color: colors[status],
  }));

  return (
    <section className="font-poppins w-full bg-white rounded-xl shadow-md p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Order Status</h1>
        <p className="text-gray-700 text-sm">Total earnings of the month</p>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="w-full md:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={datas}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {datas.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <aside className="flex flex-col items-start gap-3">
          {datas.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="capitalize">
                {item.name} ({item.actualValue})
              </span>
            </div>
          ))}
        </aside>
      </main>
    </section>
  );
};

export default OrderStatus;

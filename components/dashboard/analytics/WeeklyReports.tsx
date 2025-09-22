import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Circles } from "react-loader-spinner";

type DaySales = {
  day: string;
  totalSales: number;
};

const WeeklyReport: React.FC = () => {
  const [weeklySales, setWeeklySales] = useState<DaySales[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        const res = await fetch("/api/weekly-sales");
        if (!res.ok) throw new Error("Failed to fetch weekly sales");
        const data = await res.json();
        setWeeklySales(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeeklySales();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-24">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[90%]">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  const data = weeklySales.map((day) => ({
    name: day.day,
    TotalSales: day.totalSales,
  }));

  return (
    <div className="flex flex-col h-full w-full m-auto text-xs rounded-lg bg-white pb-3">
      <div className="py-2 pl-10 relative">
        <h2 className="font-bold text-lg">Reports</h2>
        <span className="flex gap-2 mt-3">
          <div className="bg-[#37C9EE] w-3 h-3 inline-block rounded-full" />
          <span>Weekly report</span>
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/622/025/original/add-category-icon-symbol-design-illustration-vector.jpg"
            className="w-5 h-5 absolute top-3 right-2"
            alt="category-icon"
          />
        </span>
      </div>
      <ResponsiveContainer width="99%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalSales" fill="#013362" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyReport;

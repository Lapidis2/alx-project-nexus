import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Circles } from "react-loader-spinner";

interface MonthSales {
  month: string;
  totalSales: number;
  income: number;
}

const SellingReport: React.FC = () => {
  const [monthlySales, setMonthlySales] = useState<MonthSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("/api/sellingReport");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data: MonthSales[] = await res.json();
        setMonthlySales(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Circles visible height={80} width={80} color="#C9974C" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  const chartData = monthlySales.map((month) => ({
    name: month.month,
    TotalSales: month.totalSales,
    Income: month.income,
  }));

  return (
    <section className="bg-white shadow-md rounded-lg p-4 font-poppins">
      <header className="mb-4">
        <h2 className="text-lg font-bold">Year Selling Analytics</h2>
        <p>Monthly sales report overview</p>
      </header>
      <div className="flex justify-center items-center">
        <ResponsiveContainer width="99%" height={400}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalSales" fill="#013362" barSize={30} />
            <Bar dataKey="Income" fill="#C9974C" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SellingReport;

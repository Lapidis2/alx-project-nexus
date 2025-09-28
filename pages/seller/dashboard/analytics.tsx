import React, { useEffect, useState } from "react";
import axios from "axios";
import WeeklyReport from "@/components/dashboard/analytics/WeeklyReports";
import OrderStatus from "@/components/dashboard/analytics/OrderStatus";
import SellingReport from "@/components/dashboard/analytics/SellingReports";
import TopProduct from "@/components/dashboard/analytics/TopProducts";
import InteractionCard from "@/components/dashboard/InteractiveCard";


interface Seller {
	id: string;
	name: string;
	status: string; 
	key: string
  }
  
  interface User {
	id: string;
	name: string;
	email: string;
	key: string
  }
  
  interface Order {
	id: string;
	status: string;
	totalAmount?: number;
	key: string
  }
  









const Analytics = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
	setLoading(true);
	setError(false);
	try {
	  const [sellersRes, usersRes, ordersRes] = await Promise.all([
		axios.get("/api/stores"), 
		axios.get("/api/users"),
		axios.get("/api/orders"),
	  ]);

	  setSellers(sellersRes.data);
	  setUsers(usersRes.data);
	  setOrders(ordersRes.data);
	} catch (err) {
	  console.error(err);
	  setError(true);
	} finally {
	  setLoading(false);
	}
  };

  useEffect(() => {
	fetchData();
  }, []);

  const transactions = orders.filter((order) => order.status === "delivered");

  const cardData = [
	{ name: "Vendors", numbers: sellers.length, icon: <svg>...</svg> },
	{ name: "Users", numbers: users.length, icon: <svg>...</svg> },
	{ name: "Transactions", numbers: transactions.length, icon: <svg>...</svg> },
	{ name: "Orders", numbers: orders.length, icon: <svg>...</svg> },
  ];

  if (loading)
	return <div className="text-center p-10">Loading analytics...</div>;

  if (error)
	return (
	  <div className="text-center p-10">
		<p className="text-red-600 font-semibold">Failed to load analytics.</p>
		<button
		  className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
		  onClick={fetchData}
		>
		  Retry
		</button>
	  </div>
	);

  return (
	<div className="items-center flex flex-col md:w-full xl:ml-[5%] xl:mt-5">
	  <div className="grid gap-5 lg:gap-10 sm:grid-cols-2 grid-cols-1 md:w-full">
		{cardData.map((item, index) => (
		  <InteractionCard key={index} data={item} />
		))}
	  </div>
	 
	  <div className="mt-5 w-full">
		<OrderStatus />
	  </div>

	  <div className="mt-5 w-full">
		<TopProduct />
	  </div>

	  <div className="mt-5 w-full mb-8">
		<SellingReport />
	  </div>
	  <div className="mt-5 w-full mb-8">
		<WeeklyReport />
	  </div>
	</div>
  );
};

export default Analytics;

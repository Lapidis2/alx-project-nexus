"use client";

import React, { useEffect, useState } from "react";
import WeeklyReport from "@/components/dashboard/analytics/WeeklyReports";
import UserTable, { User as UserType } from "@/components/dashboard/UserTable";
import VendorRequestList, { Seller as SellerType } from "@/components/dashboard/VendorRequestList";
import InteractionCard from "@/components/dashboard/InteractiveCard";

interface Order {
  id: string;
  status: string;
  [key: string]: any;
}

const AdminHome: React.FC = () => {
  const [sellers, setSellers] = useState<SellerType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sellersRes, usersRes, ordersRes] = await Promise.all([
          fetch("/api/admin/sellers"),
          fetch("/api/admin/users"),
          fetch("/api/orders"),
        ]);

        const [sellersData, usersData, ordersData] = await Promise.all([
          sellersRes.ok ? sellersRes.json() : [],
          usersRes.ok ? usersRes.json() : [],
          ordersRes.ok ? ordersRes.json() : [],
        ]);

        setSellers(sellersData as SellerType[]);
        setUsers(usersData as UserType[]);
        setOrders(ordersData as Order[]);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data
  const approvedSellers = sellers.filter((seller) => seller.status === "approved");
  const deliveredOrders = orders.filter((order) => order.status === "delivered");

  // Cards data
  const cardData = [
    { name: "Vendors", numbers: approvedSellers.length, icon: <div>V</div> },
    { name: "Users", numbers: users.length, icon: <div>U</div> },
    { name: "Transactions", numbers: deliveredOrders.length, icon: <div>T</div> },
    { name: "Orders", numbers: orders.length, icon: <div>O</div> },
  ];

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="flex flex-col space-y-6 p-4 lg:p-10">
      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((item, idx) => (
          <InteractionCard key={idx} data={item} />
        ))}
      </div>

      {/* Weekly Report */}
      <div className="w-full h-[400px] lg:h-[500px] mt-4">
        <WeeklyReport />
      </div>

      {/* Tables */}
      <div className="flex flex-col lg:flex-row w-full mt-4 space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <UserTable users={users} />
        </div>
        <div className="w-full">
          <VendorRequestList sellers={sellers} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

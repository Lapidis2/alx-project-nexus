import React, { useState } from "react";
import WeeklyReport from "@/components/dashboard/analytics/WeeklyReports";
import UserTable from "@/components/dashboard/UserTable";
import VendorRequestList from "@/components/dashboard/VendorRequestList";
import InteractionCard from "@/components/dashboard/InteractiveCard";

interface Seller {
  id: string;
  name: string;
  status: "approved" | "pending" | string;
  storeName: string;
  address: {
    city: string;
  };
}

interface User {
  id: string; 
  name: string;
  email: string;
  role:  "buyer" | "vendor"; 
  updatedAt: string;
}

interface Order {
  id: string;
  status: "delivered" | "pending" | string;
}

interface CardData {
  name: string;
  numbers: number;
  icon: React.JSX.Element;
}


const AdminHome: React.FC = () => {

  const [sellers] = useState<Seller[]>([
    { id: "1", name: "Vendor A", status: "approved", storeName: "Store A", address: { city: "Kigali" } },
    { id: "2", name: "Vendor B", status: "pending", storeName: "Store B", address: { city: "Musanze" } },
    { id: "3", name: "Vendor C", status: "approved", storeName: "Store C", address: { city: "Huye" } },
  ]);

 
  const [users] = useState<User[]>([
    { id: "1", name: "User 1", email: "user1@example.com", role: "buyer", updatedAt: "2025-09-24" },
    { id: "2", name: "User 2", email: "user2@example.com", role: "buyer", updatedAt: "2025-09-23" },
    { id: "3", name: "User 3", email: "user3@example.com", role: "vendor", updatedAt: "2025-09-22" },
  ]);

  
  const [orders] = useState<Order[]>([
    { id: "1", status: "delivered" },
    { id: "2", status: "pending" },
    { id: "3", status: "delivered" },
  ]);


  const approvedSellers = sellers.filter(seller => seller.status === "approved");
  const transactions = orders.filter(order => order.status === "delivered");

 
  const cardData: CardData[] = [
    { name: "Vendors", numbers: approvedSellers.length, icon: <svg width="20" height="20" /> },
    { name: "Users", numbers: users.length, icon: <svg width="20" height="20" /> },
    { name: "Transactions", numbers: transactions.length, icon: <svg width="20" height="21" /> },
    { name: "Orders", numbers: orders.length, icon: <svg width="20" height="20" /> },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-red-500 space-y-6 px-4 lg:px-6 xl:px-8 py-6">

  {/* ── Interaction Cards ───────────────────────────── */}
  <div className="w-full">
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardData.map((item, index) => (
        <InteractionCard key={index} data={item} />
      ))}
    </div>
  </div>


  <div className="w-full">
    <div className="h-60 md:h-80 xl:h-96 2xl:h-[500px] w-full">
      <WeeklyReport />
    </div>
  </div>


  <div className="flex flex-col lg:flex-row gap-6 w-full pb-10">

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

import React, { useState } from "react";
import WeeklyReport from "@/components/dashboard/analytics/WeeklyReports";
import UserTable from "@/components/dashboard/UserTable";
import VendorRequestList from "@/components/dashboard/VendorRequestList";
import InteractionCard from "@/components/dashboard/InteractiveCard";

// ------------------- TYPES -------------------
interface Seller {
  id: string; // match VendorRequestList prop
  name: string;
  status: "approved" | "pending" | string;
  storeName: string;
  address: {
    city: string;
  };
}

interface User {
  id: string; // match UserTable prop
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

// ------------------- COMPONENT -------------------
const AdminHome: React.FC = () => {
  // ---------- Sellers ----------
  const [sellers] = useState<Seller[]>([
    { id: "1", name: "Vendor A", status: "approved", storeName: "Store A", address: { city: "Kigali" } },
    { id: "2", name: "Vendor B", status: "pending", storeName: "Store B", address: { city: "Musanze" } },
    { id: "3", name: "Vendor C", status: "approved", storeName: "Store C", address: { city: "Huye" } },
  ]);

  // ---------- Users ----------
  const [users] = useState<User[]>([
    { id: "1", name: "User 1", email: "user1@example.com", role: "buyer", updatedAt: "2025-09-24" },
    { id: "2", name: "User 2", email: "user2@example.com", role: "buyer", updatedAt: "2025-09-23" },
    { id: "3", name: "User 3", email: "user3@example.com", role: "vendor", updatedAt: "2025-09-22" },
  ]);

  // ---------- Orders ----------
  const [orders] = useState<Order[]>([
    { id: "1", status: "delivered" },
    { id: "2", status: "pending" },
    { id: "3", status: "delivered" },
  ]);

  // ---------- Derived Data ----------
  const approvedSellers = sellers.filter(seller => seller.status === "approved");
  const transactions = orders.filter(order => order.status === "delivered");

  // ---------- Card Data ----------
  const cardData: CardData[] = [
    { name: "Vendors", numbers: approvedSellers.length, icon: <svg width="20" height="20" /> },
    { name: "Users", numbers: users.length, icon: <svg width="20" height="20" /> },
    { name: "Transactions", numbers: transactions.length, icon: <svg width="20" height="21" /> },
    { name: "Orders", numbers: orders.length, icon: <svg width="20" height="20" /> },
  ];

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 w-full">
      {/* Cards */}
      <div className="flex flex-col w-full lg:p-[1%] xl:h-50 xl:p-1 2xl:p-3 3xl:p-5">
        <div className="grid grid-cols-2 gap-[10px] w-full lg:gap-[5px] lg:h-[15%] xl:gap-[10px] xl:w-[90%] xl:ml-[40px] xl:mt-2 xl:grid-cols-4">
          {cardData.map((item, index) => (
            <InteractionCard key={index} data={item} />
          ))}
        </div>
      </div>

      {/* Weekly Report */}
      <div className="w-full h-60 lg:p-[1%] md:h-80 xl:h-96 xl:w-full xl:ml-[10px] lg:px-2 md:px-1 xl:px-6 xl:pr-3 2xl:px-8 3xl:px-12 2xl:h-[500px] 2xl:pt-0">
        <WeeklyReport />
      </div>

      {/* User Table & Vendor Requests */}
      <div className="flex flex-col md:flex-col lg:flex-row w-full space-y-2 lg:space-y-0 lg:space-x-5 pb-10 xl:ml-[15px] xl:pl-6 2xl:px-12">
        <div className="w-full md:mt-2 md:px-2 lg:mt-0 xl:p-0">
          <UserTable users={users} />
        </div>
        <div className="w-full md:mt-2 md:px-2 xl:pr-3">
          <VendorRequestList sellers={sellers} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

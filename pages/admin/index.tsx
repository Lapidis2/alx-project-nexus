import React, { useEffect, useState } from "react";
import WeeklyReport from "@/components/dashboard/analytics/WeeklyReports";
import UserTable from "@/components/dashboard/UserTable";
import VendorRequestList from "@/components/dashboard/VendorRequestList";
import InteractionCard from "@/components/dashboard/InteractiveCard";

function AdminHome() {
 
  const [sellers, setSellers] = useState<any[]>([
    { id: 1, name: "Vendor A", status: "approved" },
    { id: 2, name: "Vendor B", status: "pending" },
    { id: 3, name: "Vendor C", status: "approved" },
  ]);
  const [users, setUsers] = useState<any[]>([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);
  const [orders, setOrders] = useState<any[]>([
    { id: 1, status: "delivered" },
    { id: 2, status: "pending" },
    { id: 3, status: "delivered" },
  ]);

  const approvedSellers = sellers.filter(
    (seller) => seller.status === "approved"
  );
  const transactions = orders.filter((order) => order.status === "delivered");

  const cardData = [
    {
      name: "Vendors",
      numbers: approvedSellers.length,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG paths */}
        </svg>
      ),
    },
    {
      name: "Users",
      numbers: users.length,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG paths */}
        </svg>
      ),
    },
    {
      name: "Transactions",
      numbers: transactions.length,
      icon: (
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG paths */}
        </svg>
      ),
    },
    {
      name: "Orders",
      numbers: orders.length,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG paths */}
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 w-full">
      <div className="flex flex-col w-full lg:p-[1%] xl:h-50 xl:p-1 2xl:p-3 3xl:p-5">
        <div className="grid grid-cols-2 gap-[10px] w-full lg:gap-[5px] lg:h-[15%] xl:gap-[10px] xl:w-[90%] xl:ml-[40px] xl:mt-2 xl:grid-cols-4">
          {cardData.map((item, index) => (
            <InteractionCard key={index} data={item} />
          ))}
        </div>
      </div>

      <div className="w-full h-60 lg:p-[1%] md:h-80 xl:h-96 xl:w-full xl:ml-[10px] lg:px-2 md:px-1 xl:px-6 xl:pr-3 2xl:px-8 3xl:px-12 2xl:h-[500px] 2xl:pt-0">
        <WeeklyReport />
      </div>

      <div className="flex flex-col md:flex-col lg:flex-row w-full space-y-2 lg:space-y-0 lg:space-x-5 pb-10 xl:ml-[15px] xl:pl-6 2xl:px-12">
        <div className="w-full md:mt-2 md:px-2 lg:mt-0 xl:p-0">
          <UserTable users={users} />
        </div>
        <div className="w-full md:mt-2 md:px-2 xl:pr-3">
          <VendorRequestList sellers={sellers}/>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

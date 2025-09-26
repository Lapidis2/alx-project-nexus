"use client";
import React from "react";

interface Sale {
  id: number;
  orderDate: string;
  expectedDelivery: string;
  status: "Pending" | "Received" | "Returned";
}

const statusColors: Record<Sale["status"], string> = {
  Pending: "bg-sky-500",
  Received: "bg-green-500",
  Returned: "bg-red-500",
};

const salesData: Sale[] = [
  { id: 1, orderDate: "May 24 2025", expectedDelivery: "June 01 2025", status: "Pending" },
  { id: 2, orderDate: "May 24 2025", expectedDelivery: "June 01 2025", status: "Received" },
  { id: 3, orderDate: "May 24 2025", expectedDelivery: "June 01 2025", status: "Returned" },
];

const LatestSales: React.FC = () => {
  return (
    <div className="p-4  text-white flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-lg font-bold mb-4 text-black">Latest Sales</h2>

        <div className="space-y-4">
          {salesData.map((sale) => (
            <div
              key={sale.id}
              className="grid grid-cols-5 items-center bg-[#1e293b] p-4 rounded-xl text-sm"
            >
              {/* No */}
              <div>
                <p className="text-gray-400">No</p>
                <p>{String(sale.id).padStart(2, "0")}</p>
              </div>

              {/* Order Date */}
              <div>
                <p className="text-gray-400">Order Date</p>
                <p>{sale.orderDate}</p>
              </div>

             
              <div>
                <p className="text-gray-400">Expected Deliver</p>
                <p>{sale.expectedDelivery}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-gray-400">Status</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[sale.status]}`}
                  ></span>
                  <p>{sale.status}</p>
                </div>
              </div>

              {/* Action */}
              <div className="text-right">
                <button className="text-sky-400 hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestSales;

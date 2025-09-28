"use client";

import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import Link from "next/link";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "vendor";
  updatedAt: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [activeTab, setActiveTab] = useState<"Buyers" | "Sellers">("Buyers");
  const [loading] = useState(false);


  const sortedUsers = users.slice().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const buyersCount = sortedUsers.filter((u) => u.role === "buyer").length;
  const sellersCount = sortedUsers.filter((u) => u.role === "vendor").length;

  const filteredUsers = sortedUsers.filter((u) =>
    activeTab === "Buyers" ? u.role === "buyer" : u.role === "vendor"
  );

  const viewAllUrl = activeTab === "Buyers" ? "/admin/users" : "/admin/sellers";

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">

      <div className="flex justify-between mb-4 pr-7">
        <div className="flex flex-row items-center gap-4">
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${
              activeTab === "Buyers"
                ? "bg-secondary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("Buyers")}
          >
            Buyers ({buyersCount})
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition ${
              activeTab === "Sellers"
                ? "bg-secondary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("Sellers")}
          >
            Vendors ({sellersCount})
          </button>
        </div>
        <Link href={viewAllUrl} className="text-sm text-secondary">
          View all
        </Link>
      </div>

    
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={2} className="text-center py-6">
                  <Circles visible height="50" width="50" color="#C9974C" />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredUsers.slice(0, 6).map((user) => (
                <tr
                  key={user.id}
                  className="border-b text-sm hover:bg-gray-50 transition"
                >
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </section>
  );
};

export default UserTable;

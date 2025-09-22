"use client";

import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  role: "buyer" | "vendor";
  updatedAt: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"Buyers" | "Sellers">("Buyers");

  // Mock fetching API data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          name: "Alice Johnson",
          email: "alice@example.com",
          role: "buyer",
          updatedAt: "2025-09-20T10:00:00Z",
        },
        {
          name: "Bob Smith",
          email: "bob@example.com",
          role: "vendor",
          updatedAt: "2025-09-21T14:30:00Z",
        },
        {
          name: "Carla Doe",
          email: "carla@example.com",
          role: "buyer",
          updatedAt: "2025-09-22T09:15:00Z",
        },
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const sortedUsers = users
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  const buyersCount = sortedUsers.filter((u) => u.role === "buyer").length;
  const sellersCount = sortedUsers.filter((u) => u.role === "vendor").length;

  const filteredUsers = sortedUsers.filter((u) =>
    activeTab === "Buyers" ? u.role === "buyer" : u.role === "vendor"
  );

  const viewAllUrl = activeTab === "Buyers" ? "/admin/users" : "/admin/sellers";

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      {/* Tabs Header */}
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

      {/* Table */}
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
              {filteredUsers.slice(0, 6).map((user, index) => (
                <tr
                  key={index}
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

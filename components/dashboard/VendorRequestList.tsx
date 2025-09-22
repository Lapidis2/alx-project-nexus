"use client";

import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import Link from "next/link";

export interface Seller {
  storeName: string;
  status?:string;
  address: {
    city: string;
  };
}
interface VendorRequestListProps {
	sellers: Seller[];
  }

const VendorRequestList: React.FC<VendorRequestListProps> = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
 
    setLoading(true);
    setError(false);

    setTimeout(() => {
      try {
        const mockData: Seller[] = [
          { storeName: "FreshMart", address: { city: "Kigali" } },
          { storeName: "Green Foods", address: { city: "Musanze" } },
          { storeName: "AgriStore", address: { city: "Huye" } },
          { storeName: "Tech Market", address: { city: "Rubavu" } },
        ];
        setSellers(mockData);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between mb-4 pr-7">
        <span className="px-3 py-1 text-sm rounded-md bg-secondary text-white">
          Vendor Applications ({sellers.length})
        </span>
        <Link href="/admin/requests" className="text-sm text-secondary">
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-sm text-gray-600">
              <th className="p-2 text-left font-semibold">Store Name</th>
              <th className="p-2 text-left font-semibold">City</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="text-center py-6">
                  <Circles visible height="50" width="50" color="#C9974C" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={2} className="text-center py-6 text-red-500">
                  Failed to load vendor requests. Try again later.
                </td>
              </tr>
            ) : sellers.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-500">
                  No vendor applications found.
                </td>
              </tr>
            ) : (
              sellers.slice(0, 6).map((seller, index) => (
                <tr
                  key={index}
                  className="border-b text-sm hover:bg-gray-50 transition"
                >
                  <td className="p-2">{seller.storeName}</td>
                  <td className="p-2">{seller.address.city}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VendorRequestList;

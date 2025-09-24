"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestsTable from "@/components/dashboard/RequestTable";
import { Circles } from "react-loader-spinner";

interface SellerData {
  sellerId: string;
  userId: string;
  storeName: string;
  address: { city: string };
  TIN: string;
}

const Requests: React.FC = () => {
  const [sellers, setSellers] = useState<SellerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchSellers = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get<SellerData[]>("/api/seller-requests");

      // Optional: Map API data if it doesn’t exactly match SellerData
      const mappedSellers: SellerData[] = response.data.map((s) => ({
        sellerId: s.sellerId,
        userId: s.userId,
        storeName: s.storeName,
        address: { city: s.address.city }, // ensure the structure matches
        TIN: s.TIN,
      }));

      setSellers(mappedSellers);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90%]">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[90%]">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            An error occurred while loading seller requests. Please try again later.
          </p>
          <button
            className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            onClick={fetchSellers}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <RequestsTable sellers={sellers} />;
};

export default Requests;

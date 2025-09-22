"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { isVendor, getToken } from "@/components/OrderTracking/AuthUtils";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface OrderStatusProps {
	orderId: string;
	currentStatus: string; 
  }

interface Order {
  status: string;
}

interface OrderUpdateEvent {
  orderId: string;
  status: string;
}

const statuses = ["pending", "processing", "shipped", "delivered"];

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
});

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch order status
  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const data: Order = await res.json();
      setOrderStatus(data.status);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch order");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Pusher subscription
  useEffect(() => {
    const channel = pusher.subscribe("order-channel");
    channel.bind("order-updated", (data: OrderUpdateEvent) => {
      if (data.orderId === orderId) {
        setOrderStatus(data.status);
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("order-channel");
    };
  }, [orderId]);

  const currentStatusIndex = orderStatus ? statuses.indexOf(orderStatus) : -1;

  const getStatusClass = (status: string) => {
    const statusIndex = statuses.indexOf(status);
    return statusIndex <= currentStatusIndex
      ? "bg-primary text-white"
      : "bg-gray-200";
  };

  const getLineClass = (index: number) => {
    return currentStatusIndex >= index + 1 ? "bg-primary" : "bg-gray-200";
  };

  const getNextStatus = (current: string | null) => {
    if (!current) return statuses[0];
    const idx = statuses.indexOf(current);
    return idx < statuses.length - 1 ? statuses[idx + 1] : null;
  };

  const handleUpdateStatus = async () => {
    const nextStatus = getNextStatus(orderStatus);
    if (!nextStatus) {
      toast.info("No further status updates available");
      return;
    }

    try {
      setIsUpdating(true);
      const token = getToken();
      if (!token) {
        toast.error("No authentication token found");
        setIsUpdating(false);
        return;
      }

      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      setOrderStatus(nextStatus);
      toast.success(`Status updated to ${nextStatus}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!orderStatus) return <p>Loading order status...</p>;

  return (
    <section className="font-outfit">
      <ToastContainer />
      <div className="flex items-center justify-center mt-8 gap-14">
        {statuses.map((status, index) => (
          <div key={status} className="flex items-center">
            <div className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusClass(
                  status
                )} z-10`}
              >
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </div>
              <span className="mt-2 text-sm capitalize">{status}</span>
              {index < statuses.length - 1 && (
                <div
                  className={`absolute top-5 transform -translate-y-1/2 left-10 w-24 h-1 ${getLineClass(
                    index
                  )}`}
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isVendor() && (
        <div className="pt-10 flex justify-center">
          {getNextStatus(orderStatus) ? (
            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center w-[200px] h-[48px]"
            >
              {isUpdating ? (
                <ThreeDots
                  visible={true}
                  height="30"
                  width="50"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <span>Update to {getNextStatus(orderStatus)}</span>
              )}
            </button>
          ) : (
            <div className="flex gap-2 text-primary font-semibold">
              <p>Order Completed</p>
              <span>&#x2713;</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default OrderStatus;

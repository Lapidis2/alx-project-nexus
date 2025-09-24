"use client";

import React, { useEffect, useState, useCallback } from "react";
import Pusher from "pusher-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isVendor, getToken } from "@/components/OrderTracking/AuthUtils";

interface OrderStatusProps {
  orderId: string | string[] | undefined;
  currentState:string
}


const STATUSES = ["pending", "processing", "shipped", "delivered"] as const;
type Status = (typeof STATUSES)[number];

interface Order {
  status: Status;
}

interface OrderUpdateEvent {
  orderId: string;
  status: Status;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId }) => {
  const orderIdString = Array.isArray(orderId) ? orderId[0] : orderId;

  const [orderStatus, setOrderStatus] = useState<Status | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch current order status
  const fetchOrder = useCallback(async () => {
    if (!orderIdString) return;
    try {
      const res = await fetch(`/api/orders/${orderIdString}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const data: Order = await res.json();
      setOrderStatus(data.status);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message);
      } else {
        toast.error("Failed to fetch order");
      }
    }
  }, [orderIdString]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Real-time updates with Pusher
  useEffect(() => {
    if (!orderIdString) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusher.subscribe("order-channel");
    channel.bind("order-updated", (data: OrderUpdateEvent) => {
      if (data.orderId === orderIdString) {
        setOrderStatus(data.status);
        toast.info(`Order status updated to ${data.status}`);
      }
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("order-channel");
    };
  }, [orderIdString]);

  const currentStatusIndex = orderStatus ? STATUSES.indexOf(orderStatus) : -1;

  const getStatusClass = (status: Status) => {
    const idx = STATUSES.indexOf(status);
    return idx <= currentStatusIndex ? "bg-primary text-white" : "bg-gray-200";
  };

  const getLineClass = (index: number) =>
    currentStatusIndex >= index + 1 ? "bg-primary" : "bg-gray-200";

  const getNextStatus = (): Status | null => {
    if (!orderStatus) return STATUSES[0];
    const idx = STATUSES.indexOf(orderStatus);
    return idx < STATUSES.length - 1 ? STATUSES[idx + 1] : null;
  };

  const handleUpdateStatus = async () => {
    const nextStatus = getNextStatus();
    if (!nextStatus) {
      toast.info("No further status updates available");
      return;
    }

    try {
      setIsUpdating(true);
      const token = getToken();
      if (!token) {
        toast.error("Authentication token not found");
        setIsUpdating(false);
        return;
      }

      const res = await fetch(`/api/orders/${orderIdString}/status`, {
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message);
      } else {
        toast.error("Failed to update status");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (!orderStatus)
    return (
      <p className="text-center p-4" role="status">
        Loading order status...
      </p>
    );

  return (
    <section className="font-outfit" aria-label="Order Status">
      <ToastContainer />

      {/* Status Timeline */}
      <div className="flex items-center justify-center mt-8 gap-14">
        {STATUSES.map((status, index) => (
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
              {index < STATUSES.length - 1 && (
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

      {/* Vendor Update Button */}
      {isVendor() && (
        <div className="pt-10 flex justify-center">
          {getNextStatus() ? (
            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center w-[200px] h-[48px]"
            >
              {isUpdating ? (
                <ThreeDots
                  visible
                  height="30"
                  width="50"
                  color="white"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <span>Update to {getNextStatus()}</span>
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

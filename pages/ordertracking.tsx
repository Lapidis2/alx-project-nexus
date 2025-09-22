import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContactInfo } from "@/components/OrderTracking/ContactInfo";
import OrderDetails from "@/components/OrderTracking/OrderDetail";
import OrderStatus from "@/components/OrderTracking/OrderStatus";
import OrderProductDetails from "@/components/OrderTracking/OrderProductDetail"
import Navbar from "@/components/NavBar";

export const OrderTrackingPage = () => {
  const orderId = "2b701ee8-913f-422f-8f23-902a7687719a";
  const phoneNumber = "0787990099";

  const [userId, setUserId] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [orderData, setOrderData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    setError(false);
    try {
   
      const orderRes = await axios.get(`/api/orders/${orderId}`); 
      setOrderData(orderRes.data);
      setUserId(orderRes.data.userId);
      setOrderStatus(orderRes.data.status);

      // Fetch user info
      const userRes = await axios.get(`/api/users/${orderRes.data.userId}`);
      setUserInfo(userRes.data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) return <p className="text-center p-10">Loading order info...</p>;
  if (error) return (
    <div className="text-center p-10">
      <p className="text-red-600 font-semibold">Failed to load order info.</p>
      <button
        className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
        onClick={fetchOrder}
      >
        Retry
      </button>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-20 h-screen p-10 lg:p-20">
        <div className="order-details-container border-b pb-8">
          <OrderDetails orderId={orderId} />
          <OrderStatus orderId={orderId} currentStatus={orderStatus} />
        </div>
        <div className="contact-info-container">
          <ContactInfo
            contactName={userInfo?.name || ""}
            email={userInfo?.email || ""}
            phoneNumber={phoneNumber}
            orderId={orderId}
          />
        </div>

        <div className="pb-10">
          <OrderProductDetails orderId={orderId} />
        </div>
      </div>
    </>
  );
};

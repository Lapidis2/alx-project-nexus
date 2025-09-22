"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import Navbar from "@/components/NavBar";
import { ContactInfo } from "@/components/OrderTracking/ContactInfo";
import OrderDetails from "@/components/OrderTracking/OrderDetail";
import OrderStatus from "@/components/OrderTracking/OrderStatus";
import OrderProductDetails from "@/components/OrderTracking/OrderProductDetail";

const OrderTrackingPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const phoneNumber = "0787990099";

  const [orderData, setOrderData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrderData = async (orderId: string) => {
    setLoading(true);
    setError(false);
    try {
      // Fetch order
      const orderRes = await axios.get(`/api/orders/${orderId}`);
      const order = orderRes.data;
      setOrderData(order);

      // Fetch user info if available
      if (order.userId) {
        const userRes = await axios.get(`/api/users/${order.userId}`);
        setUserInfo(userRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch order or user info:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId) return;
    fetchOrderData(orderId as string);
  }, [orderId]);

  if (loading)
    return (
      <p className="text-center p-10" role="status">
        Loading order information...
      </p>
    );

  if (error)
    return (
      <div className="text-center p-10">
        <p className="text-red-600 font-semibold">Failed to load order info.</p>
        <button
          className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
          onClick={() => fetchOrderData(orderId as string)}
        >
          Retry
        </button>
      </div>
    );

  return (
    <>
      {/* SEO Head */}
      <Head>
        <title>Order Tracking - {orderId}</title>
        <meta
          name="description"
          content={`Track your order ${orderId} status, contact info, and product details.`}
        />
        <link rel="canonical" href={`api/orders/${orderId}`} />
        
      </Head>

      <Navbar />

      <main
        className="flex flex-col gap-20 h-screen p-10 lg:p-20"
        aria-label="Order Tracking Main Content"
      >
        {/* Order Details Section */}
        <section
          className="order-details-container border-b pb-8"
          aria-labelledby="order-details-heading"
        >
          <header>
            <h1 id="order-details-heading" className="text-2xl font-bold mb-4">
              Order Details
            </h1>
          </header>
          <article>
            <OrderDetails orderId={orderId as string} />
            <OrderStatus orderId={orderId as string} currentState={orderData?.status || "pending"} />
          </article>
        </section>

        {/* Contact Info Section */}
        <section
          className="contact-info-container"
          aria-labelledby="contact-info-heading"
        >
          <header>
            <h2 id="contact-info-heading" className="text-xl font-semibold mb-2">
              Contact Information
            </h2>
          </header>
          <article>
            <ContactInfo
              contactName={userInfo?.name || ""}
              email={userInfo?.email || ""}
              phoneNumber={phoneNumber}
              orderId={orderId as string}
            />
          </article>
        </section>

      
        <section className="pb-10" aria-labelledby="order-products-heading">
          <header>
            <h2 id="order-products-heading" className="text-xl font-semibold mb-2">
              Products in Your Order
            </h2>
          </header>
          <article>
            <OrderProductDetails orderId={orderId as string} />
          </article>
        </section>
      </main>
    </>
  );
};

export default OrderTrackingPage;

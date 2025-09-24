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

  const [orderData, setOrderData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!router.isReady) return; // wait until query params are ready
    if (!orderId) return;

    const fetchOrderData = async () => {
      setLoading(true);
      setError(false);
      try {
        const orderRes = await axios.get(`/api/orders/${orderId}`);
        const order = orderRes.data;
        setOrderData(order);

        // Set user info from order
        setUserInfo({
          name: order.contactName,
          email: order.email,
          phoneNumber: order.phoneNumber,
        });
      } catch (err: any) {
        console.error("Failed to fetch order:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [router.isReady, orderId]);

  if (!router.isReady || loading) {
    return (
      <p className="text-center p-10" role="status">
        Loading order information...
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <p className="text-red-600 font-semibold">Failed to load order info.</p>
        <button
          className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
          onClick={() => router.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order Tracking - {orderId}</title>
        <meta
          name="description"
          content={`Track your order ${orderId} status, contact info, and product details.`}
        />
        <link rel="canonical" href={`/api/orders/${orderId}`} />
      </Head>

      <Navbar />

      <main className="flex flex-col gap-20 p-10 lg:p-20">
        {/* Order Details Section */}
        <section className="order-details-container border-b pb-8">
          <header>
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          </header>
          <article>
            <OrderDetails orderId={orderId as string} />
            <OrderStatus
              orderId={orderId as string}
              currentState={orderData?.status || "pending"}
            />
          </article>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info-container">
          <header>
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          </header>
          <article>
            <ContactInfo
              contactName={userInfo?.name || ""}
              email={userInfo?.email || ""}
              phoneNumber={userInfo?.phoneNumber || ""}
              orderId={orderId as string}
            />
          </article>
        </section>

        {/* Order Products Section */}
        <section className="pb-10">
          <header>
            <h2 className="text-xl font-semibold mb-2">Products in Your Order</h2>
          </header>
          <article>
            <OrderProductDetails
              orderId={orderId as string}
              products={orderData?.products || []}
            />
          </article>
        </section>
      </main>
    </>
  );
};

export default OrderTrackingPage;

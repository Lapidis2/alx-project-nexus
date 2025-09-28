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
import type { Product as OrderProduct } from "@/components/OrderTracking/OrderProductDetail";




interface Order {
  id: string;
  status: "pending" | "delivered" | "shipped" | string;
  contactName: string;
  email: string;
  phoneNumber: string;
  products: OrderProduct[];
}

interface UserInfo {
  name: string;
  email: string;
  phoneNumber: string;
}


const OrderTrackingPage: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [orderData, setOrderData] = useState<Order | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady || !orderId) return;

    const fetchOrderData = async () => {
      setLoading(true);
      setError(false);
      try {
        const orderRes = await axios.get<Order>(`/api/orders/${orderId}`);
        const order = orderRes.data;
        setOrderData(order);

        setUserInfo({
          name: order.contactName,
          email: order.email,
          phoneNumber: order.phoneNumber,
        });
      } catch (err) {
        console.error("Failed to fetch order:", err);
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

"use client";

import React, { useEffect, useState } from "react";

interface ContactInfoProps {
  contactName: string;
  email: string;
  phoneNumber: string;
  orderId: string;
}

interface DeliveryAddress {
  city: string;
  street: string;
}

interface OrderData {
  deliveryAddress: DeliveryAddress;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  contactName,
  email,
  phoneNumber,
  orderId,
}) => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Failed to fetch order");

        const data: OrderData = await res.json();
        setOrder(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return <p>No order details available</p>;

  const { deliveryAddress } = order;

  return (
    <section className="flex flex-col gap-12 lg:flex-row justify-between border-b pb-8 font-outfit">
      <article className="delivery-address">
        <h3 className="font-bold font-poppins pb-2">Delivery Address</h3>
        <address className="text-gray-300 not-italic">
          {deliveryAddress.street}, {deliveryAddress.city}
        </address>
      </article>

      <article className="contact">
        <h3 className="font-bold font-poppins pb-2">Contact Details</h3>
        <p className="text-gray-300">Name: {contactName}</p>
        <p className="text-gray-300">Email: {email}</p>
        <p className="text-gray-300">Phone: {phoneNumber}</p>
      </article>
    </section>
  );
};

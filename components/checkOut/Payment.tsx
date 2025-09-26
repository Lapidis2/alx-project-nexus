import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface PaymentProps {
  className?: string;
}

const Payment: React.FC<PaymentProps> = ({ className }) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { firstName, secondName, email, phone, street, country, city, deliveryMethod, paymentMethod };
    console.log(formData);
  };

  return (
	<section className={`rounded-md hover:shadow-md hover:shadow-black p-4 bg-white max-w-xl w-full mx-auto ${className}`}>
  <header className="bg-blue-900 text-white text-center p-3 rounded-t-[5px]">
    <h2 className="text-base sm:text-lg">{t("PAYMENT DETAILS")}</h2>
  </header>

  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
    
    {/* Names */}
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder={t("First Name")}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
      <input
        type="text"
        value={secondName}
        onChange={(e) => setSecondName(e.target.value)}
        placeholder={t("Second Name")}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
    </div>

    {/* Email */}
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={t("Email Address")}
      className="w-full h-10 rounded bg-gray-200 px-3"
    />

    {/* Phone & Street */}
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={t("Phone Number")}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder={t("Street")}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
    </div>

    {/* Country & City */}
    <div className="flex flex-col sm:flex-row gap-4">
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      >
        <option value="" disabled>{t("Select Country")}</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Uganda">Uganda</option>
        <option value="Kenya">Kenya</option>
      </select>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      >
        <option value="" disabled>{t("Select City")}</option>
        <option value="Kigali">Kigali</option>
        <option value="Musanze">Musanze</option>
        <option value="Huye">Huye</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Kampala">Kampala</option>
      </select>
    </div>

    {/* Delivery Method */}
    <select
      value={deliveryMethod}
      onChange={(e) => setDeliveryMethod(e.target.value)}
      className="w-full h-10 rounded bg-gray-200 px-3"
    >
      <option value="" disabled>{t("Select Delivery Method")}</option>
      <option value="Standard">Standard</option>
      <option value="Express">Express</option>
    </select>

    {/* Payment Method */}
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center">
        <input
          type="radio"
          checked={paymentMethod === "Stripe"}
          onChange={() => setPaymentMethod("Stripe")}
          className="mr-2"
        />
        Stripe
      </label>
    </div>

    <button
      type="submit"
      className="bg-blue-900 h-10 rounded text-white hover:bg-blue-800 w-full"
    >
      {t("Continue To Payment")}
    </button>
  </form>
</section>

  );
  
  
};

export default Payment;

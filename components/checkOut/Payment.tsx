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
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("First Name")} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
    </div>
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("Second Name")} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        required
        value={secondName}
        onChange={(e) => setSecondName(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
    </div>
  </div>

  {/* Email */}
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {t("Email Address")} <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full h-10 rounded bg-gray-200 px-3"
    />
  </div>

  {/* Phone & Street */}
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("Phone Number")} <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
    </div>
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("Street")} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        required
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      />
    </div>
  </div>

  {/* Country & City */}
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("Country")} <span className="text-red-500">*</span>
      </label>
      <select
        required
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full h-10 rounded bg-gray-200 px-3"
      >
        <option value="" disabled>{t("Select Country")}</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Uganda">Uganda</option>
        <option value="Kenya">Kenya</option>
      </select>
    </div>
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {t("City")} <span className="text-red-500">*</span>
      </label>
      <select
        required
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
  </div>

  {/* Delivery Method */}
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {t("Delivery Method")} <span className="text-red-500">*</span>
    </label>
    <select
      required
      value={deliveryMethod}
      onChange={(e) => setDeliveryMethod(e.target.value)}
      className="w-full h-10 rounded bg-gray-200 px-3"
    >
      <option value="" disabled>{t("Select Delivery Method")}</option>
      <option value="Standard">Standard</option>
      <option value="Express">Express</option>
    </select>
  </div>

  {/* Payment Method */}
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      {t("Payment Method")} <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center gap-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="paymentMethod"
          checked={paymentMethod === "Stripe"}
          onChange={() => setPaymentMethod("Stripe")}
          className="mr-2"
        />
        Stripe
      </label>
      {/* Add Momo radio here if you want */}
    </div>
  </div>

  <button
    type="submit"
    className="bg-blue-900 h-10 rounded text-white hover:bg-blue-800 w-full hover:shadow-md transition"
  >
    {t("Continue To Payment")}
  </button>
</form>

</section>

  );
  
  
};

export default Payment;

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
    <section className={`rounded-md hover:shadow-md hover:shadow-black p-4 bg-white max-w-xl w-full mx-auto ${className}`} aria-labelledby="payment-details">
      <header className="bg-blue-900 text-white text-center p-3 rounded-t-[5px]">
        <h2 id="payment-details" className="text-base sm:text-lg">{t("PAYMENT DETAILS")}</h2>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4" aria-labelledby="payment-form">
        <fieldset className="border-t border-b border-gray-300 pt-4 pb-4">
          <legend className="sr-only">{t("Personal Information")}</legend>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="first-name" className="text-sm font-medium text-gray-700 mb-1 block">
                {t("First Name")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-10 rounded bg-gray-200 px-3"
              />
            </div>
            <div className="w-full">
              <label htmlFor="second-name" className="text-sm font-medium text-gray-700 mb-1 block">
                {t("Second Name")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="second-name"
                required
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                className="w-full h-10 rounded bg-gray-200 px-3"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border-t border-b border-gray-300 pt-4 pb-4">
          <legend className="sr-only">{t("Contact Information")}</legend>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
              {t("Email Address")} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 rounded bg-gray-200 px-3"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                {t("Phone Number")} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 rounded bg-gray-200 px-3"
              />
            </div>
            <div className="w-full">
              <label htmlFor="street" className="text-sm font-medium text-gray-700 mb-1 block">
                {t("Street")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="street"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full h-10 rounded bg-gray-200 px-3"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border-t border-b border-gray-300 pt-4 pb-4">
          <legend className="sr-only">{t("Location Information")}</legend>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1 block">
                {t("Country")} <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
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
              <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1 block">
                {t("City")} <span className="text-red-500">*</span>
              </label>
              <select
                id="city"
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
        </fieldset>

        <fieldset className="border-t border-b border-gray-300 pt-4 pb-4">
          <legend className="sr-only">{t("Delivery and Payment Methods")}</legend>
          <div>
            <label htmlFor="delivery-method" className="text-sm font-medium text-gray-700 mb-1 block">
              {t("Delivery Method")} <span className="text-red-500">*</span>
            </label>
            <select
              id="delivery-method"
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

          <div>
            <label htmlFor="payment-method" className="text-sm font-medium text-gray-700 mb-1 block">
              {t("Payment Method")} <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="payment-method"
                  checked={paymentMethod === "Stripe"}
                  onChange={() => setPaymentMethod("Stripe")}
                  className="mr-2"
                />
                Stripe
              </label>
            </div>
          </div>
        </fieldset>

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

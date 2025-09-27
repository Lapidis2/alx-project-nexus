"use client";

import { useState } from "react";

interface SignUpFormProps {
  onSuccess: () => void;
}

interface FormData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  is_vendor: boolean;
  businessname?: string;
  contactinfo?: string;
  address?: string;
  bankaccount?: string;
  tin?: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    is_vendor: false,
    businessname: "",
    contactinfo: "",
    address: "",
    bankaccount: "",
    tin: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`https://alx-e-commerce.onrender.com/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_vendor"
            checked={formData.is_vendor}
            onChange={handleChange}
          />
          Register as Vendor
        </label>
      </div>

      {formData.is_vendor && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="businessname"
              value={formData.businessname || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Info
            </label>
            <input
              type="text"
              name="contactinfo"
              value={formData.contactinfo || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Account
            </label>
            <input
              type="text"
              name="bankaccount"
              value={formData.bankaccount || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TIN
            </label>
            <input
              type="text"
              name="tin"
              value={formData.tin || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              required
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0A2F6B] text-white py-3 rounded-lg font-semibold hover:bg-[#082855] disabled:opacity-50"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;

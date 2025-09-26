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
  role?: string;
  password: string;
}

interface ApiResponse {
  message?: string;
  success?: boolean;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://umurava-challenge-bn.onrender.com/api/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      onSuccess(); // Call success callback
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
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
          Enter username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your firstname
        </label>
        <input
          type="text"
          name="firstname"
          placeholder="Enter your firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your lastname
        </label>
        <input
          type="text"
          name="lastname"
          placeholder="Enter your lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          required
        >
          <option value="">-- Select a role --</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter your password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
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

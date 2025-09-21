"use client";

import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import AuthButton from "@/constants/AuthButton";
import Input from "@/constants/Input";

const Signin: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError(t("Email and password are required"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { user: { isVerified: boolean; role: string }; token: string; message?: string } = await res.json();

      if (!res.ok) {
        setError(data.message || t("Something went wrong"));
        setLoading(false);
        return;
      }

      if (!data.user.isVerified) {
        setError(t("Please verify your email first"));
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      switch (data.user.role) {
        case "buyer":
          router.push("/products")
          break;
        case "vendor":
          router.push("/vendor");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/");
      }
    } catch (error: unknown) {
      setError(t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    if (process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL) {
      window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{t("Sign In")}</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder={t("Email")}
            value={email}
            onChange={(value: string) => setEmail(value)}
          />
          <Input
            type="password"
            placeholder={t("Password")}
            value={password}
            onChange={(value: string) => setPassword(value)}
          />
          <AuthButton type="submit" disabled={loading}>
            {loading ? t("Loading...") : t("Sign In")}
          </AuthButton>
        </form>

        <div className="text-center text-gray-500 my-4">OR</div>

        <button
          onClick={loginWithGoogle}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md transition"
        >
          {t("Sign in with Google")}
        </button>

        <p className="text-center text-gray-500 mt-6">
          {t("Don't have an account?")}{" "}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            {t("Sign Up")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;

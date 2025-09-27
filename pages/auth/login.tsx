"use client";

import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import AuthButton from "@/constants/AuthButton";
import Input from "@/constants/Input";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";

interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  profile?: string;
  isConfirmed?: boolean;
}

interface LoginResponse {
  user: User;
  role: string;
  token: string;
  message?: string;
}

const Signin: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [identifier, setIdentifier] = useState<string>(""); // username or email
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIdentifier || !trimmedPassword) {
      setError(t("Username/email and password are required"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: trimmedIdentifier, password: trimmedPassword }),
        }
      );

      const data: LoginResponse = await res.json();

      if (!res.ok) {
        setError(data.message || t("Something went wrong"));
        setLoading(false);
        return;
      }

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Normalize role to lowercase
      const role = data.role?.toLowerCase() || "buyer";

      // Redirect based on role
      switch (role) {
        case "buyer":
          router.push("/");
          break;
        case "vendor":
        case "seller": // in case your backend calls it vendor
          router.push("/seller/dashboard");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/");
      }
    } catch (err) {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Link href="/" aria-label="Homepage">
        <Image src={Logo} alt="Logo" width={120} height={48} />
      </Link>

      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{t("Sign In")}</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder={t("Username or Email")}
            value={identifier}
            onChange={(value: string) => setIdentifier(value)}
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

        <div className="text-center text-gray-700 mt-6">
          {t("Don't have an account?")}
          <button
            onClick={() => {
              setIsRedirecting(true);
              router.push("/auth/register");
            }}
            disabled={isRedirecting}
            className="ml-2 text-blue-500 hover:underline disabled:opacity-50"
          >
            {isRedirecting ? t("Redirecting...") : t("Sign Up")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;

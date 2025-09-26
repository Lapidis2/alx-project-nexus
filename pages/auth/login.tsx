"use client";

import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import AuthButton from "@/constants/AuthButton";
import Input from "@/constants/Input";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png"
interface User {
  name: string;
  email: string;
  role: string;
  profile?: string;
  isVerified: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

const Signin: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRedirecting,setIsRedirecting]=useState(false)
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError(t("Email and password are required"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://alx-e-commerce.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        }
      );

      const data: LoginResponse = await res.json();

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
          router.push("/products");
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
    } catch  {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
		 <Link href="/" aria-label="Homepage">
        <Image src={Logo} alt="Logo" width={120} height={48} />
      </Link>
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

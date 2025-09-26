"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/public/assets/images/logo.png";
import Image from "next/image";
import SignUpForm from "@/components/auth/SignUpForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const SignUpPage = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const router = useRouter();

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
      <Link href="/" aria-label="Homepage">
        <Image src={Logo} alt="Logo" width={120} height={48} />
      </Link>

      {registrationSuccess ? (
        <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center w-full max-w-md shadow-md">
          <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
          <p className="mb-4">You can now log in to your account.</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <section className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-center text-gray-300 dark:text-gray-400 mb-6">
            Enter your credentials
          </p>

          <SignUpForm onSuccess={() => setRegistrationSuccess(true)} />

          <div className="mt-6">
            <SocialLogin />
          </div>
        </section>
      )}

      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mt-6"
      >
        <FaArrowLeft />
        Back to Home
      </button>
    </main>
  );
};

export default SignUpPage;

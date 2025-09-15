"use client";
import { useState } from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import VerifyEmailModal from "@/components/auth/VerifyEmailModal";
import SocialLogin from "@/components/auth/SocialLogin";

const SignUpPage = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Join us today and start your journey
          </p>
        </header>

        {/* Sign Up Form */}
        <SignUpForm onSuccess={() => setShowVerifyModal(true)} />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>

        {/* Social Logins */}
        <SocialLogin />
      </section>

      {/* Verify Email Modal */}
      {showVerifyModal && (
        <VerifyEmailModal onClose={() => setShowVerifyModal(false)} />
      )}
    </main>
  );
};

export default SignUpPage;

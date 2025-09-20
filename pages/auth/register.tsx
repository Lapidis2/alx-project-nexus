import { useState } from "react";
import Link from "next/link";
import Logo from "@/public/assets/images/logo.png";
import Image from "next/image";
import SignUpForm from "@/components/auth/SignUpForm";
import VerifyEmailModal from "@/components/auth/VerifyEmailModal";
import SocialLogin from "@/components/auth/SocialLogin";

const SignUpPage = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			  <Link href="/" aria-label="Homepage">
          <Image src={Logo} alt="Logo" width={120} height={48} />
        </Link>
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Create Account
        </h1>
        <p className="text-center text-gray-300 dark:text-gray-400 mb-6">
          Enter your credentials
        </p>

        {/* Sign Up Form */}
        <SignUpForm onSuccess={() => setShowVerifyModal(true)} />

        {/* Social Logins */}
        <div className="mt-6">
          <SocialLogin />
        </div>
      </section>

      {/* Verify Email Modal */}
      {showVerifyModal && (
        <VerifyEmailModal onClose={() => setShowVerifyModal(false)} />
      )}
    </main>
  );
};

export default SignUpPage;

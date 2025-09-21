"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  onClose: () => void;
}

const VerifyEmailModal = ({ onClose }: Props) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Missing token.");
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`, {
          method: "GET",
        });

        if (!res.ok) {
          const errData: { message?: string } | null = await res.json().catch(() => null);
          throw new Error(errData?.message || "Verification failed");
        }

        setStatus("success");
      } catch (error: unknown) {
        setStatus("error");
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Invalid token.");
        }
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md text-center">
        {status === "loading" && (
          <p className="text-gray-900 dark:text-white">Verifying your email...</p>
        )}

        {status === "success" && (
          <>
            <h2 className="text-green-600 font-bold text-lg">Email Verified!</h2>
            <p className="text-gray-900 dark:text-gray-300">You can now log in.</p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Continue to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-red-600 font-bold text-lg">Verification Failed</h2>
            <p className="text-gray-900 dark:text-gray-300">{errorMessage}</p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailModal;

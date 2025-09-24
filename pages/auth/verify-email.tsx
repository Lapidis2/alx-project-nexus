import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (!res.ok) throw new Error("Failed verification");
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && (
          <>
            <h2 className="text-green-600 font-bold">Email Verified!</h2>
            <p>You can now log in.</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Continue to Login
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-red-600 font-bold">Verification Failed</h2>
            <p>Invalid or expired token.</p>
            <button
              onClick={() => router.push("/auth/signup")}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default VerifyEmailPage;

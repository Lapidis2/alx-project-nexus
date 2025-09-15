"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Puff  from "react-loader-spinner";
import AuthButton from "../Constants/AuthButton";
import Input from "../Constants/Input";
import EmailSent from "../Components/Modal/EmailSent";

const SignUpPage = () => {
  const router = useRouter();
  const { token } = router.query as { token?: string };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState("");
  const [modal, setModal] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);


  useEffect(() => {
    if (token && !verificationAttempted) {
      setVerifying(true);
      setVerificationAttempted(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`)
        .then((res) => {
          if (res.data.message === "Email verified successfully") setVerifySuccess(true);
          else setVerifySuccess(false);
        })
        .catch(() => setVerifySuccess(false))
        .finally(() => setVerifying(false));
    }
  }, [token, verificationAttempted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return setError("Name is required"), setIsEmpty("name");
    if (!email.trim()) return setError("Email is required"), setIsEmpty("email");
    if (!password.trim()) return setError("Password is required"), setIsEmpty("password");

    await registerUser();
  };

 
  const registerUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        name,
        email,
        password,
      });

      if (response.data.message === "Email Verification Sent") {
        setModal(true);
      }
    } catch (err: any) {
      if (err.response?.data?.message === "Email already exists") setError("Email has been taken");
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const loginWithGoogle = () => {
    const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
    window.open(googleAuthUrl, "_self");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center p-4">
      {modal && <EmailSent email={email} />}

      {token && (
        <div className="w-full z-50 h-screen top-0 absolute flex items-center justify-center bg-black/20">
          <div className="p-4 bg-white rounded-lg w-full md:w-1/2 lg:w-1/4 flex flex-col items-center justify-center min-h-[160px]">
            {verifying && <Puff visible height={50} width={50} color="#C9974C" />}
            {!verifying && verifySuccess && (
              <div className="flex flex-col gap-2 items-center">
                <span>Your email has been successfully verified.</span>
                <Link href="/login" className="px-4 py-2 bg-primary text-white rounded">
                  Continue To Login
                </Link>
              </div>
            )}
            {!verifying && !verifySuccess && (
              <div className="flex flex-col gap-2 items-center">
                <span>Verification link expired or invalid token.</span>
                <Link href="/signup" className="px-4 py-2 bg-primary text-white rounded">
                  Back To Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <form className="flex flex-col gap-2 items-center w-full md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
        />
        {error && <span className="text-red-500">{error}</span>}
        <AuthButton type="submit" isLoading={loading}>
          Sign Up
        </AuthButton>
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={loginWithGoogle}
        >
          Sign Up With Google
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

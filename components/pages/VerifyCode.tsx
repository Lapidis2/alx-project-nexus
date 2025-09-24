'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useRouter } from 'next/navigation';
import { ThreeDots } from 'react-loader-spinner';
import OtpInput from '@/components/OtpInput';

export default function VerifyCode() {
  const router = useRouter();
  const signIn = useSignIn();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyCodeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (code.length !== 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/verify-code', { code });

      if (response.data.message === 'Login successful') {
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: response.data.user,
        });

        const role = response.data.user.role;
        if (role === 'admin') router.push('/admin');
        else if (role === 'vendor') router.push('/seller');
        else router.push('/buyer');
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid or expired code');
      } else {
        setError('Invalid or expired code');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center pt-10">
      <form
        onSubmit={verifyCodeHandler}
        className="flex flex-col gap-6 items-center w-full md:w-[60%] lg:w-[30%] p-2"
      >
        <h2 className="text-xl font-semibold">Enter Verification Code</h2>

        <OtpInput length={6} value={code} onChange={setCode} />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          {isLoading ? <ThreeDots height={20} color="white" /> : 'Verify'}
        </button>
      </form>
    </div>
  );
}

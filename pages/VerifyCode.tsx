import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

function VerifyCode() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef(Array(6).fill(null));

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index:number, value:string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = code.split('');
      newCode[index] = value;
      setCode(newCode.join(''));
      if (inputRefs.current[index + 1] && value.length > 0) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

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

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else if (response.data.user.role === 'vendor') {
          navigate('/seller');
        } else {
          navigate('/buyer');
        }
      }
    }catch (err) {
		console.error(err);
		if (axios.isAxiosError(err)) {
		  setError(err.response?.data?.message || 'Invalid or expired code');
		} else {
		  setError('Invalid or expired code');
		}
	  }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center pt-10">
      <form
        className="flex flex-col gap-6 items-center w-full md:w-[60%] lg:w-[30%] p-2"
        onSubmit={verifyCodeHandler}
      >
        <h2 className="text-xl font-semibold">Enter Verification Code</h2>

        <div className="flex justify-between gap-2">
        {Array(6).fill(0).map((_, index) => (
  <input
    key={index}
    type="text"
    maxLength={1}
    value={code[index] || ''}
    ref={(el) => { inputRefs.current[index] = el; }}
    onChange={(e) => handleInputChange(index, e.target.value)}
    className="w-12 h-12 text-center border rounded-md"
  />
))}
        </div>

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

export default VerifyCode;

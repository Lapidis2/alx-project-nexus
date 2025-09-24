
import dynamic from 'next/dynamic';

const VerifyCode = dynamic(() => import('../components/pages/VerifyCode'), {
  ssr: false, 
});

export default VerifyCode;

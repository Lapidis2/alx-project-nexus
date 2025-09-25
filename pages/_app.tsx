

import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';


import { AuthProvider } from 'react-auth-kit'; 

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [Layout, setLayout] = useState<React.FC<{ children: ReactNode }> | null>(null);
  const [loadingLayout, setLoadingLayout] = useState(true);

  useEffect(() => {
    setLoadingLayout(true);
    if (router.pathname.startsWith('/admin')) {
      import('@/components/dashboard/AdminLayout')
        .then((mod) => setLayout(() => mod.default))
        .finally(() => setLoadingLayout(false));
    } else if (router.pathname.startsWith('/seller/dashboard')) {
      import('@/components/dashboard/SellerLayout')
        .then((mod) => setLayout(() => mod.default))
        .finally(() => setLoadingLayout(false));
    } else if (router.pathname.startsWith('/buyer/dashboard')) {
      import('@/components/dashboard/BuyerLayout')
        .then((mod) => setLayout(() => mod.default))
        .finally(() => setLoadingLayout(false));
    } else {
      setLayout(null);
      setLoadingLayout(false);
    }
  }, [router.pathname]);

  if (loadingLayout) {
    return <div>Loading layout...</div>;
  }

  const PageContent = <Component {...pageProps} />;

  return (
    <AuthProvider
      authType={'localstorage'}
      authName={'_auth'}
     
    >
      {Layout ? <Layout>{PageContent}</Layout> : PageContent}
    </AuthProvider>
  );
}

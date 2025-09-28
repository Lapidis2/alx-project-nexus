'use client';

import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from '@/store';

import { Circles } from 'react-loader-spinner';

import { LoadingProvider, useLoading } from '@/context/LoadingContext'; // adjust path

const AuthProviderWrapper = dynamic(
  () => import('@/components/AuthProviderWrapper'),
  { ssr: false }
);

function InnerApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [Layout, setLayout] = useState<React.FC<{ children: ReactNode }> | null>(null);
  const [loadingLayout, setLoadingLayout] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { loading, setLoading } = useLoading();

  useEffect(() => setIsClient(true), []);

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

  // Listen to route changes and update loading state in context
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, setLoading]);

  if (!isClient || loadingLayout) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );
  }

  const PageContent = <Component {...pageProps} />;

  return (
    <>
      {Layout ? <Layout>{PageContent}</Layout> : PageContent}
      {loading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <Circles visible height="80" width="80" color="#C9974C" />
        </div>
      )}
    </>
  );
}

export default function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <LoadingProvider>
        <AuthProviderWrapper>
          <InnerApp {...props} />
        </AuthProviderWrapper>
      </LoadingProvider>
    </Provider>
  );
}

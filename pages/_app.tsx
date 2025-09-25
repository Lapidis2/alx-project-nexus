import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [layout, setLayout] = useState<React.FC<{ children: ReactNode }> | null>(null);

  useEffect(() => {
    if (router.pathname.startsWith('/admin')) {
      import('@/components/dashboard/AdminLayout').then((mod) => setLayout(() => mod.default));
    } else if (router.pathname.startsWith('/seller/dashboard')) {
      import('@/components/dashboard/SellerLayout').then((mod) => setLayout(() => mod.default));
    } else if (router.pathname.startsWith('/buyer/dashboard')) {
      import('@/components/dashboard/BuyerLayout').then((mod) => setLayout(() => mod.default));
    } else {
      setLayout(null);
    }
  }, [router.pathname]);

  if (layout) {
    const Layout = layout;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  return <Component {...pageProps} />;
}

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import AdminLayout from '@/components/dashboard/AdminLayout';
import SellerLayout from '@/components/dashboard/SellerLayout';
import BuyerLayout from '@/components/dashboard/BuyerLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [layout, setLayout] = useState<React.FC<{ children: ReactNode }> | null>(null);

  useEffect(() => {
    if (router.pathname.startsWith('/admin')) setLayout(() => AdminLayout);
    else if (router.pathname.startsWith('/seller/dashboard')) setLayout(() => SellerLayout);
    else if (router.pathname.startsWith('/buyer/dashboard')) setLayout(() => BuyerLayout);
    else setLayout(null);
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

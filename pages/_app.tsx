import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/dashboard/AdminLayout';
import SellerLayout from '@/components/dashboard/SellerLayout';
import BuyerLayout from '@/components/dashboard/BuyerLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  
  const getLayout = () => {
    if (router.pathname.startsWith('/admin')) return AdminLayout;
    if (router.pathname.startsWith('/seller')) return SellerLayout;
    if (router.pathname.startsWith('/buyer')) return BuyerLayout;
    return null; 
  };

  const Layout = getLayout();

  return Layout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  );
}

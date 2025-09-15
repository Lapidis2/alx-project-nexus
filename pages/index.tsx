import React from 'react'
import Header from "@/components/homePage/Header";
import HeroSection from '@/components/homePage/Hero';
import Footer from '@/components/homePage/Footer';
import PopularProducts from '@/components/homePage/TrendingProducts';
import AboutJEAN from '@/components/homePage/AboutUs';
import ContactSection from '@/components/homePage/contact';
import BestDeals from '@/components/homePage/bestDeal';

function index() {
  return (
	<>
	<Header />
	<HeroSection />
	<PopularProducts />
	<AboutJEAN/>
	<BestDeals/>
	<ContactSection/>
	<Footer />
	</>
  )
}

export default index

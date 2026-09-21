import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { SEO_CONFIG } from '../config/seo'
import HeroSection from '../components/home/HeroSection'
import PillarsSection from '../components/home/PillarsSection'
import ProductsSection from '../components/home/ProductsSection'
import VenturesRoadmap from '../components/home/VenturesRoadmap'
import GamificationSpotlight from '../components/home/GamificationSpotlight'
import CtaBanner from '../components/home/CtaBanner'

export const Home: React.FC = () => {
  return (
    <PageWrapper seo={SEO_CONFIG.home}>
      <HeroSection />
      <PillarsSection />
      <ProductsSection />
      <VenturesRoadmap />
      <GamificationSpotlight />
      <CtaBanner />
    </PageWrapper>
  )
}

export default Home

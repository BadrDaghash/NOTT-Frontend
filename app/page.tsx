import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { CategoriesSection } from '@/components/home/categories-section'
import { AboutSection } from '@/components/home/about-section'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}

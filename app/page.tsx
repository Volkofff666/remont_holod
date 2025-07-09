"use client"
import { usePhoneFormat } from "../hooks/usePhoneFormat"
import { useEffect } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { AdvantagesSection } from "@/components/sections/advantages-section"
import { ServicesSection } from "@/components/sections/services-section"
import { HowWeWorkSection } from "@/components/sections/how-we-work-section"
import { GuaranteesSection } from "@/components/sections/guarantees-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  const { phoneValue, handlePhoneChange } = usePhoneFormat()

  useEffect(() => {
    // Плавная прокрутка для якорных ссылок
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <ServicesSection />
        <HowWeWorkSection />
        <GuaranteesSection />
        <GallerySection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

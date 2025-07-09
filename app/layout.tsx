import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Тест-ACOOLing | Ремонт холодильников в СПб | Выезд от 15 минут | Гарантия 12 месяцев",
  description:
    "Профессиональный ремонт холодильников на дому в Санкт-Петербурге. Выезд от 15 минут, без предоплаты, гарантия до 12 месяцев. Бесплатная диагностика при ремонте.",
  keywords: "ремонт холодильников, СПб, Санкт-Петербург, мастер, на дому, срочно, гарантия",
  openGraph: {
    title: "Тест-ACOOLing | Ремонт холодильников в СПб",
    description: "Профессиональный ремонт холодильников на дому. Выезд от 15 минут, гарантия до 12 месяцев.",
    type: "website",
    locale: "ru_RU",
    siteName: "Тест-ACOOLing",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://remholod-spb.ru",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Тест-ACOOLing",
              description: "Профессиональный ремонт холодильников на дому в Санкт-Петербурге",
              url: "https://remholod-spb.ru",
              telephone: "+7-812-123-45-67",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Примерная, д. 1",
                addressLocality: "Санкт-Петербург",
                addressCountry: "RU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "59.9311",
                longitude: "30.3609",
              },
              openingHours: "Mo-Su 08:00-22:00",
              priceRange: "300-2000 RUB",
              serviceArea: {
                "@type": "City",
                name: "Санкт-Петербург",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

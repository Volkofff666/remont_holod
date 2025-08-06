import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import YandexMetrika from '@/components/YandexMetrika'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title:
		'ACOOLing | Ремонт холодильников в СПб | Выезд от 15 минут | Гарантия 12 месяцев',
	description:
		'Профессиональный ремонт холодильников на дому в Санкт-Петербурге. Выезд от 15 минут, без предоплаты, гарантия до 12 месяцев. Бесплатная диагностика при ремонте.',
	keywords:
		'ремонт холодильников, СПб, Санкт-Петербург, мастер, на дому, срочно, гарантия',
	openGraph: {
		title: 'ACOOLing | Ремонт холодильников в СПб',
		description:
			'Профессиональный ремонт холодильников на дому. Выезд от 15 минут, гарантия до 12 месяцев.',
		type: 'website',
		locale: 'ru_RU',
		siteName: 'ACOOLing',
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: 'https://acooling.ru',
	},
	generator: 'Next,js',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'LocalBusiness',
							name: 'ACOOLing',
							description:
								'Профессиональный ремонт холодильников на дому в Санкт-Петербурге',
							url: 'https://acooling.ru',
							telephone: '8-904-633-10-45',
							address: {
								'@type': 'PostalAddress',
								streetAddress: 'ул. Хлопина, д. 9к1',
								addressLocality: 'Санкт-Петербург',
								addressCountry: 'RU',
							},
							geo: {
								'@type': 'GeoCoordinates',
								latitude: '59.9311',
								longitude: '30.3609',
							},
							openingHours: 'Mo-Su 08:00-22:00',
							priceRange: '300-2000 RUB',
							serviceArea: {
								'@type': 'City',
								name: 'Санкт-Петербург',
							},
							aggregateRating: {
								'@type': 'AggregateRating',
								ratingValue: '4.9',
								reviewCount: '127',
							},
						}),
					}}
				/>
				<meta name='yandex-verification' content='0ac84a65bdeee7cf' />
			</head>
			<body className={inter.className}>
				{children} <YandexMetrika />
			</body>
		</html>
	)
}

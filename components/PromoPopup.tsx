// components/promo-popup.tsx
'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function PromoPopup() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	const handleClose = () => {
		setIsVisible(false)
	}

	const handleWhatsAppClick = () => {
		window.open('https://wa.me/79046331045', '_blank') // замени на свой номер
	}

	const handleCallClick = () => {
		window.location.href = 'tel:+79046331045' // замени на свой номер
	}

	if (!isVisible) return null

	return (
		<div className='fixed bottom-6 right-6 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-5 transition-all'>
			<button
				onClick={handleClose}
				className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
				aria-label='Закрыть'
			>
				<X size={20} />
			</button>

			<h3 className='font-bold text-lg text-gray-900 mb-2'>
				🔥 Получите скидку 20%
			</h3>
			<p className='text-gray-600 mb-4'>
				По промокоду <span className='font-semibold text-blue-600'>"Сайт"</span>
			</p>

			<div className='flex flex-col gap-2'>
				<button
					onClick={handleWhatsAppClick}
					className='w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition'
				>
					Перейти в WhatsApp
				</button>
				<button
					onClick={handleCallClick}
					className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition'
				>
					Позвонить
				</button>
			</div>
		</div>
	)
}

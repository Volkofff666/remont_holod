'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const name = searchParams.get('name')
	const phone = searchParams.get('phone')

	// Отправка цели в Яндекс.Метрику
	useEffect(() => {
		if (typeof window !== 'undefined' && window.ym) {
			try {
				window.ym(103596086, 'reachGoal', 'FORM_SUBMIT')
				console.log('Яндекс.Метрика: цель FORM_SUBMIT отправлена')
			} catch (error) {
				console.error('Ошибка отправки цели в Яндекс.Метрику:', error)
			}
		}
	}, [])

	return (
		<div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
			<div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
				<div className='text-green-500 text-5xl mb-4'>✓</div>
				<h1 className='text-2xl font-bold mb-4'>Заявка отправлена!</h1>
				<p className='text-gray-600 mb-6'>
					Спасибо, <strong>{name || 'клиент'}</strong>! Мы свяжемся с вами в
					ближайшее время по телефону <strong>{phone || 'указанному'}</strong>.
				</p>
				<div className='space-y-3'>
					<Button
						onClick={() => router.push('/')}
						className='w-full bg-blue-500 hover:bg-blue-600'
					>
						Вернуться на главную
					</Button>
				</div>
			</div>
		</div>
	)
}

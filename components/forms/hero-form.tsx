'use client'

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Captcha from '@/components/captcha/Captcha' // <-- добавили

export function HeroForm() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const [captchaToken, setCaptchaToken] = useState('') // <-- добавили
	const modalRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	// Форматирование номера — ваш код
	const formatPhoneNumber = (value: string): string => {
		const phoneNumber = value.replace(/\D/g, '')
		if (!phoneNumber) return ''
		let cleaned = phoneNumber
		if (cleaned.startsWith('8')) cleaned = '7' + cleaned.slice(1)
		if (cleaned.startsWith('9') && cleaned.length >= 10) cleaned = '7' + cleaned
		if (!cleaned.startsWith('7') && cleaned.length > 0) {
			if (cleaned.length === 1 && !['7', '8', '9'].includes(cleaned)) {
				cleaned = '7'
			} else if (cleaned.length > 1) {
				cleaned = '7' + cleaned
			}
		}
		if (cleaned.length > 11) cleaned = cleaned.slice(0, 11)
		if (cleaned.startsWith('7')) {
			let formatted = '+'
			for (let i = 0; i < cleaned.length; i++) {
				if (i === 1) formatted += ' '
				if (i === 4) formatted += ' '
				if (i === 7) formatted += '-'
				if (i === 9) formatted += '-'
				formatted += cleaned[i]
			}
			return formatted
		}
		if (cleaned.length > 0) return '+' + cleaned
		return ''
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value
		const formatted = formatPhoneNumber(input)
		setPhone(formatted)
	}

	const getCleanPhoneNumber = (): string => phone.replace(/\D/g, '')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		const cleanPhone = getCleanPhoneNumber()

		if (!name.trim()) {
			setModalMessage('Пожалуйста, введите ваше имя')
			setIsModalOpen(true)
			setIsSubmitting(false)
			return
		}

		if (
			!cleanPhone ||
			!cleanPhone.startsWith('7') ||
			cleanPhone.length !== 11
		) {
			setModalMessage(
				'Пожалуйста, введите корректный номер телефона (+7 XXX XXX-XX-XX)'
			)
			setIsModalOpen(true)
			setIsSubmitting(false)
			return
		}

		// Новое: без токена не отправляем
		if (!captchaToken) {
			setModalMessage('Подтвердите, что вы не робот.')
			setIsModalOpen(true)
			setIsSubmitting(false)
			return
		}

		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					phone: cleanPhone,
					source: 'Hero форма',
					captchaToken, // <-- отправляем токен
				}),
			})

			const result = await response.json()

			if (response.ok && result.success) {
				router.push(
					`/success?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(
						cleanPhone
					)}`
				)
				;(globalThis as any).__resetCaptcha?.()
				setCaptchaToken('')
			} else {
				setModalMessage(
					result.error ||
						'Ошибка отправки заявки. Попробуйте еще раз или позвоните нам.'
				)
				setIsModalOpen(true)
				;(globalThis as any).__resetCaptcha?.()
				setCaptchaToken('')
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			setModalMessage(
				'Ошибка отправки заявки. Попробуйте еще раз или позвоните нам.'
			)
			setIsModalOpen(true)
			;(globalThis as any).__resetCaptcha?.()
			setCaptchaToken('')
		} finally {
			setIsSubmitting(false)
		}
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setModalMessage('')
	}

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeModal()
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (modalRef.current && e.target === modalRef.current) closeModal()
	}

	return (
		<div className='bg-blue-600 text-white p-6 rounded-lg mb-8'>
			<p className='text-lg font-semibold mb-4'>
				Оставьте заявку сейчас — получите скидку 10%
			</p>
			<form onSubmit={handleSubmit} className='space-y-3'>
				<Input
					placeholder='Ваше имя'
					value={name}
					onChange={e => setName(e.target.value)}
					className='bg-white text-gray-900 placeholder:text-gray-500'
					required
				/>
				<Input
					placeholder='+7 999 999-99-99'
					className='bg-white text-gray-900 placeholder:text-gray-500'
					value={phone}
					onChange={handlePhoneChange}
					required
				/>

				{/* Уведомление о данных — оставляем, даже если shield видим */}
				<p className='text-[11px] text-blue-100'>
					На этой странице используется Yandex SmartCaptcha. Данные могут
					обрабатываться сервисом для защиты от ботов.
				</p>

				{/* ВИДИМАЯ КАПЧА */}
				<Captcha
					sitekey={process.env.NEXT_PUBLIC_YC_CAPTCHA_SITEKEY as string}
					language='ru'
					// test // <- раскомментируйте в dev для тестирования
					onToken={t => setCaptchaToken(t)}
					onTokenExpired={() => setCaptchaToken('')}
					onStatusChange={s => console.log('captcha:', s)}
					hideShield={false}
					className='pt-1'
				/>

				<Button
					type='submit'
					size='lg'
					className='w-full bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50'
					disabled={
						isSubmitting ||
						!name.trim() ||
						getCleanPhoneNumber().length < 11 ||
						!getCleanPhoneNumber().startsWith('7') ||
						!captchaToken
					}
				>
					{isSubmitting ? 'Отправляем...' : 'Вызвать мастера'}
				</Button>
			</form>

			<p className='text-xs text-blue-100 mt-2'>
				Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
			</p>

			{isModalOpen && (
				<div
					ref={modalRef}
					className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'
					onClick={handleBackdropClick}
				>
					<div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
						<h2 className='text-xl font-semibold text-center mb-4 text-black'>
							{modalMessage.includes('Ошибка') ? 'Ошибка' : 'Спасибо!'}
						</h2>
						<p className='text-gray-600 text-center mb-6'>{modalMessage}</p>
						<Button
							onClick={closeModal}
							className='w-full bg-white text-blue-600 hover:bg-gray-100'
						>
							Закрыть
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

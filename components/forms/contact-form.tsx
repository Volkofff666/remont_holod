'use client'

import type React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InvisibleCaptcha from '@/components/captcha/InvisibleCaptcha' // <-- невидимая капча

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	// токен и управление показом челленджа
	const [captchaToken, setCaptchaToken] = useState('')
	const [captchaVisible, setCaptchaVisible] = useState(false)

	const modalRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const router = useRouter()

	const sitekey = process.env.NEXT_PUBLIC_YC_CAPTCHA_SITEKEY as string
	const testMode = process.env.NEXT_PUBLIC_YC_CAPTCHA_TEST === 'true'

	// Форматирование телефона (как у вас)
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

	// отдельная «реальная» отправка — вызывается после успешной капчи
	const submitAfterCaptcha = useCallback(async () => {
		const cleanPhone = getCleanPhoneNumber()
		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					phone: cleanPhone,
					source: 'Контактная форма',
					captchaToken, // <-- невидимый токен
				}),
			})

			let result: any
			try {
				result = await response.json()
			} catch {
				throw new Error('Invalid response format from server')
			}

			if (response.ok && result.success) {
				router.push(
					`/success?name=${encodeURIComponent(
						name.trim()
					)}&phone=${encodeURIComponent(cleanPhone)}`
				)
				setCaptchaToken('') // одноразовый токен — сбрасываем
			} else {
				setModalMessage(
					result.error || 'Ошибка отправки заявки. Попробуйте еще раз.'
				)
				setIsModalOpen(true)
				setCaptchaToken('')
			}
		} catch (error: any) {
			console.error('ContactForm error:', error)
			setModalMessage(
				`Ошибка отправки заявки: ${error.message || 'Попробуйте еще раз.'}`
			)
			setIsModalOpen(true)
			setCaptchaToken('')
		} finally {
			setIsSubmitting(false)
		}
	}, [captchaToken, getCleanPhoneNumber, name, router])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isSubmitting) return
		setIsSubmitting(true)

		const cleanPhone = getCleanPhoneNumber()

		// Валидация
		if (!name.trim()) {
			setModalMessage('Имя обязательно')
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

		// если токена нет — открываем невидимую капчу
		if (!captchaToken) {
			setCaptchaVisible(true)
			return // продолжение — в onSuccess капчи
		}

		// если токен уже есть (повторная отправка в срок действия) — сразу отправляем
		await submitAfterCaptcha()
	}

	// успешная проверка: сохраняем токен и продолжаем отправку без доп.кликов
	const handleCaptchaSuccess = useCallback(
		(token: string) => {
			setCaptchaToken(token)
			submitAfterCaptcha()
		},
		[submitAfterCaptcha]
	)

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
		<div className='max-w-md mx-auto p-4'>
			<form ref={formRef} onSubmit={handleSubmit} className='space-y-4'>
				<Input
					placeholder='Ваше имя'
					name='name'
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
				<Input
					placeholder='+7 999 999-99-99'
					name='phone'
					value={phone}
					onChange={handlePhoneChange}
					required
				/>

				{/* Уведомление об обработке данных SmartCaptcha (обязательно при hideShield) */}
				<p className='text-xs text-gray-500'>
					На этой странице используется Yandex SmartCaptcha. Данные могут
					обрабатываться сервисом для защиты от ботов.
				</p>

				{/* Невидимая капча — открываем задание по visible */}
				<InvisibleCaptcha
					sitekey={sitekey}
					language='ru'
					test={testMode}
					hideShield={true} // прячем блок уведомления виджета
					shieldPosition='bottom-right'
					visible={captchaVisible} // управляем показом извне
					onClose={() => setCaptchaVisible(false)}
					onToken={handleCaptchaSuccess}
					onTokenExpired={() => setCaptchaToken('')}
					onStatusChange={s => {
						if (s === 'network-error') {
							setModalMessage('Сетевая ошибка капчи. Попробуйте ещё раз.')
							setIsModalOpen(true)
							setIsSubmitting(false)
						}
						if (s === 'javascript-error') {
							setModalMessage(
								'Критическая ошибка капчи. Повторите попытку позже.'
							)
							setIsModalOpen(true)
							setIsSubmitting(false)
						}
					}}
				/>

				<Button
					size='lg'
					className='w-full bg-blue-600 hover:bg-blue-700'
					type='submit'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Отправляем...' : 'Оставить заявку'}
				</Button>
			</form>

			{isModalOpen && (
				<div
					ref={modalRef}
					className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'
					onClick={handleBackdropClick}
				>
					<div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
						<h2 className='text-xl font-semibold text-center mb-4'>
							{modalMessage.includes('Ошибка') ? 'Ошибка' : 'Спасибо!'}
						</h2>
						<p className='text-gray-600 text-center mb-6'>{modalMessage}</p>
						<Button
							onClick={closeModal}
							className='w-full bg-blue-600 hover:bg-blue-700'
						>
							Закрыть
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

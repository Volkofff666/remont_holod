'use client'

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const modalRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLFormElement>(null)
	const router = useRouter()

	// Функция форматирования номера телефона
	const formatPhoneNumber = (value: string): string => {
		// Убираем все нецифровые символы
		const phoneNumber = value.replace(/\D/g, '')

		// Если номер пустой, возвращаем пустую строку
		if (!phoneNumber) return ''

		let cleaned = phoneNumber

		// Если номер начинается с 8, заменяем на 7
		if (cleaned.startsWith('8')) {
			cleaned = '7' + cleaned.slice(1)
		}

		// Если номер начинается с 9 и имеет достаточную длину, добавляем код страны 7
		if (cleaned.startsWith('9') && cleaned.length >= 10) {
			cleaned = '7' + cleaned
		}

		// Если номер не начинается с 7, обрезаем или добавляем 7 в начало
		if (!cleaned.startsWith('7') && cleaned.length > 0) {
			// Если введена первая цифра не 7 и не 8 и не 9, то заменяем на 7
			if (cleaned.length === 1 && !['7', '8', '9'].includes(cleaned)) {
				cleaned = '7'
			} else if (cleaned.length > 1) {
				// Для остальных случаев добавляем 7 в начало
				cleaned = '7' + cleaned
			}
		}

		// Ограничиваем длину до 11 цифр (7 + 10 цифр номера)
		if (cleaned.length > 11) {
			cleaned = cleaned.slice(0, 11)
		}

		// Форматируем номер только если он начинается с 7
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

		// Если номер не начинается с 7, но есть цифры, начинаем с +
		if (cleaned.length > 0) {
			return '+' + cleaned
		}

		return ''
	}

	// Обработчик изменения номера телефона
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value
		const formatted = formatPhoneNumber(input)
		setPhone(formatted)
	}

	// Получение чистого номера для отправки (только цифры)
	const getCleanPhoneNumber = (): string => {
		return phone.replace(/\D/g, '')
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const cleanPhone = getCleanPhoneNumber()

		// Валидация перед отправкой
		if (!name.trim()) {
			setModalMessage('Имя обязательно')
			setIsModalOpen(true)
			setIsSubmitting(false)
			return
		}

		// Проверяем, что номер начинается с 7 и имеет 11 цифр
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

		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name.trim(),
					phone: cleanPhone,
					source: 'Контактная форма',
				}),
			})

			console.log(
				'ContactForm: HTTP status:',
				response.status,
				'OK:',
				response.ok
			)

			let result
			try {
				result = await response.json()
				console.log('ContactForm API response:', result)
			} catch (jsonError) {
				console.error('ContactForm: JSON parse error:', jsonError)
				throw new Error('Invalid response format from server')
			}

			if (response.ok && result.success) {
				// Редирект на страницу успеха вместо модального окна
				router.push(
					`/success?name=${encodeURIComponent(
						name.trim()
					)}&phone=${encodeURIComponent(cleanPhone)}`
				)
			} else {
				setModalMessage(
					result.error || 'Ошибка отправки заявки. Попробуйте еще раз.'
				)
				setIsModalOpen(true)
			}
		} catch (error) {
			console.error('ContactForm error:', error)
			setModalMessage(
				`Ошибка отправки заявки: ${error.message || 'Попробуйте еще раз.'}`
			)
			setIsModalOpen(true)
		} finally {
			setIsSubmitting(false)
		}
	}

	// Закрытие модала
	const closeModal = () => {
		setIsModalOpen(false)
		setModalMessage('')
	}

	// Закрытие модала по клавише Esc
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeModal()
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	// Закрытие модала при клике на фон
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (modalRef.current && e.target === modalRef.current) {
			closeModal()
		}
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

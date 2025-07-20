'use client'

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'

export function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const modalRef = useRef<HTMLDivElement>(null)
	const formRef = useRef<HTMLFormElement>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		const normalizedPhone = phone.replace(/[\s()-]/g, '') // Нормализация телефона

		// Валидация перед отправкой
		if (!name.trim() || !normalizedPhone) {
			setModalMessage('Имя и телефон обязательны')
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
					phone: normalizedPhone,
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
				setModalMessage(
					'Заявка отправлена! Мы свяжемся с вами в течение 5 минут.'
				)
				setIsModalOpen(true)
				setName('') // Очистка полей через состояние
				setPhone('')
				if (formRef.current) formRef.current.reset() // Безопасная очистка формы
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
				<PhoneInput
					placeholder='+7 999 999-99-99'
					name='phone'
					value={phone}
					onChange={e => setPhone(e.target.value)}
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

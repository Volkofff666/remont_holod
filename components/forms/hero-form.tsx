'use client'

import type React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'

export function HeroForm() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const modalRef = useRef<HTMLDivElement>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					phone,
					source: 'Hero форма',
				}),
			})

			const result = await response.json()

			if (result.success) {
				setModalMessage(
					'Заявка отправлена! Мы свяжемся с вами в течение 5 минут.'
				)
				setIsModalOpen(true)
				setName('')
				setPhone('')
			} else {
				setModalMessage(
					'Ошибка отправки заявки. Попробуйте еще раз или позвоните нам.'
				)
				setIsModalOpen(true)
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			setModalMessage(
				'Ошибка отправки заявки. Попробуйте еще раз или позвоните нам.'
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
				<PhoneInput
					placeholder='+7 999 999-99-99'
					className='bg-white text-gray-900 placeholder:text-gray-500'
					value={phone}
					onChange={e => setPhone(e.target.value)}
					required
				/>
				<Button
					type='submit'
					size='lg'
					className='w-full bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50'
					disabled={isSubmitting || !name.trim() || !phone.trim()}
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

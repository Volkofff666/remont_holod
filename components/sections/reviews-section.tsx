'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

interface Review {
	text: string
	author: string
	rating: number
}

const reviews: Review[] = [
	{
		text: 'Приехал в течение часа, устранил течь, всё работает идеально. Спасибо!',
		author: 'Анна, Приморский р-н',
		rating: 5,
	},
	{
		text: 'Думал, всё — сгорел компрессор, но обошлось заменой реле. Быстро, честно, приятно.',
		author: 'Владимир, Купчино',
		rating: 5,
	},
	{
		text: 'Хорошее отношение, сделали по-человечески. Сохраняю номер.',
		author: 'Ирина, Калининский район',
		rating: 5,
	},
	{
		text: 'Все хорошо спасибо за работу!',
		author: 'Alesk',
		rating: 5,
	},
	{
		text: 'Мастер приехал мгновенно, день в день, несмотря на позднее время. Услуга оказана качественно и быстро. Вежливое общение. Рекомендую, профессионал своего дела! 👍',
		author: 'Malina',
		rating: 5,
	},
	{
		text: 'Отличный специалист своего дела, приехал в срочном порядке, помог, объяснил, всё по делу рассказал нам о нашей проблеме в кофейне! Спасибо большое! Советую Андрея, как специалиста )',
		author: 'Юля Живолуп',
		rating: 5,
	},
	{
		text: 'Сломалась холодильная камера, договорилась о встрече в этот же день, мастер приехал без опозданий и за полчаса проблема была найдена и устранена с гарантией на работу и деталь, все супер)',
		author: 'Анна Демченко',
		rating: 5,
	},
	{
		text: 'Обратилась с проблемой неработающей морозильной камеры в холодильнике. Андрей смог приехать в тот же день и быстро устранил поломку. Я в восторге, так что советую данного мастера )',
		author: 'Дарья',
		rating: 5,
	},
	{
		text: 'Покунсультировал по всем интересующим меня вопросам, большое спасибо!!!',
		author: 'Виталий Олегович',
		rating: 5,
	},
	{
		text: 'Прекрасный мастер! Приехал в назначенное время, нашел проблему в холодильнике и устранил её очень быстро и качественно. Цена была выше, т.к. до этого приезжал другой мастер, совершенно не разбираясь в технике, назвал неправильную проблему. После чего я спросила стоимость этой проблемы у Андрея, не зная точной причины неисправности❗️ И так как дело было в другом, в более важном компоненте, соответственно, и окончательная цена повысилась. Спасибо ещё раз большое! Вы очень вежливый и внимательный мужчина.',
		author: 'Анастасия',
		rating: 5,
	},
	{
		text: 'В ночи сломался холодильник. А днём надо уезжать на дачу. Написала Андрею, ответил рано утром. Приехал раньше, чем обещал, огромное ему спасибо за это. Быстро выявил неисправность. Пытался реанимировать компрессор, чтобы сэкономить мне деньги. Но даже мне, несведущей в этом деле, стало понятно, что компрессор просто сдох. Андрей поставил новый. Быстро, чисто, профессионально. Однозначно рекомендую мастера. 🔥',
		author: 'Жанна',
		rating: 5,
	},
	{
		text: 'Оперативно и качественно предоставлена услуга по ремонту холодильника.',
		author: 'Алёна',
		rating: 5,
	},
	{
		text: 'Профессиональный, грамотный, вежливый специалист. Пунктуален, приехал чуть раньше оговорённого времени, предварительно согласовав данный момент. Работа по ремонту холодильника Индезит выполнена качественно и быстро. Со связью через Авито не было никаких проблем, отвечал без задержек и по существу. Для решения вопросов по ремонту холодильника однозначно рекомендую.',
		author: 'Александр',
		rating: 5,
	},
	{
		text: 'Отличный мастер!!! Всё в срок, вовремя и качественно. Благодарю.',
		author: 'Ирина',
		rating: 5,
	},
	{
		text: 'Дело мастера боится! И добавить нечего). Чувствуется опыт, знание дела. Работа выполнена качественно и быстро.',
		author: 'Евгений',
		rating: 5,
	},
	{
		text: 'Холодильник перестал работать, мастер приехал оперативно, быстро определил проблему, в результате короткого замыкания вышел из строя вентилятор. Заменил вентилятор, всё работает. Качеством работы и стоимостью доволен.',
		author: 'Кирилл Филиппов',
		rating: 5,
	},
	{
		text: 'Остался очень доволен быстротой, порядочностью мастера и качеством ремонта холодильника. Приехал на следующее утро. Всего наилучшего.',
		author: 'Basilevs',
		rating: 5,
	},
]

export function ReviewsSection() {
	const [currentIndex, setCurrentIndex] = useState(reviews.length)
	const [slidesToShow, setSlidesToShow] = useState(3)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [selectedReview, setSelectedReview] = useState<Review | null>(null)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle')
	const sliderRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const modalRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	// Создаём расширенный массив отзывов: копии в начале и конце
	const extendedReviews = [
		...reviews.slice(-slidesToShow),
		...reviews,
		...reviews.slice(0, slidesToShow),
	]

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

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value
		const formatted = formatPhoneNumber(input)
		setPhone(formatted)
	}

	const getCleanPhoneNumber = (): string => {
		return phone.replace(/\D/g, '')
	}

	// Определяем количество слайдов в зависимости от ширины экрана
	useEffect(() => {
		const updateSlidesToShow = () => {
			const width = window.innerWidth
			if (width < 640) {
				setSlidesToShow(1)
			} else if (width < 1024) {
				setSlidesToShow(2)
			} else {
				setSlidesToShow(3)
			}
			setCurrentIndex(reviews.length)
		}

		updateSlidesToShow()
		window.addEventListener('resize', updateSlidesToShow)
		return () => window.removeEventListener('resize', updateSlidesToShow)
	}, [])

	// Автопрокрутка каждые 3 секунды
	useEffect(() => {
		const autoSlide = () => {
			if (!isTransitioning && !selectedReview) {
				setIsTransitioning(true)
				setCurrentIndex(prev => prev + 1)
			}
		}

		const interval = setInterval(autoSlide, 3000)

		return () => clearInterval(interval)
	}, [isTransitioning, selectedReview])

	// Обработка переходов для бесконечной прокрутки
	useEffect(() => {
		if (isTransitioning) {
			timeoutRef.current = setTimeout(() => {
				if (currentIndex >= reviews.length + slidesToShow) {
					setCurrentIndex(slidesToShow)
					setIsTransitioning(false)
				} else if (currentIndex < slidesToShow) {
					setCurrentIndex(reviews.length)
					setIsTransitioning(false)
				} else {
					setIsTransitioning(false)
				}
			}, 300)
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [currentIndex, isTransitioning, slidesToShow])

	// Закрытие модала по клавише Esc
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setSelectedReview(null)
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	// Закрытие модала при клике на фон
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (modalRef.current && e.target === modalRef.current) {
			setSelectedReview(null)
		}
	}

	const nextSlide = () => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentIndex(prev => prev + 1)
	}

	const prevSlide = () => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentIndex(prev => prev - 1)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus('idle')

		const cleanPhone = getCleanPhoneNumber()

		// Валидация данных
		if (!name.trim()) {
			setSubmitStatus('error')
			setIsSubmitting(false)
			return
		}

		// Проверяем, что номер начинается с 7 и имеет 11 цифр
		if (
			!cleanPhone ||
			!cleanPhone.startsWith('7') ||
			cleanPhone.length !== 11
		) {
			setSubmitStatus('error')
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
					source: 'Форма в отзывах',
				}),
			})

			let result
			try {
				result = await response.json()
			} catch (jsonError) {
				throw new Error('Invalid response format from server')
			}

			if (response.ok && result.success) {
				setSubmitStatus('success')
				// Очищаем форму
				setName('')
				setPhone('')
				// Через 2 секунды редиректим
				setTimeout(() => {
					router.push(
						`/success?name=${encodeURIComponent(
							name.trim()
						)}&phone=${encodeURIComponent(cleanPhone)}`
					)
				}, 2000)
			} else {
				setSubmitStatus('error')
			}
		} catch (error) {
			console.error('Form error:', error)
			setSubmitStatus('error')
		} finally {
			setIsSubmitting(false)
		}
	}

	// Ограничение текста до 150 символов
	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text
		return text.slice(0, maxLength) + '...'
	}

	return (
		<section id='reviews' className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center text-gray-900 mb-12'>
					Отзывы наших клиентов
				</h2>

				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							ref={sliderRef}
							className='flex transition-transform duration-300 ease-in-out'
							style={{
								transform: `translateX(-${
									currentIndex * (100 / slidesToShow)
								}%)`,
								transition: isTransitioning
									? 'transform 300ms ease-in-out'
									: 'none',
							}}
						>
							{extendedReviews.map((review, index) => (
								<div
									key={`${review.author}-${index}`}
									className={`flex-shrink-0 px-3 ${
										slidesToShow === 1
											? 'w-full'
											: slidesToShow === 2
											? 'w-1/2'
											: 'w-1/3'
									}`}
								>
									<Card className='h-full min-h-[200px] flex flex-col'>
										<CardContent className='p-6 flex flex-col flex-grow'>
											<div className='flex mb-4'>
												{[...Array(review.rating)].map((_, i) => (
													<Star
														key={i}
														className='text-yellow-400 fill-current'
														size={20}
													/>
												))}
											</div>
											<p className='text-gray-700 mb-4 flex-grow'>
												"{truncateText(review.text, 150)}"
												{review.text.length > 150 && (
													<button
														className='text-blue-600 hover:underline ml-1 text-sm'
														onClick={() => setSelectedReview(review)}
													>
														Читать далее
													</button>
												)}
											</p>
											<p className='text-sm text-gray-500 mt-auto'>
												— {review.author}
											</p>
										</CardContent>
									</Card>
								</div>
							))}
						</div>
					</div>

					<Button
						variant='outline'
						size='icon'
						className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10'
						onClick={prevSlide}
					>
						<ChevronLeft className='text-gray-600' size={24} />
					</Button>

					<Button
						variant='outline'
						size='icon'
						className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-10 h-10'
						onClick={nextSlide}
					>
						<ChevronRight className='text-gray-600' size={24} />
					</Button>

					<div className='flex justify-center mt-6 space-x-2'>
						{reviews.map((_, index) => (
							<button
								key={index}
								className={`w-3 h-3 rounded-full transition-colors ${
									index === (currentIndex - slidesToShow) % reviews.length
										? 'bg-blue-600'
										: 'bg-gray-300'
								}`}
								onClick={() => {
									setIsTransitioning(true)
									setCurrentIndex(index + slidesToShow)
									timeoutRef.current = setTimeout(() => {
										setIsTransitioning(false)
									}, 300)
								}}
							/>
						))}
					</div>
				</div>

				<div className='text-center mt-8'>
					<div className='flex items-center justify-center gap-2 mb-2'>
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className='text-yellow-400 fill-current'
								size={24}
							/>
						))}
						<span className='text-xl font-bold'>4.9</span>
					</div>
					<p className='text-gray-600'>Средняя оценка по Яндекс.Картам</p>
				</div>

				<div className='text-center mt-4'>
					<Button
						asChild
						className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 transition-transform hover:scale-105'
					>
						<a
							href='https://www.avito.ru/user/4b48f908d338b84bb9c523b3359b1811/profile?src=sharing#open-reviews-list'
							target='_blank'
							rel='noopener noreferrer'
						>
							Посмотреть все отзывы на Авито
						</a>
					</Button>
				</div>

				{/* Минималистичная форма */}
				<div className='max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-12'>
					<div className='text-center mb-6'>
						<h3 className='text-2xl font-bold text-gray-900 mb-2'>
							Получите консультацию бесплатно
						</h3>
						<p className='text-gray-600'>
							Оставьте заявку и наш мастер перезвонит в течение 15 минут
						</p>
					</div>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div className='grid md:grid-cols-2 gap-4'>
							<Input
								placeholder='Ваше имя'
								value={name}
								onChange={e => setName(e.target.value)}
								required
								className='h-12'
							/>
							<Input
								placeholder='+7 999 999-99-99'
								value={phone}
								onChange={handlePhoneChange}
								required
								className='h-12'
							/>
						</div>

						<Button
							type='submit'
							disabled={isSubmitting}
							className='w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium'
						>
							{isSubmitting ? 'Отправляем...' : 'Получить консультацию'}
						</Button>

						{submitStatus === 'success' && (
							<div className='text-center text-green-600 text-sm'>
								Заявка отправлена! Мы скоро перезвоним.
							</div>
						)}

						{submitStatus === 'error' && (
							<div className='text-center text-red-600 text-sm'>
								Пожалуйста, введите корректные данные (имя и номер +7 XXX
								XXX-XX-XX)
							</div>
						)}
					</form>
				</div>

				{selectedReview && (
					<div
						ref={modalRef}
						className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'
						onClick={handleBackdropClick}
					>
						<div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
							<h2 className='text-xl font-semibold text-center mb-4'>
								Отзыв от {selectedReview.author}
							</h2>
							<div className='flex mb-4 justify-center'>
								{[...Array(selectedReview.rating)].map((_, i) => (
									<Star
										key={i}
										className='text-yellow-400 fill-current'
										size={20}
									/>
								))}
							</div>
							<p className='text-gray-700 mb-6'>"{selectedReview.text}"</p>
							<Button
								onClick={() => setSelectedReview(null)}
								className='w-full bg-blue-600 hover:bg-blue-700'
							>
								Закрыть
							</Button>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

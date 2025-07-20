'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideItem {
	id: number
	image: string
	title: string
	description: string
	type: 'before' | 'after' | 'master' | 'work'
}

const slides: SlideItem[] = [
	{
		id: 1,
		image: '/images/before_repair.jpg?height=300&width=400',
		title: 'До ремонта',
		description: 'Неисправный компрессор',
		type: 'before',
	},
	{
		id: 2,
		image: '/images/after_repair.jpg?height=300&width=400',
		title: 'После ремонта',
		description: 'Холодильник работает исправно',
		type: 'after',
	},
	{
		id: 3,
		image: '/images/placeholder.jpg?height=300&width=400',
		title: 'Наш мастер',
		description: 'Александр, опыт 8 лет',
		type: 'master',
	},
	{
		id: 4,
		image: '/images/termo.jpg?height=300&width=400',
		title: 'Замена термостата',
		description: 'Быстрая замена неисправной детали',
		type: 'work',
	},
	{
		id: 5,
		image: '/images/clean.jpg?height=300&width=400',
		title: 'Чистка системы',
		description: 'Профессиональная чистка дренажа',
		type: 'work',
	},
	{
		id: 6,
		image: '/images/new.jpg?height=300&width=400',
		title: 'Результат работы',
		description: 'Холодильник как новый',
		type: 'after',
	},
]

export function ImageSlider() {
	const [currentIndex, setCurrentIndex] = useState(slides.length)
	const [slidesToShow, setSlidesToShow] = useState(3)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const sliderRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Создаём расширенный массив слайдов: копии в начале и конце
	const extendedSlides = [
		...slides.slice(-slidesToShow),
		...slides,
		...slides.slice(0, slidesToShow),
	]

	// Определяем количество слайдов в зависимости от ширины экрана
	useEffect(() => {
		const updateSlidesToShow = () => {
			setSlidesToShow(window.innerWidth < 640 ? 1 : 3)
			setCurrentIndex(slides.length)
		}

		updateSlidesToShow()
		window.addEventListener('resize', updateSlidesToShow)
		return () => window.removeEventListener('resize', updateSlidesToShow)
	}, [])

	// Очистка таймера при размонтировании
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	const nextSlide = () => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentIndex(prev => prev + 1)

		timeoutRef.current = setTimeout(() => {
			if (currentIndex + 1 >= slides.length + slidesToShow) {
				setCurrentIndex(slidesToShow)
				setIsTransitioning(false)
			} else {
				setIsTransitioning(false)
			}
		}, 300)
	}

	const prevSlide = () => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setCurrentIndex(prev => prev - 1)

		timeoutRef.current = setTimeout(() => {
			if (currentIndex - 1 < slidesToShow) {
				setCurrentIndex(slides.length)
				setIsTransitioning(false)
			} else {
				setIsTransitioning(false)
			}
		}, 300)
	}

	const getBadgeColor = (type: SlideItem['type']) => {
		switch (type) {
			case 'before':
				return 'bg-red-100 text-red-800'
			case 'after':
				return 'bg-green-100 text-green-800'
			case 'master':
				return 'bg-blue-100 text-blue-800'
			case 'work':
				return 'bg-purple-100 text-purple-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className='relative'>
			<div className='overflow-hidden'>
				<div
					ref={sliderRef}
					className='flex transition-transform duration-300 ease-in-out'
					style={{
						transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
						transition: isTransitioning
							? 'transform 300ms ease-in-out'
							: 'none',
					}}
				>
					{extendedSlides.map((slide, index) => (
						<div
							key={`${slide.id}-${index}`}
							className={`flex-shrink-0 px-3 ${
								slidesToShow === 1 ? 'w-full' : 'w-1/3'
							}`}
						>
							<Card className='h-full'>
								<CardContent className='p-0'>
									<div className='relative w-full h-[300px] bg-gray-100 flex items-center justify-center'>
										<Image
											src={slide.image || '/placeholder.svg'}
											alt={slide.description}
											width={400}
											height={300}
											className='max-w-full max-h-full object-contain'
											style={{ width: '100%', height: '100%' }}
										/>
									</div>
									<div className='p-4'>
										<Badge className={getBadgeColor(slide.type)}>
											{slide.title}
										</Badge>
										<p className='mt-2 text-sm text-gray-600'>
											{slide.description}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>

			<Button
				variant='outline'
				size='icon'
				className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full'
				onClick={prevSlide}
			>
				<ChevronLeft className='text-gray-600' size={24} />
			</Button>

			<Button
				variant='outline'
				size='icon'
				className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full'
				onClick={nextSlide}
			>
				<ChevronRight className='text-gray-600' size={24} />
			</Button>

			<div className='flex justify-center mt-6 space-x-2'>
				{slides.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition-colors ${
							index === (currentIndex - slidesToShow) % slides.length
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
	)
}

'use client'

import { useState } from 'react'
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
		image: '/images/placeholder.jpg?height=300&width=400',
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
		image: '/images/termo.jpg',
		title: 'Замена термостата',
		description: 'Быстрая замена неисправной детали',
		type: 'work',
	},
	{
		id: 5,
		image: '/placeholder.svg?height=300&width=400',
		title: 'Чистка системы',
		description: 'Профессиональная чистка дренажа',
		type: 'work',
	},
	{
		id: 6,
		image: '/placeholder.svg?height=300&width=400',
		title: 'Результат работы',
		description: 'Холодильник как новый',
		type: 'after',
	},
]

export function ImageSlider() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const slidesToShow = 3

	const nextSlide = () => {
		setCurrentIndex(
			prevIndex => (prevIndex + 1) % (slides.length - slidesToShow + 1)
		)
	}

	const prevSlide = () => {
		setCurrentIndex(
			prevIndex =>
				(prevIndex - 1 + slides.length - slidesToShow + 1) %
				(slides.length - slidesToShow + 1)
		)
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
					className='flex transition-transform duration-300 ease-in-out'
					style={{
						transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
					}}
				>
					{slides.map(slide => (
						<div key={slide.id} className='w-1/3 flex-shrink-0 px-3'>
							<Card className='h-full'>
								<CardContent className='p-0'>
									<Image
										src={slide.image || '/placeholder.jpg'}
										alt={slide.description}
										width={400}
										height={300}
										className='w-full h-48 object-cover rounded-t-lg'
									/>
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
				disabled={currentIndex === 0}
			>
				<ChevronLeft className='text-gray-600' size={24} />
			</Button>

			<Button
				variant='outline'
				size='icon'
				className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full'
				onClick={nextSlide}
				disabled={currentIndex >= slides.length - slidesToShow}
			>
				<ChevronRight className='text-gray-600' size={24} />
			</Button>

			{/* Dots indicator */}
			<div className='flex justify-center mt-6 space-x-2'>
				{Array.from({ length: slides.length - slidesToShow + 1 }).map(
					(_, index) => (
						<button
							key={index}
							className={`w-3 h-3 rounded-full transition-colors ${
								index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
							}`}
							onClick={() => setCurrentIndex(index)}
						/>
					)
				)}
			</div>
		</div>
	)
}

import Image from 'next/image'
import { Clock, DollarSign, Wrench, CreditCard } from 'lucide-react'
import { HeroForm } from '@/components/forms/hero-form'

export function HeroSection() {
	return (
		<section
			id='hero'
			className='py-16 bg-gradient-to-br from-blue-50 to-white overflow-hidden relative'
		>
			{/* Большой круг справа, частично за пределами экрана */}
			<div className='absolute -right-64 top-1/2 transform -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/8 rounded-full blur-3xl'></div>

			<div className='container mx-auto px-4 relative z-10'>
				<div className='grid lg:grid-cols-2 gap-12 items-center'>
					<div>
						<h1 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
							Ремонт холодильников на дому в Санкт-Петербурге
						</h1>
						<p className='text-xl text-gray-600 mb-8'>
							Выезд от 15 минут по городу. Без предоплаты. С гарантией до 12
							месяцев.
						</p>

						<HeroForm />

						<div className='grid grid-cols-2 gap-4'>
							<div className='flex items-center gap-3'>
								<Clock className='text-blue-600' size={24} />
								<span className='text-sm'>Выезд от 15 минут</span>
							</div>
							<div className='flex items-center gap-3'>
								<DollarSign className='text-blue-600' size={24} />
								<span className='text-sm'>Бесплатная диагностика*</span>
							</div>
							<div className='flex items-center gap-3'>
								<Wrench className='text-blue-600' size={24} />
								<span className='text-sm'>Оригинальные запчасти</span>
							</div>
							<div className='flex items-center gap-3'>
								<CreditCard className='text-blue-600' size={24} />
								<span className='text-sm'>Оплата после ремонта</span>
							</div>
						</div>

						<p className='text-xs text-gray-500 mt-4'>
							*Диагностика и выезд бесплатны при заказе ремонта. В случае отказа
							— от 300 ₽.
						</p>
					</div>

					<div className='flex justify-center relative'>
						{/* Синий круг за фотографией */}
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl'></div>
						</div>

						{/* Дополнительные декоративные элементы */}
						<div className='absolute top-10 right-10 w-20 h-20 bg-blue-600/20 rounded-full blur-xl'></div>
						<div className='absolute bottom-16 left-8 w-16 h-16 bg-blue-600/15 rounded-full blur-lg'></div>

						{/* Основное изображение */}
						<div className='relative z-10'>
							<Image
								src='/placeholder.jpg?height=500&width=400'
								alt='Мастер по ремонту холодильников'
								width={1280}
								height={700}
								className='rounded-lg shadow-2xl'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

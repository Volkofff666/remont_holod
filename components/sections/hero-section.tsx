import Image from 'next/image'
import { Clock, DollarSign, Wrench, CreditCard } from 'lucide-react'
import { HeroForm } from '@/components/forms/hero-form'

export function HeroSection() {
	return (
		<section
			id='hero'
			className='py-16 bg-gradient-to-br from-blue-50 to-white'
		>
			<div className='container mx-auto px-4'>
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

					<div className='flex justify-center'>
						<Image
							src='/placeholder.jpg?height=800&width=800'
							alt='Мастер по ремонту холодильников'
							width={400}
							height={500}
							className='rounded-lg shadow-lg'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

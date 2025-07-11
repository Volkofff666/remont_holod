import Image from 'next/image'
import { FAQAccordion } from '@/components/ui/faq-accordion'

export function FAQSection() {
	return (
		<section id='faq' className='py-16 bg-white'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center text-gray-900 mb-12'>
					Частые вопросы
				</h2>

				<div className='grid lg:grid-cols-2 gap-12 items-start'>
					{/* FAQ Accordion - левая колонка */}
					<div>
						<FAQAccordion />
					</div>

					{/* Схема холодильника - правая колонка */}
					<div className='flex flex-col items-center'>
						<div className='bg-gray-50 rounded-lg p-6 shadow-sm'>
							<Image
								src='/images/shema.jpg?height=500&width=400'
								alt='Схема устройства холодильника'
								width={400}
								height={500}
								className='rounded-lg'
							/>
						</div>
						<p className='text-center text-gray-600 mt-4 font-medium'>
							Схема холодильника
						</p>
						<p className='text-center text-sm text-gray-500 mt-2 max-w-sm'>
							Основные узлы и детали, которые мы ремонтируем: компрессор,
							термостат, испаритель, конденсатор
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

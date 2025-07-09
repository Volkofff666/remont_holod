import { Card, CardContent } from '@/components/ui/card'

const services = [
	{ name: 'Замена термостата', price: 'от 700 ₽' },
	{ name: 'Замена пускового реле', price: 'от 500 ₽' },
	{ name: 'Чистка дренажного канала', price: 'от 300 ₽' },
	{ name: 'Заправка фреоном', price: 'от 1 000 ₽' },
	{ name: 'Замена компрессора', price: 'от 1 200 ₽' },
	{ name: 'Замена сенсора температуры', price: 'от 550 ₽' },
	{ name: 'Замена фильтра-осушителя', price: 'от 800 ₽' },
	{ name: 'Чистка капиллярной трубки', price: 'от 900 ₽' },
]

export function ServicesSection() {
	return (
		<section id='services' className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4'>
				{/* B2B Block - сверху */}
				<Card className='bg-blue-50 border-blue-200 mb-12'>
					<CardContent className='p-8'>
						<h3 className='text-xl font-bold mb-4 text-blue-800'>
							Для бизнеса
						</h3>
						<p className='text-gray-700'>
							Обслуживаем кафе, магазины, медицинские учреждения. Возможность
							заключения договора на постоянное обслуживание. Работаем
							официально, предоставляем все отчётные документы.
						</p>
					</CardContent>
				</Card>

				<h2 className='text-3xl font-bold text-center text-gray-900 mb-12'>
					Распространённые неисправности и цены
				</h2>

				<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
					{services.map((service, index) => (
						<Card key={index}>
							<CardContent className='p-6'>
								<h3 className='font-semibold mb-2'>{service.name}</h3>
								<p className='text-2xl font-bold text-blue-600'>
									{service.price}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className='mt-8 text-center text-sm text-gray-600'>
					<p>
						• Выезд и диагностика — бесплатно при ремонте, или от 300 ₽ при
						отказе
					</p>
					<p>• Оплата только по факту, без авансов</p>
					<p>• Скидки пенсионерам и постоянным клиентам</p>
				</div>
			</div>
		</section>
	)
}

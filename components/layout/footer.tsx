import Link from 'next/link'

export function Footer() {
	return (
		<footer className='bg-gray-900 text-white py-12'>
			<div className='container mx-auto px-4'>
				<div className='grid md:grid-cols-4 gap-8'>
					<div>
						<h3 className='text-xl font-bold mb-4'>ACOOLing</h3>
						<p className='text-gray-400'>
							Профессиональный ремонт холодильников в Санкт-Петербурге
						</p>
					</div>

					<div>
						<h4 className='font-semibold mb-4'>Навигация</h4>
						<ul className='space-y-2 text-gray-400'>
							<li>
								<Link href='#' className='hover:text-white'>
									Главная
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-white'>
									Цены
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-white'>
									Отзывы
								</Link>
							</li>
							<li>
								<Link href='#' className='hover:text-white'>
									Контакты
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-semibold mb-4'>Контакты</h4>
						<div className='space-y-2 text-gray-400'>
							<p>Давыдов Андрей Алексеевич</p>
							<p>улица Хлопина, 9к1</p>
							<p>8 904 633-10-45</p>
							<p>ИНН: 784813431272</p>
						</div>
					</div>

					<div>
						<h4 className='font-semibold mb-4'>Юридическая информация</h4>
						<div className='space-y-2 text-gray-400 text-sm'>
							<Link href='#' className='hover:text-white block'>
								Политика конфиденциальности
							</Link>
							<Link href='#' className='hover:text-white block'>
								Согласие на обработку данных
							</Link>
						</div>
					</div>
				</div>

				<div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
					<p>&copy; 2025 ACOOLing. Все права защищены.</p>
					<p className='text-xs mt-2'>
						Бесплатная диагностика при последующем ремонте. В случае отказа от
						ремонта — диагностика оплачивается от 300 ₽.
					</p>
				</div>
			</div>
		</footer>
	)
}

import { Button } from '@/components/ui/button'

export function Header() {
	return (
		<header className='bg-white shadow-sm border-b sticky top-0 z-50'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					<div className='text-2xl font-bold text-blue-600'>ACOOLing</div>
					<nav className='hidden md:flex items-center space-x-6'>
						<a
							href='#advantages'
							className='text-gray-600 hover:text-blue-600 transition-colors'
						>
							Преимущества
						</a>
						<a
							href='#services'
							className='text-gray-600 hover:text-blue-600 transition-colors'
						>
							Услуги
						</a>
						<a
							href='#how-we-work'
							className='text-gray-600 hover:text-blue-600 transition-colors'
						>
							Как работаем
						</a>
						<a
							href='#reviews'
							className='text-gray-600 hover:text-blue-600 transition-colors'
						>
							Отзывы
						</a>
						<a
							href='#contact'
							className='text-gray-600 hover:text-blue-600 transition-colors'
						>
							Контакты
						</a>
					</nav>
					<div className='flex items-center gap-4'>
						<Button className='bg-blue-600 hover:bg-blue-700'>
							<a href='tel:+79046331045'>+7 904 633-10-45</a>
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}

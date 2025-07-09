import { Card, CardContent } from '@/components/ui/card'
import { Phone, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/forms/contact-form'

export function ContactSection() {
	return (
		<section id='contact' className='py-16 bg-blue-600 text-white'>
			<div className='container mx-auto px-4'>
				<div className='max-w-2xl mx-auto text-center'>
					<h2 className='text-3xl font-bold mb-6'>
						Оставьте заявку — починим ваш холодильник уже сегодня!
					</h2>

					<Card className='bg-white text-gray-900'>
						<CardContent className='p-8'>
							<ContactForm />
							<p className='text-sm text-gray-600 mt-4'>
								Получите скидку 10% при заказе онлайн
							</p>
						</CardContent>
					</Card>

					<div className='flex items-center justify-center gap-8 mt-8'>
						<a
							href='tel:+79046331045'
							className='flex items-center gap-2 text-white hover:text-blue-200'
						>
							<Phone size={24} />
							<span className='text-xl font-semibold'>+7 904 633-10-45</span>
						</a>
						<div className='flex gap-4'>
							<a
								href='https://wa.me/79046331045'
								className='text-white hover:text-blue-200'
							>
								<MessageCircle size={32} />
							</a>
							<a href='#' className='text-white hover:text-blue-200'>
								<Phone size={32} />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

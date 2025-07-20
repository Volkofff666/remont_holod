import { type NextRequest, NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'

export async function POST(request: NextRequest) {
	try {
		const { name, phone, source } = await request.json()
		console.log('Received form submission:', { name, phone, source })

		// Валидация данных
		if (!name || !phone) {
			console.error('Missing required fields:', { name, phone })
			return NextResponse.json(
				{ success: false, error: 'Имя и телефон обязательны' },
				{ status: 400 }
			)
		}

		// Нормализация телефона
		const normalizedPhone = phone.replace(/[\s()-]/g, '')
		const phoneRegex = /^\+?\d{10,15}$/
		if (!phoneRegex.test(normalizedPhone)) {
			console.error('Invalid phone format:', normalizedPhone)
			return NextResponse.json(
				{ success: false, error: 'Некорректный формат телефона' },
				{ status: 400 }
			)
		}

		// Отправка в Telegram
		const telegramResult = await sendToTelegram({
			name,
			phone: normalizedPhone,
			source: source || 'Сайт',
		})

		if (!telegramResult.success) {
			console.error('Telegram send error:', telegramResult.error)
			return NextResponse.json(
				{
					success: false,
					error: telegramResult.error || 'Ошибка отправки заявки в Telegram',
				},
				{ status: 500 }
			)
		}

		console.log('Form submission sent to Telegram successfully:', {
			name,
			phone: normalizedPhone,
			source,
		})

		return NextResponse.json({
			success: true,
			message: 'Заявка успешно отправлена',
		})
	} catch (error) {
		console.error('Form submission error:', error)
		return NextResponse.json(
			{ success: false, error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}

export async function GET() {
	return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

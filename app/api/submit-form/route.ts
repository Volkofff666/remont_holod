import { type NextRequest, NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'

export async function POST(request: NextRequest) {
	try {
		const { name, phone, source } = await request.json()

		// Валидация данных
		if (!name || !phone) {
			return NextResponse.json(
				{ success: false, error: 'Имя и телефон обязательны' },
				{ status: 400 }
			)
		}

		// Нормализация телефона (удаление пробелов, скобок, дефисов)
		const normalizedPhone = phone.replace(/[\s()-]/g, '')
		const phoneRegex = /^\+?\d{10,15}$/
		if (!phoneRegex.test(normalizedPhone)) {
			return NextResponse.json(
				{ success: false, error: 'Некорректный формат телефона' },
				{ status: 400 }
			)
		}

		// Логирование входящих данных
		console.log('Received form submission:', { name, phone, source })

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

		// Логирование успешной отправки
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

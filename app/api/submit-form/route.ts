import { type NextRequest, NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'

// Разрешаем динамический роут (для Vercel)
export const dynamic = 'force-dynamic'

// Обработка POST-запроса
export async function POST(request: NextRequest) {
	try {
		const { name, phone, source } = await request.json()

		// Логируем полученные данные
		console.log('Received form submission:', { name, phone, source })

		// Валидация
		if (!name || !phone) {
			return NextResponse.json(
				{ success: false, error: 'Имя и телефон обязательны' },
				{ status: 400 }
			)
		}

		// Нормализация телефона
		const normalizedPhone = phone.replace(/[\s()-]/g, '')
		const phoneRegex = /^\+?\d{10,15}$/
		if (!phoneRegex.test(normalizedPhone)) {
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

		return NextResponse.json(
			{ success: true, message: 'Заявка успешно отправлена' },
			{
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			}
		)
	} catch (error) {
		console.error('Form submission error:', error)
		return NextResponse.json(
			{ success: false, error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}

// Обработка GET
export async function GET() {
	return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

// Обработка OPTIONS (для CORS)
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	})
}

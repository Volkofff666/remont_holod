import { type NextRequest, NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
	try {
		// ✅ Получаем данные из обычной формы
		const formData = await request.formData()
		const name = formData.get('name')?.toString() || ''
		const phone = formData.get('phone')?.toString() || ''
		const source = formData.get('source')?.toString() || 'Сайт'

		console.log('Received form submission:', { name, phone, source })

		if (!name || !phone) {
			return NextResponse.json(
				{ success: false, error: 'Имя и телефон обязательны' },
				{ status: 400 }
			)
		}

		const normalizedPhone = phone.replace(/[\s()-]/g, '')
		const phoneRegex = /^\+?\d{10,15}$/
		if (!phoneRegex.test(normalizedPhone)) {
			return NextResponse.json(
				{ success: false, error: 'Некорректный формат телефона' },
				{ status: 400 }
			)
		}

		const telegramResult = await sendToTelegram({
			name,
			phone: normalizedPhone,
			source,
		})

		if (!telegramResult.success) {
			return NextResponse.json(
				{ success: false, error: telegramResult.error || 'Ошибка Telegram' },
				{ status: 500 }
			)
		}

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

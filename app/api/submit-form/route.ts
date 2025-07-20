import { type NextRequest, NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get('content-type') || ''

		let name = ''
		let phone = ''
		let source = 'Сайт'

		if (contentType.includes('application/json')) {
			const body = await request.json()
			name = body.name || ''
			phone = body.phone || ''
			source = body.source || 'Сайт'
		} else {
			const formData = await request.formData()
			name = formData.get('name')?.toString() || ''
			phone = formData.get('phone')?.toString() || ''
			source = formData.get('source')?.toString() || 'Сайт'
		}

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
				{
					success: false,
					error: telegramResult.error || 'Ошибка Telegram',
				},
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
